import { Button, Form, Input, Switch } from "antd";
import { required } from "../../../../core/form-rools";
import { useState } from "react";
import { ICreateRef } from "../../../../store/Slices/refsSlice/interface";
import { useTypeDispatch } from "../../../../hooks/useTypeDispatch";
import { createRef } from "../../../../store/Slices/refsSlice/asyncActions";
import { notify } from "../../../../assets/scripts/notify";

const titleClasses = `text-left font-semibold text-sm `;
export const CreateRef = () => {
  const dispatch = useTypeDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [form] = Form.useForm<ICreateRef>();

  const onFinish = (values: ICreateRef) => {
    setLoading(true);
    dispatch(
      createRef({
        ...values,
        bonus_day: values.bonus_day ? 1 : 0,
        bonus_percent: values.bonus_percent ? 1 : 0,
        free_tariffe: values.free_tariffe ? 1 : 0,
      })
    )
      .then((res) => {
        if (!res.payload) {
          notify({
            type: "error",
            message: "Ошибка!",
            description: "Проверьте, такая ссылка может уже существует",
          });
          return;
        }
        notify({
          type: "success",
          message: "Реферальная ссылка уже создана!",
        });
        form.resetFields();
      })
      .finally(() => setLoading(false));
    console.log(values);
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
      <div className="flex items-center mb-4 mt-5">
        <p className={`${titleClasses} !mb-0 mr-2`}>Бесплатный:</p>
        <Form.Item
          name={"free_tariffe"}
          noStyle
          valuePropName="checked"
          initialValue={false}
        >
          <Switch unCheckedChildren="Нет" checkedChildren="Да" />
        </Form.Item>
      </div>
      <div className="mb-4 flex items-center">
        <p className={titleClasses}>Бонусгый день:</p>
        <Form.Item name="bonus_day" noStyle valuePropName="checked">
          <Switch
            className="ml-1"
            unCheckedChildren="Нет"
            checkedChildren="Да"
          />
        </Form.Item>
      </div>
      <div className="mb-4 flex items-center">
        <p className={titleClasses}>Скидка:</p>
        <Form.Item name="bonus_percent" noStyle valuePropName="checked">
          <Switch
            className="ml-1"
            unCheckedChildren="Нет"
            checkedChildren="Да"
          />
        </Form.Item>
      </div>
      <div className="mb-4">
        <p className={titleClasses}>Код: </p>
        <Form.Item name="code" rules={[required]}>
          <Input />
        </Form.Item>
      </div>

      <div className="mb-4">
        <p className={titleClasses}>Срок действия:</p>
        <Form.Item name="work_count" rules={[required]}>
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
