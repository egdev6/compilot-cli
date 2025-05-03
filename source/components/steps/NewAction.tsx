import newActions from '@constants/new-actions.js';
import { Box, Text } from 'ink';
import { useApp } from 'ink';
import SelectInput from 'ink-select-input';
import React, { type FC } from 'react';
type NewActionProps = {
  setStep: (step: string) => void;
};
const NewAction: FC<NewActionProps> = ({ setStep }) => {
  const { exit } = useApp();
  return (
    <Box flexDirection='column'>
      <Text>What would you like to do next?</Text>
      <SelectInput
        items={newActions}
        indicatorComponent={({ isSelected }) => {
          if (isSelected) {
            return <Text color='red'>{'\u2192 '}</Text>;
          }
          return <Text>{'  '}</Text>;
        }}
        itemComponent={({ isSelected, label }) => {
          if (isSelected) {
            return <Text color='red'>{label}</Text>;
          }
          return <Text color='white'>{label}</Text>;
        }}
        onSelect={(item) => {
          if (item.value === 'exit') {
            exit();
          } else {
            setStep('type');
          }
        }}
      />
    </Box>
  );
};
export default NewAction;
