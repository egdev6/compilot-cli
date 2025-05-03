import { Box, Text } from 'ink';
import TextInput from 'ink-text-input';
import React, { useState } from 'react';
const NameInput = ({ next, data, setData, config }) => {
    const [error, setError] = useState(undefined);
    return (React.createElement(Box, { flexDirection: 'column' },
        React.createElement(Box, { flexDirection: 'column', borderStyle: 'round', borderColor: 'white', alignItems: 'center' },
            React.createElement(Text, null, "Name without extension."),
            data.type === 'page' && (React.createElement(React.Fragment, null,
                React.createElement(Text, null, "Generator adds 'Page' at the end of the name."),
                React.createElement(Text, null, "Example: if you name it 'home', it will generate 'homePage.*'"))),
            data.type === 'hook' && (React.createElement(React.Fragment, null,
                React.createElement(Text, null, "Generator adds 'use' at the beginning of the name."),
                React.createElement(Text, null, "Example: if you name it 'loading', it will generate 'use-loading.*'"))),
            data.type === 'service' && (React.createElement(React.Fragment, null,
                React.createElement(Text, null, "Generator adds 'Service' at the end of the name."),
                React.createElement(Text, null, "Example: if you name it 'user', it will generate 'userService.*'")))),
        React.createElement(Box, { flexDirection: 'column' },
            React.createElement(Box, { flexDirection: 'row' },
                React.createElement(Text, null, "\uD83D\uDCDD [Name]: "),
                React.createElement(TextInput, { value: data.name || '', onChange: (value) => {
                        setError(undefined);
                        setData({ ...data, name: value });
                    }, onSubmit: (val) => {
                        if (val === '') {
                            setError('⚠️  Name is required');
                        }
                        else {
                            const nextStep = data.type === 'service'
                                ? 'http'
                                : data.type === 'page' || data.type === 'component'
                                    ? 'folder'
                                    : 'state';
                            if (!config.components.atomic && data.type === 'component') {
                                next('name', val, null);
                                return;
                            }
                            next('name', val, nextStep);
                        }
                    } })),
            error && (React.createElement(Box, null,
                React.createElement(Text, { color: 'yellow' }, error))))));
};
export default NameInput;
