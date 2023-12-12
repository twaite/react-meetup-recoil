import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/core/style.css";
import { useParams } from "react-router";
import { useEffect } from "react";
import { faker } from "@faker-js/faker";
import { hash } from "@app/api";

export default function Document() {
  /** Custom */
  const { docId } = useParams();

  const editor = useBlockNote();

  /** Effects */
  useEffect(generateMarkdown, [docId, editor]);

  /** Render */
  return <BlockNoteView editor={editor} theme="light" />;

  /** Effect def */
  function generateMarkdown() {
    faker.seed(hash(docId ?? ""));

    async function parseBlocks() {
      const blocks = await editor.tryParseMarkdownToBlocks(`
# ${faker.company.catchPhrase()}

${faker.lorem.paragraphs(3)}
      `);

      console.log("replacing");
      editor.replaceBlocks(editor.topLevelBlocks, blocks);
    }

    parseBlocks();
  }
}
