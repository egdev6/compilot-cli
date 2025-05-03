import fs from 'node:fs';
import path from 'node:path';
import loadConfig from '../utils/load-config.js';
import handlebars from 'handlebars';
import { addComponentActions } from './types/component.js';
import { addHookActions } from './types/hook.js';
import { addPageActions } from './types/page.js';
import { addServiceActions } from './types/service.js';
const srcRoot = path.resolve(process.cwd());
export const setupPlop = (plop) => {
    const config = loadConfig();
    plop.setHelper('pascalCase', (text) => text
        .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
        .replace(/[\s_]+/g, '-')
        .toLowerCase()
        .replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match) => match.toUpperCase())
        .replace(/-/g, ''));
    plop.setHelper('kebabCase', (text) => text
        .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
        .replace(/[\s_]+/g, '-')
        .toLowerCase());
    plop.setHelper('camelCase', (text) => text.replace(/(^\w|-\w)/g, (match) => match.replace('-', '').toUpperCase()).replace(/\s+/g, ''));
    plop.setHelper('indent', (text, spaces = 2, patternLine = '') => {
        const raw = text || '';
        const padExtra = ' '.repeat(Number(spaces));
        const baseMatch = patternLine.match(/^(\s*)/);
        const baseIndent = baseMatch ? baseMatch[1] : '';
        const fullPad = baseIndent + padExtra;
        const normalized = raw.includes('\n') ? raw : raw.replace(/(>)(<)/g, '$1\n$2');
        const normalizedFormated = normalized
            .split('\n')
            .map((line) => {
            return fullPad + line.trim();
        })
            .join('\n');
        return normalizedFormated;
    });
    plop.setActionType('wrap-provider', (answers, config) => {
        const filePath = config.path;
        const pattern = config.pattern;
        const templateFile = config.templateFile;
        if (!fs.existsSync(filePath)) {
            throw `❌ File not found: ${filePath}`;
        }
        const content = fs.readFileSync(filePath, 'utf8');
        const match = content.match(pattern);
        if (!match) {
            throw `❌ Pattern not found in ${filePath}`;
        }
        const matchedLine = match[0];
        const fixedPlaceholder = matchedLine.replace(/(\/\*.*\*\/)(\s*)(<)/, '$1\n$3');
        const indent = matchedLine.match(/^(\s*)/)?.[1] ?? '';
        const templateSource = fs.readFileSync(templateFile, 'utf8');
        const compiled = handlebars.compile(templateSource);
        const rendered = compiled({ ...answers, placeholder: fixedPlaceholder });
        const indentedRendered = rendered
            .split('\n')
            .map((line) => indent + line)
            .join('\n');
        const updated = content.replace(matchedLine, indentedRendered);
        fs.writeFileSync(filePath, updated, 'utf8');
    });
    plop.setActionType('warning', (_answers, config) => {
        return Promise.reject(config.data.message);
    });
    plop.setGenerator('crear', {
        actions: (data) => {
            const actions = [];
            data.pascalName = plop.getHelper('pascalCase')(data.name);
            data.kebabName = plop.getHelper('kebabCase')(data.name);
            data.camelName = plop.getHelper('camelCase')(data.name);
            addComponentActions(actions, data, srcRoot, config);
            addPageActions(actions, data, srcRoot, config);
            addHookActions(actions, data, srcRoot, config);
            addServiceActions(actions, data, srcRoot, config);
            return actions;
        }
    });
};
