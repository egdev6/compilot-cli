import chalk from 'chalk';
import { Box, Text } from 'ink';
import React, { type FC } from 'react';

const Test: FC<{ name?: string }> = ({ name }) => {
  return (
    <Box borderStyle='round' borderColor='red' justifyContent='center' marginRight={2}>
      <Text>{chalk.red(name)}</Text>
    </Box>
  );
};

export default Test;
