import { Button, Form, Input, Row, Switch } from "antd";
import { FC } from "react";
import SelectForm from "../components/UI/Form/SelectForm";
import { NotifyEnum } from "../types/notifyEnum";
import DateForm from "../components/UI/Form/DateForm";
import TimeForm from "../components/UI/Form/TimeForm";
import FileImage from "../components/UI/Form/FileImage";
import TextEditor from "../components/TextEditor";

const MatchElementPage: FC = () => {
  const [form] = Form.useForm();

  const onFinish = (values: unknown) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: unknown) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="form m-12">
      <h1 className="mb-5">Редактировать Матч</h1>
      <Form
        form={form}
        name="basic"
        layout="vertical"
        style={{ maxWidth: "1000px" }}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          className="items-start form-item"
          name={"favorite_cup"}
          // label="Кубок любимый"
        >
          <div className="flex">
            <p className="mr-3">Кубок любимый</p>
            <Switch className="bg-slate-400" />
          </div>
        </Form.Item>

        <Row>
          <Form.Item className="mr-4" name={"sport"}>
            <SelectForm
              label="Вид спорта"
              data={[]}
              defaultValue="lucy"
              setValue={(value) => form.setFieldsValue({ sport: value })}
            />
          </Form.Item>
          <Form.Item className="mr-4" name={"countries"}>
            <SelectForm
              label="Страна"
              data={[]}
              defaultValue="lucy"
              setValue={(value) => form.setFieldsValue({ countries: value })}
            />
          </Form.Item>
          <Form.Item name={"league"}>
            <SelectForm
              label="Лига"
              data={[]}
              defaultValue="lucy"
              setValue={(value) => form.setFieldsValue({ league: value })}
            />
          </Form.Item>
        </Row>

        <Form.Item
          name={"tur"}
          label={"Тур"}
          rules={[
            {
              required: true,
              message: NotifyEnum.EMPTY,
            },
          ]}
        >
          <Input defaultValue={"Групповой этап"} />
        </Form.Item>

        <Row>
          <Form.Item className="mr-4" name={"date"}>
            <DateForm
              setDate={(value) => form.setFieldsValue({ date: value })}
              defaultDate="06-06-2023"
              label="Дата"
            />
          </Form.Item>
          <Form.Item name={"time"}>
            <TimeForm
              defaultValue="8:02 PM"
              label="Время"
              setTime={(value) => form.setFieldsValue({ time: value })}
            />
          </Form.Item>
        </Row>

        <Row className="mt-8" justify={"space-between"}>
          <div className="w-5/12 form-team">
            <p>Первая команда</p>
            <Form.Item className="mb-2" name={"team_first_name"}>
              <Input defaultValue={"Янг Бойз"} />
            </Form.Item>
            <Form.Item name={"team_first_name_en"}>
              <Input defaultValue={"Young Boys"} />
            </Form.Item>
            <FileImage defaultImg="/1.png" />
          </div>
          <div className="w-5/12 form-team">
            <p>Первая команда</p>
            <Form.Item className="mb-2" name={"team_second_name"}>
              <Input defaultValue={"РБ Лейпциг"} />
            </Form.Item>
            <Form.Item name={"team_second_name_en"}>
              <Input defaultValue={"RB Leipzig"} />
            </Form.Item>

            <FileImage defaultImg="/2.png" />
          </div>
        </Row>

        <Form.Item name={"analysis"}>
          <TextEditor />
        </Form.Item>

        <Button type="default" htmlType="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default MatchElementPage;
