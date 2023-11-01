import { FC, useCallback, useState } from "react";
import SimpleMDE from "react-simplemde-editor";

import "easymde/dist/easymde.min.css";

const TextEditor: FC = () => {
  const [value, setValue] = useState("Initial value");

  const onChange = useCallback((value: string) => {
    setValue(value);
  }, []);

  return (
    <div className="no-null">
      <SimpleMDE value={value} onChange={onChange} className="text-left" />
    </div>
  );
};

export default TextEditor;
