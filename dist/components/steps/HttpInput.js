import { Box, Text } from 'ink';
import SelectInput from 'ink-select-input';
import React from 'react';
const HttpInput = ({ next, data }) => {
    return (React.createElement(Box, null,
        React.createElement(Text, null, "\uD83D\uDD0C [http Method]: "),
        React.createElement(SelectInput, { items: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'].map((m) => ({
                label: m,
                value: m
            })), onSelect: (item) => next('http', item.value, data.type === 'page' || data.type === 'component' ? 'folder' : null) })));
};
export default HttpInput;
