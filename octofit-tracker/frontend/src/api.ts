const CODESPACE_NAME = import.meta.env.VITE_CODESPACE_NAME;
const PORT = 8000;
const IS_DEV = import.meta.env.DEV;

export const API_BASE_URL = IS_DEV
  ? '/api'
  : CODESPACE_NAME
  ? `https://${CODESPACE_NAME}-${PORT}.app.github.dev/api`
  : `http://localhost:${PORT}/api`;

export function apiUrl(path: string): string {
  const sanitizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${API_BASE_URL}${sanitizedPath}`;
}

export function ensureCodespaceName(): string {
  if (!CODESPACE_NAME) {
    throw new Error(
      'VITE_CODESPACE_NAME is not defined. Add it to .env.local as VITE_CODESPACE_NAME=<your_codespace_name>'
    );
  }
  return CODESPACE_NAME;
}
