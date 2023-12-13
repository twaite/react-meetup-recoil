import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/core/style.css";

export type Props = Parameters<typeof useBlockNote>[0];

export default function Editor(props: Props) {
  const editor = useBlockNote(props);

  return <BlockNoteView editor={editor} theme="light" />;
}
