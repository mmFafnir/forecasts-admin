import { UploadOutlined } from "@ant-design/icons";
import { Button, Upload } from "antd";
import { FC } from "react";

interface IProps {
  setFile?: (file: string) => void;
}

const UploadInput: FC<IProps> = ({ setFile }) => {
  //   eslint-disable-next-line @typescript-eslint/no-explicit-any
  const uploadFile = async (options: any) => {
    console.log(options);
    const { onSuccess, onError, file } = options;
    try {
      const formData = new FormData();
      formData.append("file", file);
      onSuccess();
      setFile && setFile("asdsd");
      console.log(formData);
      return formData;
    } catch (error) {
      console.log(error);
      onError(error);
    }
  };

  return (
    <Upload customRequest={uploadFile} listType="picture" maxCount={1}>
      <Button size="large" icon={<UploadOutlined />}>
        Upload
      </Button>
    </Upload>
  );
};

export default UploadInput;
