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
import { $cloneContents } from "@lexical/selection";
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";
import type { LexicalEditor } from "lexical";
import {
  $getNodeByKey,
  $getSelection,
  $isGridSelection,
  $isRangeSelection,
  $isTextNode,
} from "lexical";
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

function getHtmlContent(
  editorState: any,
  editor: LexicalEditor
): string | null {
  editor.update(() => {
    const selection: any = $getSelection();

    if (selection == null) {
      throw new Error("Expected valid LexicalSelection");
    }

    // If we haven't selected anything
    if (
      ($isRangeSelection(selection) && selection.isCollapsed()) ||
      selection.getNodes().length === 0
    ) {
      return null;
    }

    const state = $cloneContents(selection);
    return $convertSelectedLexicalContentToHtml(editor, selection, state);
  });
  return null;
}

function $convertSelectedLexicalContentToHtml(
  editor: any,
  selection: any,
  state: {
    nodeMap: any;
    range: any;
  }
): string {
  const container = document.createElement("div");
  for (let i = 0; i < state.range.length; i++) {
    const nodeKey = state.range[i];
    const node = $getNodeByKey(nodeKey);
    if (node && node.isSelected()) {
      const element = $convertSelectedLexicalNodeToHTMLElement(
        editor,
        selection,
        node
      );
      if (element) {
        console.log(container.append(element));
        container.append(element);
      }
    }
  }
  return container.innerHTML;
}

function $convertSelectedLexicalNodeToHTMLElement(
  editor: any,
  selection: any,
  node: any
): any {
  let nodeToConvert = node;

  if ($isRangeSelection(selection) || $isGridSelection(selection)) {
    const anchor = selection.anchor.getNode();
    const focus = selection.focus.getNode();
    const isAnchor = node.is(anchor);
    const isFocus = node.is(focus);

    if ($isTextNode(node) && (isAnchor || isFocus)) {
      const anchorOffset = selection.anchor.getCharacterOffset();
      const focusOffset = selection.focus.getCharacterOffset();
      const isBackward = selection.isBackward();

      const isSame = anchor.is(focus);
      const isFirst = node.is(isBackward ? focus : anchor);

      const nodeText = node.getTextContent();
      const nodeTextLength = nodeText.length;

      if (isSame) {
        const startOffset =
          anchorOffset > focusOffset ? focusOffset : anchorOffset;
        const endOffset =
          anchorOffset > focusOffset ? anchorOffset : focusOffset;
        const splitNodes = node.splitText(startOffset, endOffset);
        nodeToConvert = startOffset === 0 ? splitNodes[0] : splitNodes[1];
      } else {
        let endOffset;

        if (isFirst) {
          endOffset = isBackward ? focusOffset : anchorOffset;
        } else {
          endOffset = isBackward ? anchorOffset : focusOffset;
        }

        if (!isBackward && endOffset === 0) {
          return null;
        } else if (endOffset !== nodeTextLength) {
          nodeToConvert =
            node.splitText(endOffset)[isFirst && endOffset !== 0 ? 1 : 0];
        }
      }
    }
  }
}

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
