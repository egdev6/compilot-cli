import fs from 'node:fs';
import path from 'node:path';
import type { DataProps } from '@models/app.js';
import { addComponentActions } from '@plop-files/types/component.js';
import { addHookActions } from '@plop-files/types/hook.js';
import { addPageActions } from '@plop-files/types/page.js';
import { addServiceActions } from '@plop-files/types/service.js';
import loadConfig from '@utils/load-config.js';
import handlebars from 'handlebars';

const srcRoot = path.resolve(process.cwd());

export const setupPlop = (plop: any) => {
  const config = loadConfig();

  plop.setHelper('pascalCase', (text: string) =>
    text
      .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
      .replace(/[\s_]+/g, '-')
      .toLowerCase()
      .replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match) => match.toUpperCase())
      .replace(/-/g, '')
  );

  plop.setHelper('kebabCase', (text: string) =>
    text
      .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
      .replace(/[\s_]+/g, '-')
      .toLowerCase()
  );

  plop.setHelper('camelCase', (text: string) =>
    text.replace(/(^\w|-\w)/g, (match) => match.replace('-', '').toUpperCase()).replace(/\s+/g, '')
  );

  plop.setHelper('indent', (text: string, spaces = 2, patternLine = '') => {
    const raw = text || '';
    const padExtra = ' '.repeat(Number(spaces));

    // Detectar indentación base de la línea donde se encuentra el patrón
    const baseMatch = patternLine.match(/^(\s*)/);
    const baseIndent = baseMatch ? baseMatch[1] : '';
    const fullPad = baseIndent + padExtra;

    console.log({ padExtra, baseMatch, baseIndent, fullPad });

    // Normalizar contenido: si es una sola línea con etiquetas, separarlas
    const normalized = raw.includes('\n') ? raw : raw.replace(/(>)(<)/g, '$1\n$2');
    console.log('AQUI->', normalized);
    // Ajustar la indentación de cada línea
    const normalizedFormated = normalized
      .split('\n')
      .map((line) => {
        return fullPad + line.trim();
      })
      .join('\n');
    console.log(normalizedFormated);
    return normalizedFormated;
  });

  plop.setActionType('wrap-provider', (answers: any, config: any) => {
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

    const matchedLine = match[0]; // ej: {/*-- plop hook --*/}<App />
    const fixedPlaceholder = matchedLine.replace(/(\/\*.*\*\/)(\s*)(<)/, '$1\n$3');
    const indent = matchedLine.match(/^(\s*)/)?.[1] ?? '';

    // Renderizado como siempre
    const templateSource = fs.readFileSync(templateFile, 'utf8');
    const compiled = handlebars.compile(templateSource);
    const rendered = compiled({ ...answers, placeholder: fixedPlaceholder });

    // Aplica indentación al bloque entero
    const indentedRendered = rendered
      .split('\n')
      .map((line) => indent + line)
      .join('\n');

    // Reemplaza el pattern original SIN los espacios
    const updated = content.replace(matchedLine, indentedRendered);
    fs.writeFileSync(filePath, updated, 'utf8');

    return `✅ Provider inserted in ${filePath}`;
  });

  plop.setActionType('warning', (_answers: any, config: any) => {
    return Promise.reject(config.data.message);
  });

  plop.setGenerator('crear', {
    actions: (data: DataProps) => {
      const actions: any[] = [];
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
