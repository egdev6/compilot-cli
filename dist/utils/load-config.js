import fs from 'node:fs';
import path from 'node:path';
import { defaultFolders } from '../constants/default-folders.js';
const loadConfig = () => {
    const UserConfig = path.resolve(process.cwd(), 'compilot.config.json');
    const defaultConfig = defaultFolders;
    if (fs.existsSync(UserConfig)) {
        const userConfig = JSON.parse(fs.readFileSync(UserConfig, 'utf-8'));
        return { ...defaultConfig, ...userConfig };
    }
    return defaultConfig;
};
export default loadConfig;
