import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { ListItemNode, ListNode } from "@lexical/list";
import AutoFocusPlugin from "@lexical/react/LexicalAutoFocusPlugin";
import LexicalComposer from "@lexical/react/LexicalComposer";
import ContentEditable from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import LinkPlugin from "@lexical/react/LexicalLinkPlugin";
import ListPlugin from "@lexical/react/LexicalListPlugin";
import LexicalMarkdownShortcutPlugin from "@lexical/react/LexicalMarkdownShortcutPlugin";
import LexicalOnChangePlugin from "@lexical/react/LexicalOnChangePlugin";
import RichTextPlugin from "@lexical/react/LexicalRichTextPlugin";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";
import { useState } from "react";
import AutoLinkPlugin from "./plugins/AutoLinkPlugin";
import CodeHighlightPlugin from "./plugins/CodeHighlightPlugin";
import ListMaxIndentLevelPlugin from "./plugins/ListMaxIndentLevelPlugin";
import ToolbarPlugin from "./plugins/ToolbarPlugin";
import ExampleTheme from "./themes/ExampleTheme";

interface IProps {
  parentCallback: any;
}

function Placeholder() {
  return <div className="editor-placeholder">Enter some rich text...</div>;
}

const editorConfig: any = {
  // The editor theme
  theme: ExampleTheme,
  // Handling of errors during update
  onError(error: any) {
    throw error;
  },
  // Any custom nodes go here
  nodes: [
    HeadingNode,
    ListNode,
    ListItemNode,
    QuoteNode,
    CodeNode,
    CodeHighlightNode,
    TableNode,
    TableCellNode,
    TableRowNode,
    AutoLinkNode,
    LinkNode,
  ],
};

export default function Editor({ parentCallback }: IProps) {
  const [data, setData] = useState<any>("");
  const sendData = () => {
    parentCallback(data);
  };

  function handleChange(editorState: any, editor: any): any {
    setData(editor.getRootElement().outerHTML);
    sendData();
  }
  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div className="editor-container">
        <ToolbarPlugin />
        <div className="editor-inner">
          <RichTextPlugin
            contentEditable={<ContentEditable className="editor-input" />}
            placeholder={<Placeholder />}
          />
          <LexicalOnChangePlugin onChange={handleChange} />
          <HistoryPlugin />

          <AutoFocusPlugin />
          <CodeHighlightPlugin />
          <ListPlugin />
          <LinkPlugin />
          <AutoLinkPlugin />
          <ListMaxIndentLevelPlugin maxDepth={7} />
          <LexicalMarkdownShortcutPlugin />
        </div>
      </div>
    </LexicalComposer>
  );
}
