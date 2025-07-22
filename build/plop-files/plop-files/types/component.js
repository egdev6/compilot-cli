import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { getFolderByConfig } from '../../utils/functions.js';
export const addComponentActions = (actions, data, srcRoot, config) => {
    if (data?.type === 'component') {
        const folderName = getFolderByConfig(config.components.naming.folder, data.name || '');
        const basePath = path.join(srcRoot, `${config.components.base}/{{folder}}/${folderName}/`);
        const language = config.config.language;
        const __dirname = path.dirname(fileURLToPath(import.meta.url));
        const templatesPath = path.join(__dirname, 'plop-files', 'templates', language, 'component');
        data.config = config.components;
        if (data?.folder) {
            const folderSegments = data.folder.split('/');
            const groupIndex = folderSegments.indexOf('components') + 1;
            const groupName = config.components.atomic ? folderSegments[groupIndex] : undefined;
            if (groupName) {
                data.storyGroup = groupName.charAt(0).toUpperCase() + groupName.slice(1);
            }
        }
        switch (language) {
            case 'typescript':
                if (config.components.files.types === 'file') {
                    actions.push({
                        type: 'add',
                        path: path.join(basePath, 'types.ts'),
                        templateFile: `${templatesPath}/types.ts.hbs`
                    });
                }
                if (config.components.files.stories) {
                    actions.push({
                        type: 'add',
                        path: path.join(basePath, '{{pascalName}}.stories.tsx'),
                        templateFile: `${templatesPath}/stories.tsx.hbs`
                    });
                }
                if (config.components.files.test) {
                    actions.push({
                        type: 'add',
                        path: path.join(basePath, '{{pascalName}}.test.tsx'),
                        templateFile: `${templatesPath}/test.tsx.hbs`
                    });
                }
                if (config.components.files.types === 'inline') {
                    actions.push({
                        type: 'add',
                        path: path.join(basePath, '{{pascalName}}.tsx'),
                        templateFile: `${templatesPath}/component-inline.tsx.hbs`
                    });
                    actions.push({
                        type: 'add',
                        path: path.join(basePath, 'index.ts'),
                        templateFile: `${templatesPath}/index-inline.ts.hbs`
                    });
                }
                else {
                    actions.push({
                        type: 'add',
                        path: path.join(basePath, '{{pascalName}}.tsx'),
                        templateFile: `${templatesPath}/component-file.tsx.hbs`
                    });
                    actions.push({
                        type: 'add',
                        path: path.join(basePath, 'index.ts'),
                        templateFile: `${templatesPath}/index-file.ts.hbs`
                    });
                    actions.push({
                        type: 'add',
                        path: path.join(basePath, 'use{{pascalName}}.ts'),
                        templateFile: `${templatesPath}/hook-file.ts.hbs`
                    });
                }
                break;
            case 'javascript':
                if (config.components.files.stories) {
                    actions.push({
                        type: 'add',
                        path: path.join(basePath, '{{pascalName}}.stories.jsx'),
                        templateFile: `${templatesPath}/stories.jsx.hbs`
                    });
                }
                if (config.components.files.test) {
                    actions.push({
                        type: 'add',
                        path: path.join(basePath, '{{pascalName}}.test.jsx'),
                        templateFile: `${templatesPath}/test.jsx.hbs`
                    });
                }
                actions.push({
                    type: 'add',
                    path: path.join(basePath, '{{pascalName}}.jsx'),
                    templateFile: `${templatesPath}/component.jsx.hbs`
                });
                actions.push({
                    type: 'add',
                    path: path.join(basePath, 'index.js'),
                    templateFile: `${templatesPath}/index.js.hbs`
                });
                break;
            default:
                break;
        }
    }
    return actions;
};
