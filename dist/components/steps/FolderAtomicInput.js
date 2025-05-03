import atomicTypes from '../../constants/atomic-types.js';
import { Box, Text } from 'ink';
import SelectInput from 'ink-select-input';
import React from 'react';
const FolderAtomicInput = ({ next }) => {
    return (React.createElement(Box, { flexDirection: 'column' },
        React.createElement(Box, null,
            React.createElement(Text, null, "\uD83D\uDCC1 [Folder Path]: "),
            React.createElement(SelectInput, { items: atomicTypes, indicatorComponent: (indicator) => {
                    if (indicator.isSelected) {
                        return React.createElement(Text, { color: 'red' }, '\u2192 ');
                    }
                    return React.createElement(Text, null, '  ');
                }, itemComponent: (item) => {
                    if (item.isSelected) {
                        return React.createElement(Text, { color: 'red' }, item.label);
                    }
                    return React.createElement(Text, { color: 'white' }, item.label);
                }, onSelect: (item) => {
                    next('folder', item.value, null);
                } }))));
};
export default FolderAtomicInput;
