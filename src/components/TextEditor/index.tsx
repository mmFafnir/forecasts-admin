import { FC, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

import "easymde/dist/easymde.min.css";
import "./textEditor.scss";
import { content_style, plugins, toolbar } from "./editorConfig";

interface IProps {
  height?: number;
  defaultValue?: string;
  onChange: (value: string) => void;
}

const TextEditor: FC<IProps> = ({ height = 500, defaultValue, onChange }) => {
  const editorRef = useRef<Editor>(null);

  const onChangeEditor = () => {
    if (!editorRef.current) return;
    if (!editorRef.current.editor) return;
    onChange(editorRef.current.editor.getContent());
  };

  return (
    <div className="no-null">
      <Editor
        apiKey="z0ljugkdjg4mg4441owx0ic0eyzypwr10owtr0bbdlopl6zv"
        ref={editorRef}
        onChange={onChangeEditor}
        // onInit={(evt, editor) => editorRef.current = editor}
        initialValue={defaultValue}
        init={{
          height: height,
          resize: false,
          menubar: false,
          plugins: plugins,
          toolbar: toolbar,
          content_style: content_style,
        }}
      />
    </div>
  );
};

export default TextEditor;
