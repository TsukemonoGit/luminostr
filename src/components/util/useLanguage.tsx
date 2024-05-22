// useLanguage.tsx
import { createSignal } from "solid-js";

export function useLanguage() {
  const [isJapanese, setIsJapanese] = createSignal(
    navigator.language.startsWith("ja")
  );
  return isJapanese;
}
