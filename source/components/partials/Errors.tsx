import { Box, Text } from 'ink';
import { nanoid } from 'nanoid';
import React, { type FC } from 'react';
type Props = {
  files: string[];
};

const Errors: FC<Props> = ({ files }) => {
  const filesFiltered = files.filter((file: any) => file.error !== 'Aborted due to previous action failure');
  if (!filesFiltered.length) {
    return null;
  }
  console.log('Errors:', filesFiltered);
  return (
    <Box width={170} flexDirection='column' alignItems='flex-start' marginBottom={1}>
      <Box width={50} borderStyle='round' flexDirection='row' alignItems='center' justifyContent='center'>
        <Text>🚨 Errors 🚨</Text>
      </Box>
      {filesFiltered.map((failure: any) => (
        <Text key={nanoid()} color='red'>
          {failure.error}
        </Text>
      ))}
    </Box>
  );
};

export default Errors;
