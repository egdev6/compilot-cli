import atomicTypes from '@constants/atomic-types.js';
import { Box, Text } from 'ink';
import SelectInput from 'ink-select-input';
import React, { type FC } from 'react';

type FolderAtomicInputProps = {
  next: (name: string, val: string, nextStep: string | null) => void;
};

const FolderAtomicInput: FC<FolderAtomicInputProps> = ({ next }) => {
  return (
    <Box flexDirection='column'>
      <Box>
        <Text>📁 [Folder Path]: </Text>
        <SelectInput
          items={atomicTypes}
          indicatorComponent={(indicator) => {
            if (indicator.isSelected) {
              return <Text color='red'>{'\u2192 '}</Text>;
            }
            return <Text>{'  '}</Text>;
          }}
          itemComponent={(item) => {
            if (item.isSelected) {
              return <Text color='red'>{item.label}</Text>;
            }
            return <Text color='white'>{item.label}</Text>;
          }}
          onSelect={(item) => {
            next('folder', item.value, null);
          }}
        />
      </Box>
    </Box>
  );
};

export default FolderAtomicInput;
