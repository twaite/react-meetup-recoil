import { atom, useSetRecoilState } from "recoil";

const searchElAtom = atom<HTMLInputElement | null>({
  key: "searchEl",
  default: null,
  effects: [
    ({ onSet }) => {
      onSet((el) => {
        function handleKeyDown(event: KeyboardEvent) {
          if (
            (event.metaKey || event.ctrlKey) &&
            (event.key === "k" || event.key === "f")
          ) {
            event.preventDefault();
            event.stopPropagation();
            el?.focus();
          }
        }

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
      });
    },
  ],
});

export function useKeyboardShortcuts() {
  const setSearchEl = useSetRecoilState(searchElAtom);

  return {
    setSearchEl,
  };
}
