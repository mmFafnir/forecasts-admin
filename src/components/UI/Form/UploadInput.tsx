import { UploadOutlined } from "@ant-design/icons";
import { Button, Upload } from "antd";
import {
  RcFile,
  UploadChangeParam,
  UploadFile,
  UploadProps,
} from "antd/es/upload";
import { FC, useEffect, useState } from "react";

interface IProps {
  setFile: (file: File | null) => void;
  file: File | null;
  setPreviewImage?: (previewImage: string | null) => void;
}

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const UploadInput: FC<IProps> = ({ setFile, file, setPreviewImage }) => {
  const [currentFile, setCurrentFile] = useState<UploadFile<RcFile>[]>([]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const uploadFile = (options: any) => {
    const { onSuccess, file } = options;
    setFile(file);
    onSuccess();
  };

  const cleatFiles = () => {
    setCurrentFile([]);
    setFile(null);
    setPreviewImage && setPreviewImage(null);
  };

  const handleChange: UploadProps["onChange"] = (
    info: UploadChangeParam<UploadFile>
  ) => {
    if (!setPreviewImage) return;
    getBase64(info.file.originFileObj as RcFile, (url) => {
      setPreviewImage(url);
    });
  };

  useEffect(() => {
    const fileArr = file ? [file as RcFile] : [];
    setCurrentFile(fileArr);
  }, [file]);

  return (
    <Upload
      fileList={currentFile}
      customRequest={uploadFile}
      listType="picture"
      onRemove={cleatFiles}
      maxCount={1}
      onChange={handleChange}
    >
      <Button size="large" icon={<UploadOutlined />}>
        Upload
      </Button>
    </Upload>
  );
};

export default UploadInput;
