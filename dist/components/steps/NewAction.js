import newActions from '../../constants/new-actions.js';
import { Box, Text } from 'ink';
import { useApp } from 'ink';
import SelectInput from 'ink-select-input';
import React from 'react';
const NewAction = ({ setStep }) => {
    const { exit } = useApp();
    return (React.createElement(Box, { flexDirection: 'column' },
        React.createElement(Text, null, "What would you like to do next?"),
        React.createElement(SelectInput, { items: newActions, indicatorComponent: ({ isSelected }) => {
                if (isSelected) {
                    return React.createElement(Text, { color: 'red' }, '\u2192 ');
                }
                return React.createElement(Text, null, '  ');
            }, itemComponent: ({ isSelected, label }) => {
                if (isSelected) {
                    return React.createElement(Text, { color: 'red' }, label);
                }
                return React.createElement(Text, { color: 'white' }, label);
            }, onSelect: (item) => {
                if (item.value === 'exit') {
                    exit();
                }
                else {
                    setStep('type');
                }
            } })));
};
export default NewAction;
