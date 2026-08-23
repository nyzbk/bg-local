/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ADSENSE_LIVE?: string;
  readonly VITE_ADSENSE_CLIENT?: string;
  readonly VITE_ADSENSE_SLOT_AFTER_SUCCESS?: string;
  readonly VITE_ADSENSE_SLOT_MID?: string;
  readonly VITE_ADSENSE_SLOT_FOOTER?: string;
  readonly VITE_AGENCY_URL?: string;
  readonly VITE_AGENCY_NAME?: string;
  readonly VITE_SITE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
