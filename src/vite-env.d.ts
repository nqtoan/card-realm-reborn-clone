/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_POKEMON_API_KEY: string;
    readonly VITE_API_BASE_URL: string;
    // ... other environment variables
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
  