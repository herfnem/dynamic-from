import { useEffect, useRef } from "react";
import { EditorView, basicSetup } from "codemirror";
import { EditorState } from "@codemirror/state";
import { json } from "@codemirror/lang-json";
import { oneDark } from "@codemirror/theme-one-dark";
import { useTheme } from "./theme-provider";

interface JsonEditorProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export function JsonEditor({ value, onChange, error }: JsonEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (!editorRef.current) return;

    const updateListener = EditorView.updateListener.of((update) => {
      if (update.docChanged) {
        onChange(update.state.doc.toString());
      }
    });

    const extensions = [
      basicSetup,
      json(),
      updateListener,
      EditorView.lineWrapping,
      theme === "dark" ? oneDark : [],
    ];

    const state = EditorState.create({
      doc: value,
      extensions,
    });

    const view = new EditorView({
      state,
      parent: editorRef.current,
    });

    viewRef.current = view;

    return () => {
      view.destroy();
      viewRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme]);

  // Update editor content when value prop changes
  useEffect(() => {
    const view = viewRef.current;
    if (view && view.state.doc.toString() !== value) {
      view.dispatch({
        changes: { from: 0, to: view.state.doc.length, insert: value },
      });
    }
  }, [value]);

  return (
    <div className="flex h-full flex-col">
      {error && <div className="text-red-500">{error}</div>}
      <div
        ref={editorRef}
        className="flex-1 overflow-auto p-2 font-mono text-sm"
      />
    </div>
  );
}
