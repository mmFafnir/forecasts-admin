import { Button, Form, Input, Row, Switch } from "antd";
import { FC } from "react";
import SelectForm from "../../components/UI/Form/SelectForm";
import { sports } from "../../assets/data/sports";
import { countries } from "../../assets/data/countries";
import { leagues } from "../../assets/data/leagues";
import { required } from "../../core/form-rools";
import DateForm from "../../components/UI/Form/DateForm";
import TimeForm from "../../components/UI/Form/TimeForm";
import FileImage from "../../components/UI/Form/FileImage";
import TextEditor from "../../components/TextEditor";
import EventForm from "../../components/Events/EventForm";

const MatchEditForm: FC = () => {
  const [form] = Form.useForm();

  const onFinish = () => {
    console.log("Success:", form.getFieldsValue());
  };

  const onFinishFailed = (errorInfo: unknown) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
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
        {/* Switch любимый кубок */}
        <Form.Item
          className="items-start"
          name={"favorite_cup"}
          // label="Кубок любимый"
        >
          <div className="flex form-item">
            <p className="mr-3">Кубок любимый</p>
            <Switch className="bg-slate-400" />
          </div>
        </Form.Item>

        {/* Select'ы */}
        <Row>
          {/* Вид спорта */}
          <Form.Item className="mr-4 form-item" name={"sport"}>
            <SelectForm
              label={"Вид спорта"}
              data={sports}
              defaultValue={sports[0].value}
              setValue={(value) => form.setFieldsValue({ sport: value })}
            />
          </Form.Item>
          {/* Страна */}
          <Form.Item className="mr-4 form-item" name={"countries"}>
            <SelectForm
              label={"Страна"}
              data={countries}
              defaultValue={countries[0].value}
              setValue={(value) => form.setFieldsValue({ countries: value })}
            />
          </Form.Item>
          {/* Лини */}
          <Form.Item className="form-item" name={"league"}>
            <SelectForm
              label="Лига"
              data={leagues}
              defaultValue={leagues[0].value}
              setValue={(value) => form.setFieldsValue({ league: value })}
            />
          </Form.Item>
        </Row>

        {/* Тур */}
        <Form.Item
          name={"tur"}
          className="form-item"
          label={"Тур"}
          rules={[required]}
          initialValue={"Групповой этап"}
        >
          <Input defaultValue={"Групповой этап"} />
        </Form.Item>

        {/* Даты */}
        <Row>
          {/* Дата */}
          <Form.Item
            className="mr-4 form-item"
            name={"date"}
            rules={[required]}
          >
            <DateForm
              setDate={(value) => form.setFieldsValue({ date: value })}
              defaultDate="06-06-2023"
              label="Дата"
            />
          </Form.Item>
          {/* Время */}
          <Form.Item className="form-item" name={"time"} rules={[required]}>
            <TimeForm
              defaultValue="8:02 PM"
              label="Время"
              setTime={(value) => form.setFieldsValue({ time: value })}
            />
          </Form.Item>
        </Row>

        {/* Команды */}
        <Row className="mt-8" justify={"space-between"}>
          {/* Первая команда */}
          <div className="w-5/12 form-team">
            <p>Первая команда</p>
            <Form.Item
              className="mb-2"
              name={"team_first_name"}
              rules={[required]}
            >
              <Input defaultValue={"Янг Бойз"} />
            </Form.Item>
            <Form.Item name={"team_first_name_en"} rules={[required]}>
              <Input defaultValue={"Young Boys"} />
            </Form.Item>
            <FileImage defaultImg="/1.png" />
          </div>

          {/* Вторая команда */}
          <div className="w-5/12 form-team">
            <p>Первая команда</p>
            <Form.Item
              className="mb-2"
              name={"team_second_name"}
              rules={[required]}
            >
              <Input defaultValue={"РБ Лейпциг"} />
            </Form.Item>
            <Form.Item name={"team_second_name_en"} rules={[required]}>
              <Input defaultValue={"RB Leipzig"} />
            </Form.Item>

            <FileImage defaultImg="/2.png" />
          </div>
        </Row>

        {/* Анализ */}
        <Form.Item className="mt-5" name={"analysis"}>
          <div className="form-item">
            <p className="mb-2"> Анализ</p>
            <TextEditor
              onChange={(value) => form.setFieldsValue({ analysis: value })}
            />
          </div>
        </Form.Item>
      </Form>
      {/* События */}
      <EventForm />

      <Button
        type="primary"
        size="large"
        htmlType="submit"
        className="mr-auto mt-8 flex w-44 justify-center"
        onClick={onFinish}
      >
        Сохранить
      </Button>
    </>
  );
};

export default MatchEditForm;
