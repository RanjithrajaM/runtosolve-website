/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_STATICFORMS_API_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
