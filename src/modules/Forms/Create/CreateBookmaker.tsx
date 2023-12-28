import { Button, Form, Input } from "antd";
import { FC, useState } from "react";
import { IDataCreateBookmaker } from "../../../store/Slices/bookmakersSlice/interface";
import { required } from "../../../core/form-rools";
import { useTypeDispatch } from "../../../hooks/useTypeDispatch";
import { createBookmaker } from "../../../store/Slices/bookmakersSlice/asyncActions";
import { notify } from "../../../assets/scripts/notify";
import UploadInput from "../../../components/UI/Form/UploadInput";

const titleClasses = `text-left font-semibold text-sm mb-1`;

const CreateBookmaker: FC = () => {
  const dispatch = useTypeDispatch();
  const [form] = Form.useForm<IDataCreateBookmaker>();
  const [loading, setLoading] = useState<boolean>(false);
  const [imgFile, setImgFile] = useState<File | null>(null);

  const onFinish = async (values: IDataCreateBookmaker) => {
    setLoading(true);
    const formData = new FormData();

    if (imgFile) {
      formData.append("logo", imgFile);
    }
    for (const [key, value] of Object.entries(values)) {
      formData.append(key, value);
    }

    dispatch(createBookmaker(formData))
      .then(() => {
        notify({
          type: "success",
          message: "Успех",
          description: `Букмекер ${values.name} был успешно добавлен`,
        });
      })
      .catch(() => {
        notify({
          type: "error",
          message: "Ошибка",
          description: "Попробуйте позже",
        });
      })
      .finally(() => {
        setImgFile(null);
        form.resetFields();
        setLoading(false);
      });
  };

  return (
    <Form
      form={form}
      name="bookmaker-create-form"
      layout="vertical"
      style={{ maxWidth: "700px" }}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item className="mb-7" name="name" rules={[required]}>
        <div>
          <p className={titleClasses}>Наименование Букмекера </p>
          <Input />
        </div>
      </Form.Item>
      <Form.Item
        className="mb-7"
        name="url"
        rules={[
          required,
          {
            pattern: /(http|https):\/\/[^\s]+/gm,
            message: "Данное значение не является ссылкой",
          },
        ]}
      >
        <div>
          <p className={titleClasses}>Ссылка на Букмекера</p>
          <Input />
        </div>
      </Form.Item>

      <div className="mb-7">
        <p className={`${titleClasses} mb-3`}>Загрузить логотип</p>
        <UploadInput file={imgFile} setFile={setImgFile} />
      </div>

      <Form.Item className="mb-7" name="code" rules={[required]}>
        <div>
          <p className={titleClasses}>Промокод </p>
          <Input />
        </div>
      </Form.Item>
      <Form.Item className="mb-7" name="price" rules={[required]}>
        <div>
          <p className={titleClasses}>Сумма подарка </p>
          <Input type="number" />
        </div>
      </Form.Item>

      <div className="flex">
        <Button
          htmlType="submit"
          className="ml-auto"
          size="large"
          type="primary"
          loading={loading}
        >
          Сохранить
        </Button>
      </div>
    </Form>
  );
};

export default CreateBookmaker;
