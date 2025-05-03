import { Box, Text } from 'ink';
import TextInput from 'ink-text-input';
import React, { useState } from 'react';
const FolderPageInput = ({ next, data, setData, config }) => {
    const [error, setError] = useState(undefined);
    return (React.createElement(Box, { flexDirection: 'column' },
        React.createElement(Box, { flexDirection: 'column', borderStyle: 'round', borderColor: 'white', alignItems: 'center' },
            React.createElement(React.Fragment, null,
                React.createElement(Text, null,
                    "The base path will be ",
                    config.pages.base),
                React.createElement(Text, null,
                    "Example 1: if you name it 'home', it will be created in ",
                    config.pages.base,
                    "/home"),
                React.createElement(Text, null,
                    "Example 2: if you name it 'home/user', it will be created in ",
                    config.pages.base,
                    "/home/user"))),
        React.createElement(Box, { flexDirection: 'column' },
            React.createElement(Box, { flexDirection: 'row' },
                React.createElement(Text, null, "\uD83D\uDCC1 [Folder Path]: "),
                React.createElement(TextInput, { value: data.folder || '', onChange: (value) => setData({ ...data, folder: value }), onSubmit: (val) => {
                        if (val === '') {
                            setError('⚠️  Folder is required');
                        }
                        else {
                            next('folder', val, null);
                        }
                    } })),
            error && (React.createElement(Box, null,
                React.createElement(Text, { color: 'yellow' }, error))))));
};
export default FolderPageInput;
