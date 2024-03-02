import { Button, Form, Input } from "antd";
import { required } from "../../../core/form-rools";
import { useState } from "react";
import UploadInput from "../../../components/UI/Form/UploadInput";
import CustomImage from "../../../components/UI/CustomImage";
import { useTypeDispatch } from "../../../hooks/useTypeDispatch";
import { createCountry } from "../../../store/Slices/countriesSlice/asyncActions";

interface IPramsInput {
  name: string;
  translation: string;
  photo: string;
}
const CreateCountry = () => {
  const dispatch = useTypeDispatch();

  const [form] = Form.useForm<IPramsInput>();
  const [loading, setLoading] = useState<boolean>(false);

  const [imgFile, setImgFile] = useState<File | null>(null);
  const [previewImage, serPreviewImage] = useState<string | null>(null);

  const onFinish = (values: IPramsInput) => {
    setLoading(true);
    const formData = new FormData();
    for (const [key, value] of Object.entries(values)) {
      formData.append(key, value);
    }
    if (imgFile) {
      formData.append("photo", imgFile);
    }
    dispatch(createCountry(formData))
      .then(() => {
        form.resetFields();
        setImgFile(null);
        serPreviewImage(null);
      })
      .finally(() => {
        setLoading(false);
      });

    console.log(values);
  };
  return (
    <Form form={form} onFinish={onFinish}>
      <div className="form-item">
        <p>Название/en</p>
        <Form.Item
          name={"name"}
          rules={[
            required,
            // {
            //   pattern: /^[A-Za-z0-9_-]+$/u,
            //   message: "'en' для кого написано не пойму?",
            // },
          ]}
        >
          <Input />
        </Form.Item>
      </div>
      <div className="form-item">
        <p>Перевод/ru</p>
        <Form.Item
          name={"translation"}
          rules={[
            required,
            // {
            //   pattern: /^[А-Яа-яЁё0-9_-]+$/u,
            //   message: "'ru' приколы какие-то?",
            // },
          ]}
        >
          <Input />
        </Form.Item>
      </div>
      <div className="form-item">
        <p>Фото</p>

        {previewImage && (
          <div className="h-40 mb-3" style={{ minWidth: "300px" }}>
            <CustomImage
              rootClasses="!overflow-hidden rounded-2xl"
              src={previewImage}
              errorSrc="https://metallprofil.pkmk.ru/local/templates/aspro-stroy/images/noimage_detail.png"
              width={"100%"}
              height={"100%"}
            />
          </div>
        )}
        <UploadInput
          file={imgFile}
          setFile={setImgFile}
          setPreviewImage={serPreviewImage}
          accept=".svg"
        />
      </div>

      <Button
        loading={loading}
        htmlType="submit"
        type="primary"
        size="large"
        className="ml-auto flex mt-2"
      >
        Сохранить
      </Button>
    </Form>
  );
};

export default CreateCountry;
