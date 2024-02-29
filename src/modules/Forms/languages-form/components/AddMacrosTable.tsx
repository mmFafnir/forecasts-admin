import { Form, Input, Modal } from "antd";
import TextArea from "antd/es/input/TextArea";
import { FC } from "react";
import { IJsonParse } from "./Table";
import { required } from "../../../../core/form-rools";
import { notify } from "../../../../assets/scripts/notify";

interface IProps {
  open: boolean;
  data: IJsonParse[];
  setOpen: (open: boolean) => void;
  setData: (macros: IJsonParse[]) => void;
}

const AddMacrosTable: FC<IProps> = ({ open, setOpen, setData, data }) => {
  const [form] = Form.useForm<IJsonParse>();
  const closeModal = () => setOpen(false);

  const onFinish = (values: IJsonParse) => {
    if (data.find((item) => item.macros === values.macros)) {
      notify({
        type: "error",
        message: `${values.macros} уже существует`,
      });
      return;
    }
    setData([
      {
        macros: values.macros,
        key: values.macros,
        value: values.value,
      },
      ...data,
    ]);
    setOpen(false);
  };

  return (
    <Modal onOk={form.submit} open={open} onCancel={closeModal}>
      <Form form={form} onFinish={onFinish} className="mt-8">
        <p className="mb-2 text-sm font-medium">Создать Макрос</p>

        <p className="mb-1">Номер Макроса:</p>
        <Form.Item name={"macros"} rules={[required]}>
          <Input />
        </Form.Item>
        <p className="mt-2 mb-1">Текст:</p>
        <Form.Item name={"value"} rules={[required]}>
          <TextArea autoSize={{ minRows: 1, maxRows: 40 }} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddMacrosTable;
