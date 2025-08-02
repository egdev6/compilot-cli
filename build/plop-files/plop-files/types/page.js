import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { assertPatternInFile } from '../../utils/functions.js';
import { formatPath, kebabCase } from '../../utils/helpers.js';
export const addPageActions = (actions, data, srcRoot, config) => {
    if (data?.type === 'page') {
        const folderName = kebabCase(data.name);
        const folderPath = kebabCase(data.folder) === folderName ? `/${kebabCase(data.folder)}` : `/${formatPath(data.folder, kebabCase)}/`;
        const basePath = path.join(srcRoot, `${config.pages.base}/${folderPath}`);
        const routesFilePath = path.join(srcRoot, config.pages.routes);
        const language = config.config.language;
        const __dirname = path.dirname(fileURLToPath(import.meta.url));
        const templatesPath = path.join(__dirname, 'plop-files', 'templates', language, 'page');
        data.config = config.pages;
        const importPattern = /\/\/-- plop hook for import --\/\//;
        const routePattern = /{\s*\/\*\s*-- plop hook for route --\s*\*\/\s*}/;
        switch (language) {
            case 'typescript':
                if (config.pages.files.types === 'file') {
                    actions.push({
                        type: 'add',
                        path: path.join(basePath, `types.ts`),
                        templateFile: `${templatesPath}/types.ts.hbs`
                    });
                }
                if (config.pages.files.types === 'inline') {
                    actions.push({
                        type: 'add',
                        path: path.join(basePath, `{{pascalName}}Page.tsx`),
                        templateFile: `${templatesPath}/logic-inline.tsx.hbs`
                    });
                    actions.push({
                        type: 'add',
                        path: path.join(basePath, `{{pascalName}}PageView.tsx`),
                        templateFile: `${templatesPath}/view-inline.tsx.hbs`
                    });
                    actions.push({
                        type: 'add',
                        path: path.join(basePath, `index.ts`),
                        templateFile: `${templatesPath}/index-inline.ts.hbs`
                    });
                }
                else {
                    actions.push({
                        type: 'add',
                        path: path.join(basePath, `{{pascalName}}Page.tsx`),
                        templateFile: `${templatesPath}/logic-file.tsx.hbs`
                    });
                    actions.push({
                        type: 'add',
                        path: path.join(basePath, `{{pascalName}}PageView.tsx`),
                        templateFile: `${templatesPath}/view-file.tsx.hbs`
                    });
                    actions.push({
                        type: 'add',
                        path: path.join(basePath, `index.ts`),
                        templateFile: `${templatesPath}/index-file.ts.hbs`
                    });
                }
                if (assertPatternInFile(routesFilePath, routePattern)) {
                    actions.push({
                        type: 'append',
                        path: routesFilePath,
                        pattern: routePattern,
                        templateFile: `${templatesPath}/route.txt.hbs`
                    });
                }
                else {
                    actions.push({
                        type: 'warning',
                        data: {
                            message: `Pattern not found  {/* -- plop hook for route -- */} in ${routesFilePath}`
                        }
                    });
                }
                if (assertPatternInFile(routesFilePath, importPattern)) {
                    if (config.pages.files.lazy) {
                        actions.push({
                            type: 'append',
                            path: routesFilePath,
                            pattern: importPattern,
                            templateFile: `${templatesPath}/import-lazy.txt.hbs`
                        });
                    }
                    else {
                        actions.push({
                            type: 'append',
                            path: routesFilePath,
                            pattern: importPattern,
                            templateFile: `${templatesPath}/import-regular.txt.hbs`
                        });
                    }
                }
                else {
                    actions.push({
                        type: 'warning',
                        data: {
                            message: `Pattern not found //-- plop hook for import --// in ${routesFilePath}`
                        }
                    });
                }
                break;
            case 'javascript':
                actions.push({
                    type: 'add',
                    path: path.join(basePath, `{{pascalName}}PageView.jsx`),
                    templateFile: `${templatesPath}/view.jsx.hbs`
                });
                actions.push({
                    type: 'add',
                    path: path.join(basePath, `{{pascalName}}Page.jsx`),
                    templateFile: `${templatesPath}/logic.jsx.hbs`
                });
                actions.push({
                    type: 'add',
                    path: path.join(basePath, `index.js`),
                    templateFile: `${templatesPath}/index-file.js.hbs`
                });
                if (assertPatternInFile(routesFilePath, routePattern)) {
                    actions.push({
                        type: 'append',
                        path: routesFilePath,
                        pattern: routePattern,
                        templateFile: `${templatesPath}/route.txt.hbs`
                    });
                }
                else {
                    actions.push({
                        type: 'warning',
                        data: {
                            message: `Pattern not found {/* -- plop hook for route -- */} in ${routesFilePath}`
                        }
                    });
                }
                if (assertPatternInFile(routesFilePath, importPattern)) {
                    if (config.pages.files.lazy) {
                        actions.push({
                            type: 'append',
                            path: routesFilePath,
                            pattern: importPattern,
                            templateFile: `${templatesPath}/import-lazy.txt.hbs`
                        });
                    }
                    else {
                        actions.push({
                            type: 'append',
                            path: routesFilePath,
                            pattern: importPattern,
                            templateFile: `${templatesPath}/import-regular.txt.hbs`
                        });
                    }
                }
                else {
                    actions.push({
                        type: 'warning',
                        data: {
                            message: `Pattern not found //-- plop hook for import --// in ${routesFilePath}`
                        }
                    });
                }
                break;
            default:
                break;
        }
    }
    return actions;
};
