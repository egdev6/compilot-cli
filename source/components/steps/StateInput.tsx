import { Box, Text } from 'ink';
import SelectInput from 'ink-select-input';
import React, { type FC } from 'react';

type StateInputProps = {
  next: (name: string, val: string, nextStep: string | null) => void;
};

const StateInput: FC<StateInputProps> = ({ next }) => {
  return (
    <Box>
      <Text>💾 [State management]: </Text>
      <SelectInput
        items={['zustand', 'context', 'local'].map((m) => ({
          label: m,
          value: m
        }))}
        onSelect={(item) => next('state', item.value, null)}
      />
    </Box>
  );
};

export default StateInput;
