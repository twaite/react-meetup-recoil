import { useParams } from "react-router";
import { faker } from "@faker-js/faker";
import { hash } from "@app/api";
import Editor, { Props as EditorProps } from "@components/Editor";
import { useQuery } from "react-query";
import { BlockNoteEditor } from "@blocknote/core";

export default function Document() {
  /** Custom */
  const { docId } = useParams();

  /** Fetch data */
  const { data: editorProps, isLoading } = useQuery({
    queryKey: ["document", docId],
    queryFn: () => getInitialContent(docId!),
    enabled: !!docId,
    // refetchOnMount: "always",
  });

  return (
    !isLoading &&
    editorProps && (
      <Editor
        {...editorProps}
        key={JSON.stringify(editorProps.initialContent)}
      />
    )
  );
}

async function getInitialContent(docId: string): Promise<EditorProps> {
  let initialContent: EditorProps["initialContent"] = [];
  const savedData = localStorage.getItem(`document:${docId}`);

  if (savedData) {
    initialContent = JSON.parse(savedData);
  } else {
    faker.seed(hash(docId ?? ""));

    initialContent = BlockNoteEditor.create().tryParseMarkdownToBlocks(`
# ${faker.company.catchPhrase()}

${faker.lorem.paragraphs(3)}
    `);
  }

  return {
    initialContent,
    onEditorContentChange(editor) {
      localStorage.setItem(
        `document:${docId}`,
        JSON.stringify(editor.topLevelBlocks)
      );
    },
  };
}
