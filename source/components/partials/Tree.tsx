import path from 'node:path';
import loadConfig from '@utils/load-config.js';
import { Box, Text } from 'ink';
import { nanoid } from 'nanoid';
import React, { type FC, type JSX } from 'react';

type TreeNode = {
  name: string;
  fullPath?: string;
  children?: TreeNode[];
};

const buildTree = (paths: string[]): TreeNode => {
  const root: TreeNode = { name: '.', children: [] };

  for (const p of paths) {
    const parts = p.split('/').filter(Boolean);
    let current = root;

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      if (!current.children) {
        current.children = [];
      }

      let next = current.children.find((c) => c.name === part);
      const isFile = i === parts.length - 1;

      if (!next) {
        next = { name: part || '', fullPath: isFile ? path.resolve(p) : undefined };
        current.children.push(next);
      }

      current = next;
    }
  }

  return root;
};

const renderVisualTree = (node: TreeNode, prefix = '', isLast = true): JSX.Element[] => {
  const lines: JSX.Element[] = [];

  const connector = prefix ? (isLast ? '└── ' : '├── ') : '';
  if (node.name !== '.') {
    lines.push(
      <Text key={nanoid()} color='red'>
        {prefix + connector + node.name}
      </Text>
    );
  }

  const children = node.children || [];
  const newPrefix = prefix + (isLast ? '    ' : '│   ');
  children.forEach((child, idx) => {
    const last = idx === children.length - 1;
    lines.push(...renderVisualTree(child, newPrefix, last));
  });

  return lines;
};

const extractFlatPaths = (node: TreeNode): string[] => {
  const paths: string[] = [];

  const walk = (n: TreeNode) => {
    const isLeaf = !n.children || n.children.length === 0;

    if (isLeaf && n.fullPath) {
      paths.push(path.resolve(n.fullPath));
    }

    n.children?.forEach(walk);
  };

  walk(node);
  return paths;
};

type Props = {
  files: string[];
};

const ClickableTreeView: FC<Props> = ({ files }) => {
  const tree = buildTree(files);
  const visualTree = renderVisualTree(tree);
  const config = loadConfig();
  const clickablePaths = extractFlatPaths(tree);

  return (
    <Box width={170} flexDirection='column' alignItems='flex-start' marginBottom={1}>
      {config?.config.generatedFiles && (
        <>
          <Text>📦 [Generated files]</Text>
          {visualTree}
        </>
      )}
      {config?.config.openFiles && (
        <>
          <Text>{'👉 [Open Files]'}</Text>
          {clickablePaths.map((file) => (
            <Text key={nanoid()} color='red'>
              {file.substring(1, file.length)}
            </Text>
          ))}
        </>
      )}
    </Box>
  );
};

export default ClickableTreeView;
