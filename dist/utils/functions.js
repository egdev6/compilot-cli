import fs from 'node:fs';
import { camelCase, kebabCase, pascalCase } from './helpers.js';
export const getFolderByConfig = (config, name) => {
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
export const assertPatternInFile = (filePath, pattern) => {
    if (!fs.existsSync(filePath)) {
        throw new Error(`Archivo no encontrado: ${filePath}`);
    }
    const content = fs.readFileSync(filePath, 'utf8');
    return pattern.test(content);
};
export const isWarning = (f) => {
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
