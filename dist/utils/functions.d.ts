import type { PlopFailure } from '../models/app.js';
export declare const getFolderByConfig: (config: string, name: string) => string;
export declare const assertPatternInFile: (filePath: string, pattern: RegExp) => boolean;
export declare const isWarning: (f: PlopFailure) => boolean;
