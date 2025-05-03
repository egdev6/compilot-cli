import { Box, Text } from 'ink';
import { nanoid } from 'nanoid';
import React from 'react';
const Errors = ({ files }) => {
    const filesFiltered = files.filter((file) => file.error !== 'Aborted due to previous action failure');
    if (!filesFiltered.length) {
        return null;
    }
    console.log('Errors:', filesFiltered);
    return (React.createElement(Box, { width: 170, flexDirection: 'column', alignItems: 'flex-start', marginBottom: 1 },
        React.createElement(Box, { width: 50, borderStyle: 'round', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
            React.createElement(Text, null, "\uD83D\uDEA8 Errors \uD83D\uDEA8")),
        filesFiltered.map((failure) => (React.createElement(Text, { key: nanoid(), color: 'red' }, failure.error)))));
};
export default Errors;
