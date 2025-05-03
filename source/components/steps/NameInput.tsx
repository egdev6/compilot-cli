import type { DataProps } from '@/models/app.js';
import { Box, Text } from 'ink';
import TextInput from 'ink-text-input';
import React, { useState, type FC } from 'react';

type NameInputProps = {
  next: (name: string, val: string, nextStep: string | null) => void;
  data: DataProps;
  setData: (data: DataProps) => any;
  config: any;
};

const NameInput: FC<NameInputProps> = ({ next, data, setData, config }) => {
  const [error, setError] = useState<string | undefined>(undefined);

  return (
    <Box flexDirection='column'>
      <Box flexDirection='column' borderStyle={'round'} borderColor='white' alignItems='center'>
        <Text>Name without extension.</Text>
        {data.type === 'page' && (
          <>
            <Text>Generator adds 'Page' at the end of the name.</Text>
            <Text>Example: if you name it 'home', it will generate 'homePage.*'</Text>
          </>
        )}
        {data.type === 'hook' && (
          <>
            <Text>Generator adds 'use' at the beginning of the name.</Text>
            <Text>Example: if you name it 'loading', it will generate 'use-loading.*'</Text>
          </>
        )}
        {data.type === 'service' && (
          <>
            <Text>Generator adds 'Service' at the end of the name.</Text>
            <Text>Example: if you name it 'user', it will generate 'userService.*'</Text>
          </>
        )}
      </Box>
      <Box flexDirection='column'>
        <Box flexDirection='row'>
          <Text>📝 [Name]: </Text>
          <TextInput
            value={data.name || ''}
            onChange={(value: string) => {
              setError(undefined);
              setData({ ...data, name: value });
            }}
            onSubmit={(val) => {
              if (val === '') {
                setError('⚠️  Name is required');
              } else {
                const nextStep =
                  data.type === 'service'
                    ? 'http'
                    : data.type === 'page' || data.type === 'component'
                      ? 'folder'
                      : 'state';
                if (!config.components.atomic && data.type === 'component') {
                  next('name', val, null);
                  return;
                }
                next('name', val, nextStep);
              }
            }}
          />
        </Box>
        {error && (
          <Box>
            <Text color='yellow'>{error}</Text>
          </Box>
        )}
      </Box>
    </Box>
  );
};
export default NameInput;
