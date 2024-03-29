import { FC, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

import "easymde/dist/easymde.min.css";
import "./textEditor.scss";
import { content_style, plugins, toolbar } from "./editorConfig";

interface IProps {
  height?: number;
  initialValue?: string;
  onChange?: (value: string) => void;
}

const TextEditor: FC<IProps> = ({ height = 500, initialValue, onChange }) => {
  const editorRef = useRef<Editor>(null);

  const onChangeEditor = () => {
    if (!editorRef.current) return;
    if (!editorRef.current.editor) return;
  };

  return (
    <div className="no-null w-full">
      <Editor
        apiKey="z0ljugkdjg4mg4441owx0ic0eyzypwr10owtr0bbdlopl6zv"
        ref={editorRef}
        onChange={onChangeEditor}
        onEditorChange={(values) => {
          onChange && onChange(values.replace(/&nbsp;/g, ""));
        }}
        // onInit={(evt, editor) => editorRef.current = editor}
        initialValue={initialValue}
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
