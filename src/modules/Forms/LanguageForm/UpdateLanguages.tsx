import { FC, useEffect, useState } from "react";
import {
  IParamsLanguages,
  TypeLanguages,
} from "../../../store/Slices/languagesSlice/interface";
import { useTypeDispatch } from "../../../hooks/useTypeDispatch";
import { Button, Form, Input, Modal } from "antd";
import { required } from "../../../core/form-rools";
import {
  deleteLanguage,
  updateLanguages,
} from "../../../store/Slices/languagesSlice/asyncAactions";
import { notify } from "../../../assets/scripts/notify";
import { useNavigate } from "react-router-dom";
import { useTypeSelector } from "../../../hooks/useTypeSelector";
import { EnumStatus } from "../../../types/Status";
import Table from "./components/Table";

interface IProps {
  lang: TypeLanguages;
}
const UpdateLanguages: FC<IProps> = ({ lang }) => {
  const navigate = useNavigate();
  const dispatch = useTypeDispatch();

  const { status } = useTypeSelector((state) => state.languages);

  const [form] = Form.useForm<IParamsLanguages>();
  const [loading, setLoading] = useState<boolean>(false);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [loadingError, setLoadingError] = useState<boolean>(false);

  const [dataJson, setDataJson] = useState<{ [key: string]: string }>(
    JSON.parse(lang.lang_json)
  );

  const onFinish = (values: IParamsLanguages) => {
    setLoading(true);
    console.log(values);
    dispatch(
      updateLanguages({
        data: { ...values, lang_json: JSON.stringify(dataJson) },
        id: lang.id,
      })
    ).finally(() => {
      setLoading(false);
    });
  };

  const onDelete = () => {
    setLoadingError(true);
    dispatch(deleteLanguage(lang.id))
      .then((res) => {
        if (!res.payload) return;
        navigate("/translates");
        notify({
          type: "success",
          message: `Язык ${lang.name} удален`,
        });
      })
      .finally(() => {
        setLoadingError(false);
      });
  };
  useEffect(() => {
    if (status !== EnumStatus.ERROR) return;
    notify({
      type: "error",
      message: "Ошибка",
      description: "Произошла ошибка при удалении",
    });
    setModalIsOpen(false);
  }, [status]);

  return (
    <div style={{ maxWidth: "800px" }}>
      <Form
        form={form}
        name="lang-form"
        layout="vertical"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        autoComplete="off"
        onFinish={onFinish}
        onKeyDown={(e) => (e.keyCode == 13 ? e.preventDefault() : "")}
      >
        <div className="form-item">
          <p>Название языка </p>
          <Form.Item
            className="form-item"
            name={"name"}
            initialValue={lang.name}
            rules={[required]}
          >
            <Input enterKeyHint="next" />
          </Form.Item>
        </div>
        <div className="form-item">
          <p>Код языка </p>
          <Form.Item
            className="form-item"
            name={"url"}
            initialValue={lang.url}
            rules={[required]}
          >
            <Input />
          </Form.Item>
        </div>
      </Form>
      <div className="form-item">
        <p>JSON </p>
        <Table json={JSON.parse(lang.lang_json)} setData={setDataJson} />
      </div>
      <div className="flex">
        <Button
          type="primary"
          onClick={form.submit}
          size="large"
          loading={loading}
          className="mr-2 mt-8 flex w-28 justify-center"
        >
          Сохранить
        </Button>
        <Button
          danger
          onClick={() => setModalIsOpen(true)}
          type="primary"
          size="large"
          htmlType="button"
          className="mr-auto mt-8 flex w-28 justify-center"
        >
          Удалить
        </Button>
      </div>
      <Modal
        title="Удалить?!"
        open={modalIsOpen}
        onOk={onDelete}
        onCancel={() => setModalIsOpen(false)}
        cancelText="Нет"
        okText="Уверен!"
        confirmLoading={loadingError}
      >
        <p>Вы уверены, что хотите удалить {lang.name} язык?</p>
      </Modal>
    </div>
  );
};

export default UpdateLanguages;
