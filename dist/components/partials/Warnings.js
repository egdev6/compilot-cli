import { Box, Text } from 'ink';
import { nanoid } from 'nanoid';
import React from 'react';
const Warnings = ({ files }) => {
    const filesFiltered = files.filter((file) => file.error !== 'Aborted due to previous action failure');
    if (!filesFiltered.length) {
        return null;
    }
    return (React.createElement(Box, { width: 170, flexDirection: 'column', alignItems: 'flex-start', marginBottom: 1 },
        React.createElement(Box, { width: 50, borderStyle: 'round', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
            React.createElement(Text, null,
                "\u26A0\uFE0F",
                '  ',
                "Warnings \u26A0\uFE0F")),
        filesFiltered.map((failure) => (React.createElement(Text, { key: nanoid(), color: 'red' }, failure.error)))));
};
export default Warnings;
