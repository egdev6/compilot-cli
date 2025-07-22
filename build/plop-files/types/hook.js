import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { assertPatternInFile } from '../../utils/functions.js';
import { kebabCase } from '../../utils/helpers.js';
export const addHookActions = (actions, data, srcRoot, config) => {
    if (data?.type === 'hook') {
        const folderName = `use-${kebabCase(data.name)}`;
        const basePath = path.join(srcRoot, `${config.hooks.base}/${folderName}/`);
        const providerFilePath = path.join(srcRoot, config.hooks.context.file);
        const language = config.config.language;
        const __dirname = path.dirname(fileURLToPath(import.meta.url));
        const templatesPath = path.join(__dirname, 'plop-files', 'templates', language, 'hook', data.state);
        data.config = config.hooks;
        const importPattern = /\/\/-- plop hook for import --\/\//;
        const providerPattern = /^\s*\{\s*\/\*--\s*plop hook for provider\s*--\*\/\s*\}\s*<App\s*\/?>/m;
        switch (language) {
            case 'typescript':
                if (data.state === 'zustand') {
                    actions.push({
                        type: 'add',
                        path: path.join(basePath, 'store.ts'),
                        templateFile: `${templatesPath}/store.ts.hbs`
                    });
                }
                if (data.state === 'context') {
                    actions.push({
                        type: 'add',
                        path: path.join(basePath, 'context.ts'),
                        templateFile: `${templatesPath}/context.ts.hbs`
                    });
                    if (assertPatternInFile(providerFilePath, importPattern)) {
                        actions.push({
                            type: 'append',
                            path: providerFilePath,
                            pattern: importPattern,
                            templateFile: `${templatesPath}/import.txt.hbs`
                        });
                    }
                    else {
                        actions.push({
                            type: 'warning',
                            data: {
                                message: `Pattern not found  //-- plop hook for import --// in ${providerFilePath}`
                            }
                        });
                    }
                    if (assertPatternInFile(providerFilePath, providerPattern)) {
                        if (config.hooks.context.mode === 'tree') {
                            actions.push({
                                type: 'wrap-provider',
                                path: providerFilePath,
                                pattern: providerPattern,
                                templateFile: `${templatesPath}/provider-tree.wrap.hbs`
                            });
                        }
                        else {
                            actions.push({
                                type: 'append',
                                path: providerFilePath,
                                pattern: providerPattern,
                                templateFile: `${templatesPath}/provider-array.txt.hbs`
                            });
                        }
                    }
                    else {
                        actions.push({
                            type: 'warning',
                            data: {
                                message: `Pattern not found  {/* -- plop hook for provider -- */}<App/> in ${providerFilePath}`
                            }
                        });
                    }
                }
                actions.push({
                    type: 'add',
                    path: path.join(basePath, `types.ts`),
                    templateFile: `${templatesPath}/types.ts.hbs`
                });
                actions.push({
                    type: 'add',
                    path: path.join(basePath, 'hook.ts'),
                    templateFile: `${templatesPath}/hook.ts.hbs`
                });
                actions.push({
                    type: 'add',
                    path: path.join(basePath, 'index.ts'),
                    templateFile: `${templatesPath}/index.ts.hbs`
                });
                break;
            case 'javascript':
                if (data.state === 'zustand') {
                    actions.push({
                        type: 'add',
                        path: path.join(basePath, 'store.js'),
                        templateFile: `${templatesPath}/store.js.hbs`
                    });
                }
                if (data.state === 'context') {
                    actions.push({
                        type: 'add',
                        path: path.join(basePath, 'context.js'),
                        templateFile: `${templatesPath}/context.js.hbs`
                    });
                    if (assertPatternInFile(providerFilePath, importPattern)) {
                        actions.push({
                            type: 'append',
                            path: providerFilePath,
                            pattern: importPattern,
                            templateFile: `${templatesPath}/import.txt.hbs`
                        });
                    }
                    else {
                        actions.push({
                            type: 'warning',
                            data: {
                                message: `Pattern not found  //-- plop hook for import --// in ${providerFilePath}`
                            }
                        });
                    }
                    if (assertPatternInFile(providerFilePath, providerPattern)) {
                        if (config.hooks.context.mode === 'tree') {
                            actions.push({
                                type: 'wrap-provider',
                                path: providerFilePath,
                                pattern: providerPattern,
                                templateFile: `${templatesPath}/provider-tree.wrap.hbs`
                            });
                        }
                        else {
                            actions.push({
                                type: 'append',
                                path: providerFilePath,
                                pattern: providerPattern,
                                templateFile: `${templatesPath}/provider-array.txt.hbs`
                            });
                        }
                    }
                    else {
                        actions.push({
                            type: 'warning',
                            data: {
                                message: `Pattern not found  {/* -- plop hook for provider -- */}<App/> in ${providerFilePath}`
                            }
                        });
                    }
                }
                actions.push({
                    type: 'add',
                    path: path.join(basePath, 'hook.js'),
                    templateFile: `${templatesPath}/hook.js.hbs`
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
