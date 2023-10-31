import { FC, useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadFile, UploadProps } from "antd";
import { Button, message, Upload } from "antd";
import { RcFile } from "antd/es/upload";

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

interface IProps {
  defaultImg?: string;
}

const FileImage: FC<IProps> = ({ defaultImg }) => {
  const [imgSrc, setSrc] = useState<string | null>(
    defaultImg ? defaultImg : null
  );
  const [fileList, setFileList] = useState<[UploadFile] | []>([]);

  const onChangeFile: UploadProps["onChange"] = async (info) => {
    setFileList([info.file]);
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
      setFileList([info.file]);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} Файл успешно загружен`);
      const imgData = await getBase64(info.file.originFileObj as RcFile);
      setSrc(imgData);

      setFileList([]);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} Произошоа ошибка при закгрузки файла.`);
      setFileList([]);
    }
  };

  return (
    <div className="flex justify-center flex-col ">
      <div className="w-20 h-20 mb-5">
        {imgSrc && <img className="w-full h-full" src={imgSrc} alt="" />}
      </div>
      <Upload
        className="flex flex-col items-start"
        name="file"
        action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
        headers={{ authorization: "authorization-text" }}
        onChange={onChangeFile}
        fileList={fileList}
      >
        <Button icon={<UploadOutlined />}>Загрузить картинку</Button>
      </Upload>
    </div>
  );
};

export default FileImage;
