const sanitize = (text: string) =>
  text
    .normalize('NFKD')
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

const sanitizePath = (text: string) =>
  text
    .normalize('NFKD')
    .replace(/[^\w\s/-]/g, '') // permite letras, números, espacios, guiones y slash "/"
    .replace(/\s+/g, ' ')
    .trim();

export const kebabCase = (text?: string) => {
  if (!text) {
    return '';
  }
  return sanitize(text)
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
};
export const pascalCase = (text?: string) => {
  if (!text) {
    return '';
  }
  return sanitize(text)
    .replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match) => match.toUpperCase())
    .replace(/[\s_-]+/g, '')
    .replace(/[^a-zA-Z0-9]/g, '');
};

export const camelCase = (text: string) => {
  const pascal = pascalCase(text);
  return pascal.charAt(0).toLowerCase() + pascal.slice(1);
};

export const formatPath = (text: string, formatter: (segment: string) => void) => {
  return sanitizePath(text)
    .split('/')
    .map((segment) => formatter(segment))
    .join('/');
};
