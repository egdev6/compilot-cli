import type { DataProps } from '@/models/app.js';
import { Box, Text } from 'ink';
import TextInput from 'ink-text-input';
import React, { useState, type FC } from 'react';

type FolderPageInputProps = {
  next: (name: string, val: string, nextStep: string | null) => void;
  data: DataProps;
  setData: (data: DataProps) => any;
  config: any;
};

const FolderPageInput: FC<FolderPageInputProps> = ({ next, data, setData, config }) => {
  const [error, setError] = useState<string | undefined>(undefined);
  return (
    <Box flexDirection='column'>
      <Box flexDirection='column' borderStyle={'round'} borderColor='white' alignItems='center'>
        <>
          <Text>The base path will be {config.pages.base}</Text>
          <Text>Example 1: if you name it 'home', it will be created in {config.pages.base}/home</Text>
          <Text>Example 2: if you name it 'home/user', it will be created in {config.pages.base}/home/user</Text>
        </>
      </Box>
      <Box flexDirection='column'>
        <Box flexDirection='row'>
          <Text>📁 [Folder Path]: </Text>
          <TextInput
            value={data.folder || ''}
            onChange={(value: string) => setData({ ...data, folder: value })}
            onSubmit={(val) => {
              if (val === '') {
                setError('⚠️  Folder is required');
              } else {
                next('folder', val, null);
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

export default FolderPageInput;
