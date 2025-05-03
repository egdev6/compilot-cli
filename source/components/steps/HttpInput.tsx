import type { DataProps } from '@/models/app.js';
import { Box, Text } from 'ink';
import SelectInput from 'ink-select-input';
import React, { type FC } from 'react';

type HttpInputProps = {
  next: (name: string, val: string, nextStep: string | null) => void;
  data: DataProps;
};

const HttpInput: FC<HttpInputProps> = ({ next, data }) => {
  return (
    <Box>
      <Text>🔌 [http Method]: </Text>
      <SelectInput
        items={['GET', 'POST', 'PUT', 'PATCH', 'DELETE'].map((m) => ({
          label: m,
          value: m
        }))}
        onSelect={(item) =>
          next('http', item.value, data.type === 'page' || data.type === 'component' ? 'folder' : null)
        }
      />
    </Box>
  );
};

export default HttpInput;
