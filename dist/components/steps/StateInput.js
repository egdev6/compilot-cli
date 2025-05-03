import { Box, Text } from 'ink';
import SelectInput from 'ink-select-input';
import React from 'react';
const StateInput = ({ next }) => {
    return (React.createElement(Box, null,
        React.createElement(Text, null, "\uD83D\uDCBE [State management]: "),
        React.createElement(SelectInput, { items: ['zustand', 'context', 'local'].map((m) => ({
                label: m,
                value: m
            })), onSelect: (item) => next('state', item.value, null) })));
};
export default StateInput;
