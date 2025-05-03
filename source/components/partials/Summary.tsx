import type { DataProps } from '@/models/app.js';
import { pascalCase } from '@utils/helpers.js';
import { Box, Text } from 'ink';
import React, { type FC } from 'react';
import Errors from './Errors.js';
import TreeView from './Tree.js';
import Warnings from './Warnings.js';

const Summary: FC<{ dataList: DataProps[]; data: DataProps }> = ({ dataList, data }) => (
  <Box flexDirection='column'>
    <Box borderStyle='double' borderColor='red' alignItems='center' justifyContent='center'>
      <Text color='red' bold={true}>
        Welcome to Compilot-cli
      </Text>
    </Box>
    <Box flexDirection='column'>
      {dataList.map((item, index) => (
        <Box key={index} flexDirection='column'>
          {item.type ? (
            <Text>
              🧩 [Type]: <Text color='red'>{item.type}</Text>
            </Text>
          ) : null}
          {item.name ? (
            <Text>
              📝 [Name]: <Text color='red'>{item.name}</Text>
            </Text>
          ) : null}
          {item.http ? (
            <Text>
              🔌 [HTTP]: <Text color='red'>{item.http}</Text>
            </Text>
          ) : null}
          {item.folder ? (
            <Text>
              📁 [Folder]: <Text color='red'>{item.folder}</Text>
            </Text>
          ) : null}
          {item.changes?.length ? (
            <Box alignItems='center' justifyContent='center'>
              <TreeView files={item.changes} />
            </Box>
          ) : null}
          {item.warnings?.length ? (
            <Box alignItems='center' justifyContent='center'>
              <Warnings files={item.warnings} />
            </Box>
          ) : null}
          {item.errors?.length ? (
            <Box alignItems='center' justifyContent='center'>
              <Errors files={item.errors} />
            </Box>
          ) : null}
          <Box width={50} borderStyle='round' flexDirection='row' alignItems='center' justifyContent='center'>
            <Text>
              🚀 {pascalCase(item.type)} {item.name} Created 🚀
            </Text>
          </Box>
        </Box>
      ))}
    </Box>
    <Box flexDirection='column'>
      {data.type ? (
        <Text>
          🧩 [Type]: <Text color='red'>{data.type}</Text>
        </Text>
      ) : null}
      {data.name ? (
        <Text>
          📝 [Name]: <Text color='red'>{data.name}</Text>
        </Text>
      ) : null}
      {data.http ? (
        <Text>
          🔌 [HTTP]: <Text color='red'>{data.http}</Text>
        </Text>
      ) : null}
      {data.folder ? (
        <Text>
          📁 [Folder]: <Text color='red'>{data.folder}</Text>
        </Text>
      ) : null}
    </Box>
  </Box>
);
export default Summary;
