import { Button, Form, Input } from "antd";
import { required } from "../../../core/form-rools";
import { useEffect, useState } from "react";
import UploadInput from "../../../components/UI/Form/UploadInput";
import CustomImage from "../../../components/UI/CustomImage";
import { useTypeDispatch } from "../../../hooks/useTypeDispatch";
import { createCountry } from "../../../store/Slices/countriesSlice/asyncActions";
import { notify } from "../../../assets/scripts/notify";
// import { useTypeSelector } from "../../../hooks/useTypeSelector";

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
      .then((res) => {
        if (!res.payload) {
          notify({
            type: "error",
            message: "Ошибка!",
            description: "Произошла ошибка, попробуйте позже",
          });
          return;
        }
        console.log(res);
        form.resetFields();
        setImgFile(null);
        serPreviewImage(null);
      })
      .finally(() => {
        setLoading(false);
      });

    console.log(values);
  };

  useEffect(() => {
    form.setFieldValue("photo", imgFile);
  }, [imgFile]);

  return (
    <Form form={form} onFinish={onFinish}>
      <div className="form-item">
        <p>Название/en</p>
        <Form.Item
          name={"name"}
          rules={[
            required,
            {
              pattern: /^[A-Za-z\s\d\-/]+$/u,
              message: "Название должно быть на анлийском",
            },
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
            {
              pattern: /^[А-Яа-яЁё\s\d\-/]+$/u,
              message: "На русском пожалуйста",
            },
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
        <Form.Item name={"photo"} rules={[required]}>
          <UploadInput
            file={imgFile}
            setFile={setImgFile}
            setPreviewImage={serPreviewImage}
            accept=".svg"
          />
        </Form.Item>
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
