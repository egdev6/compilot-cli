import componentTypes from '@constants/component-types.js';
import { Box, Text } from 'ink';
import SelectInput from 'ink-select-input';
import React, { type FC } from 'react';

type TypeInputProps = {
  next: (name: string, val: string, nextStep: string | null) => void;
};

const TypeInput: FC<TypeInputProps> = ({ next }) => {
  return (
    <Box>
      <Text>🧩 [Type]: </Text>
      <SelectInput
        items={componentTypes}
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
          next('type', item.value, 'name');
        }}
      />
    </Box>
  );
};

export default TypeInput;
