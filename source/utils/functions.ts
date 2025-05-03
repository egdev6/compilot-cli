import fs from 'node:fs';
import type { PlopFailure } from '@models/app.js';
import { camelCase, kebabCase, pascalCase } from '@utils/helpers.js';

export const getFolderByConfig = (config: string, name: string) => {
  switch (config) {
    case 'kebabCase':
      return kebabCase(name);
    case 'pascalCase':
      return pascalCase(name);
    case 'camelCase':
      return camelCase(name);
    default:
      return kebabCase(name);
  }
};

export const assertPatternInFile = (filePath: string, pattern: RegExp) => {
  if (!fs.existsSync(filePath)) {
    throw new Error(`Archivo no encontrado: ${filePath}`);
  }

  const content = fs.readFileSync(filePath, 'utf8');
  return pattern.test(content);
};

export const isWarning = (f: PlopFailure) => {
  if (f.type === 'warning') {
    return true;
  }
  if (typeof f.error === 'object' && f.error?.name === 'warning') {
    return true;
  }
  if (typeof f.error === 'string' && f.error.startsWith('warning:')) {
    return true;
  }
  return false;
};
