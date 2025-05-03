import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { assertPatternInFile } from '../../utils/functions.js';
import { kebabCase } from '../../utils/helpers.js';
export const addServiceActions = (actions, data, srcRoot, config) => {
    if (data?.type === 'service') {
        const folderName = `${kebabCase(data.name)}`;
        const basePath = path.join(srcRoot, `${config.services.base}/${folderName}/`);
        const mockServerFilePath = path.join(srcRoot, config.services.mocks.server);
        const apiFilePath = path.join(srcRoot, config.services.axios);
        const mocksDataBasePath = path.join(srcRoot, `${config.services.mocks.data}/`);
        const typesBasePath = path.join(srcRoot, `${config.services.types}`);
        const language = config.config.language;
        const __dirname = path.dirname(fileURLToPath(import.meta.url));
        const templatesPath = path.join(__dirname, '../', 'templates', language, 'services');
        data.config = config.services;
        data.pathToApi = apiFilePath.replace(`${srcRoot}/`, '');
        data.pathToTypes = typesBasePath.replace(`${srcRoot}/`, '');
        data.pathToMocks = mocksDataBasePath.replace(`${srcRoot}/`, '');
        const mockPattern = /\/\/-- plop hook for mocks --\/\//;
        switch (language) {
            case 'typescript':
                actions.push({
                    type: 'add',
                    path: path.join(typesBasePath, `/{{camelName}}ServiceTypes.ts`),
                    templateFile: `${templatesPath}/types.ts.hbs`
                });
                if (config.services.mocks.enabled) {
                    actions.push({
                        type: 'add',
                        path: path.join(basePath, `{{camelName}}Service.ts`),
                        templateFile: `${templatesPath}/service-mocks.ts.hbs`
                    }, {
                        type: 'add',
                        path: path.join(mocksDataBasePath, '/{{kebabName}}.json'),
                        templateFile: `${templatesPath}/data.json.hbs`
                    });
                    if (assertPatternInFile(mockServerFilePath, mockPattern)) {
                        actions.push({
                            type: 'append',
                            path: mockServerFilePath,
                            pattern: mockPattern,
                            templateFile: `${templatesPath}/mock.txt.hbs`
                        });
                    }
                    else {
                        actions.push({
                            type: 'warning',
                            data: {
                                message: `Pattern not found //-- plop hook for mocks --// in ${mockServerFilePath}`
                            }
                        });
                    }
                }
                else {
                    actions.push({
                        type: 'add',
                        path: path.join(basePath, `{{camelName}}Service.ts`),
                        templateFile: `${templatesPath}/service.ts.hbs`
                    });
                }
                break;
            case 'javascript':
                if (config.services.mocks.enabled) {
                    actions.push({
                        type: 'add',
                        path: path.join(basePath, `{{camelName}}Service.js`),
                        templateFile: `${templatesPath}/service-mocks.js.hbs`
                    }, {
                        type: 'add',
                        path: path.join(mocksDataBasePath, '/{{kebabName}}.json'),
                        templateFile: `${templatesPath}/data.json.hbs`
                    });
                    if (assertPatternInFile(mockServerFilePath, mockPattern)) {
                        actions.push({
                            type: 'append',
                            path: mockServerFilePath,
                            pattern: mockPattern,
                            templateFile: `${templatesPath}/mock.txt.hbs`
                        });
                    }
                    else {
                        actions.push({
                            type: 'warning',
                            data: {
                                message: `Pattern not found //-- plop hook for mocks --// in ${mockServerFilePath}`
                            }
                        });
                    }
                }
                else {
                    actions.push({
                        type: 'add',
                        path: path.join(basePath, `{{camelName}}Service.js`),
                        templateFile: `${templatesPath}/service.js.hbs`
                    });
                }
                break;
            default:
                break;
        }
        return actions;
    }
};
