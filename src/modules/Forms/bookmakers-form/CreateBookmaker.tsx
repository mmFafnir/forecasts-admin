import { Button, Form, Input, Switch } from "antd";
import { FC, useState } from "react";
import { IDataCreateBookmaker } from "../../../store/Slices/bookmakersSlice/interface";
import { required } from "../../../core/form-rools";
import { useTypeDispatch } from "../../../hooks/useTypeDispatch";
import { createBookmaker } from "../../../store/Slices/bookmakersSlice/asyncActions";
import { notify } from "../../../assets/scripts/notify";
import UploadInput from "../../../components/UI/Form/UploadInput";
import SelectCountries from "../../Selects/SelectCountries";
import SelectSports from "../../Selects/SelectSports";

const titleClasses = `text-left font-semibold text-sm mb-1`;

const CreateBookmaker: FC = () => {
  const dispatch = useTypeDispatch();
  const [form] = Form.useForm<IDataCreateBookmaker>();
  const [loading, setLoading] = useState<boolean>(false);

  const [imgFile, setImgFile] = useState<File | null>(null);

  const [countries, setCountries] = useState<string[]>([]);
  const [sports, setSports] = useState<string[]>([]);

  const onFinish = async (values: IDataCreateBookmaker) => {
    setLoading(true);
    const formData = new FormData();

    if (imgFile) {
      formData.append("logo", imgFile);
    }
    for (const [key, value] of Object.entries(values)) {
      if (key === "best_status") {
        formData.append(key, value ? "1" : "0");
      } else {
        formData.append(key, value);
      }
    }

    countries.forEach((country) => {
      console.log(country);
      formData.append("country_ids[]", country);
    });

    sports.forEach((item) => {
      formData.append("sport_ids[]", item);
    });

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
      <div className="flex items-center mb-3 mt-5">
        <p className={`${titleClasses} !mb-0 mr-2`}>Избранный</p>
        <Form.Item
          name={"best_status"}
          noStyle
          valuePropName="checked"
          initialValue={false}
        >
          <Switch />
        </Form.Item>
      </div>
      <div className="mb-4">
        <p className={titleClasses}>Наименование Букмекера </p>
        <Form.Item name="name" rules={[required]}>
          <Input />
        </Form.Item>
      </div>

      <div className="mb-4">
        <p className={titleClasses}>Ссылка на Букмекера</p>
        <Form.Item
          name="url"
          rules={[
            required,
            {
              pattern: /(http|https):\/\/[^\s]+/gm,
              message: "Данное значение не является ссылкой",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </div>

      <div className="mb-4">
        <p className={`${titleClasses}`}>Добавить Страну</p>
        <SelectCountries setData={setCountries} />
      </div>

      <div className="mb-4">
        <p className={`${titleClasses}`}>Добавить вид спорта</p>
        <SelectSports setData={setSports} />
      </div>

      <div className="mb-4">
        <p className={`${titleClasses} mb-3`}>Загрузить логотип</p>
        <UploadInput file={imgFile} setFile={setImgFile} />
      </div>

      <div className="mb-4">
        <p className={titleClasses}>Промокод </p>
        <Form.Item name="code" rules={[required]}>
          <Input />
        </Form.Item>
      </div>
      <div className="mb-4">
        <p className={titleClasses}>Сумма подарка </p>
        <Form.Item name="price" rules={[required]}>
          <Input type="number" />
        </Form.Item>
      </div>

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
