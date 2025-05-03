import componentTypes from '../../constants/component-types.js';
import { Box, Text } from 'ink';
import SelectInput from 'ink-select-input';
import React from 'react';
const TypeInput = ({ next }) => {
    return (React.createElement(Box, null,
        React.createElement(Text, null, "\uD83E\uDDE9 [Type]: "),
        React.createElement(SelectInput, { items: componentTypes, indicatorComponent: (indicator) => {
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
                next('type', item.value, 'name');
            } })));
};
export default TypeInput;
