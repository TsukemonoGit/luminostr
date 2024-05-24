// useLanguage.tsx
import { createMemo, createSignal } from "solid-js";
export function useLanguage() {
  const [lang, setLang] = createSignal(navigator.language || "en");
  const isJapanese = createMemo(() => lang().startsWith("ja"));
  document.documentElement.lang = lang();
  return [lang, setLang, isJapanese] as const;
}
