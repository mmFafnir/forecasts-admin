import { Button, Form, Select, Space, Spin } from "antd";
import axios from "../../core/axios";
import { FC, useEffect, useState } from "react";
import TextEditor from "../../components/TextEditor";
import { notify } from "../../assets/scripts/notify";

interface IFetchPolicy {
  ru_text: string;
  en_text: string;
}
const getPrivacyPolicy = async () => {
  const { data } = await axios.get("/get_privice_text");
  return data.data;
};

const updatePrivacyPolicy = async (values: IFetchPolicy) => {
  const { data } = await axios.post("/update_privice_police", values);
  console.log(data);
};

const options = [
  { label: "RU", value: "ru" },
  { label: "ENG", value: "en" },
];

const PrivacyPolicy: FC = () => {
  const [data, setData] = useState<null | IFetchPolicy>(null);
  const [lang, setLang] = useState<string>(options[0].value);
  const [loading, setLoading] = useState<boolean>(false);

  const [form] = Form.useForm<IFetchPolicy>();

  const onFinish = (values: IFetchPolicy) => {
    setLoading(true);
    updatePrivacyPolicy(values)
      .then(() => {
        notify({
          type: "success",
          message: "Текст успешно обновлен",
        });
      })
      .catch(() => {
        notify({
          type: "error",
          message: "Ошибка",
          description: "Попробуйсте позже",
        });
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getPrivacyPolicy().then((res) => {
      setData(res);
    });
  }, []);

  return (
    <>
      <div className="flex items-center">
        <h1>Политика конфиданциальности</h1>
      </div>
      <div className="mt-6 max-w-3xl">
        {!data ? (
          <Space className="flex h-96 max-w-md justify-center items-center">
            <Spin size="large" />
          </Space>
        ) : (
          <div className="flex flex-col">
            <Select
              prefixCls="Язык"
              className="w-56 mb-2 mr-auto text-left"
              options={options}
              value={lang}
              onChange={setLang}
            />

            <Form form={form} onFinish={onFinish}>
              <Form.Item
                name={"ru_text"}
                className={`${lang !== "ru" ? "hidden" : ""}`}
              >
                <TextEditor initialValue={data.ru_text} />
              </Form.Item>
              <Form.Item
                name={"en_text"}
                className={`${lang !== "en" ? "hidden" : ""}`}
              >
                <TextEditor initialValue={data.en_text} />
              </Form.Item>

              <div className="flex">
                <Button
                  htmlType="submit"
                  type="primary"
                  size="large"
                  className="ml-auto"
                  loading={loading}
                >
                  Сохранить
                </Button>
              </div>
            </Form>
          </div>
        )}
      </div>
    </>
  );
};

export default PrivacyPolicy;
