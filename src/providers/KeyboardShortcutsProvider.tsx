import { ReactNode, createContext, useEffect, useState } from "react";
import { noop } from "lodash-es";

type Props = {
  children: ReactNode;
};

export const KeyboardShortcutsContext = createContext({
  setSearchEl: noop as (el: HTMLInputElement) => void,
});

export default function KeyboardShortcutsProvider(props: Props) {
  /** State */
  const [searchEl, setSearchEl] = useState<HTMLInputElement | null>(null);

  /** Effects */
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        // TODO: not working
        searchEl?.focus();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <KeyboardShortcutsContext.Provider value={{ setSearchEl }}>
      {props.children}
    </KeyboardShortcutsContext.Provider>
  );
}
