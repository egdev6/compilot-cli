import path from 'node:path';
import loadConfig from '../../utils/load-config.js';
import { Box, Text } from 'ink';
import { nanoid } from 'nanoid';
import React from 'react';
const buildTree = (paths) => {
    const root = { name: '.', children: [] };
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
const renderVisualTree = (node, prefix = '', isLast = true) => {
    const lines = [];
    const connector = prefix ? (isLast ? '└── ' : '├── ') : '';
    if (node.name !== '.') {
        lines.push(React.createElement(Text, { key: nanoid(), color: 'red' }, prefix + connector + node.name));
    }
    const children = node.children || [];
    const newPrefix = prefix + (isLast ? '    ' : '│   ');
    children.forEach((child, idx) => {
        const last = idx === children.length - 1;
        lines.push(...renderVisualTree(child, newPrefix, last));
    });
    return lines;
};
const extractFlatPaths = (node) => {
    const paths = [];
    const walk = (n) => {
        const isLeaf = !n.children || n.children.length === 0;
        if (isLeaf && n.fullPath) {
            paths.push(path.resolve(n.fullPath));
        }
        n.children?.forEach(walk);
    };
    walk(node);
    return paths;
};
const ClickableTreeView = ({ files }) => {
    const tree = buildTree(files);
    const visualTree = renderVisualTree(tree);
    const config = loadConfig();
    const clickablePaths = extractFlatPaths(tree);
    return (React.createElement(Box, { width: 170, flexDirection: 'column', alignItems: 'flex-start', marginBottom: 1 },
        config?.config.generatedFiles && (React.createElement(React.Fragment, null,
            React.createElement(Text, null, "\uD83D\uDCE6 [Generated files]"),
            visualTree)),
        config?.config.openFiles && (React.createElement(React.Fragment, null,
            React.createElement(Text, null, '👉 [Open Files]'),
            clickablePaths.map((file) => (React.createElement(Text, { key: nanoid(), color: 'red' }, file.substring(1, file.length))))))));
};
export default ClickableTreeView;
