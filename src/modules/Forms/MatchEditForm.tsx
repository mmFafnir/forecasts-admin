import { Button, Form, Row, Switch } from "antd";
import { FC } from "react";
import { sports } from "../../assets/data/sports";
import TextEditor from "../../components/TextEditor";
import EventForm from "../../components/Events/EventForm";
import { TypeMatch } from "../../store/Slices/matchesSlice/interface";
import CustomImage from "../../components/UI/CustomImage";
import axios from "../../core/axios";
import TextArea from "antd/es/input/TextArea";

interface IProps {
  match: TypeMatch;
}

const getMatchTextGpt = async (id: number | string) => {
  try {
    const { data } = await axios.get(
      `/send_message_in_chat_gpt_for_match/match_id=${id}`
    );
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

const confirmGptMessage = async (id: number | string) => {
  try {
    const { data } = await axios.get(
      `/confirm_chat_gpt_message/match_id=${id}`
    );

    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

const resendGptMessage = async (id: number | string) => {
  try {
    const { data } = await axios.get(
      `/resend_message_to_chat_gpt/match_id=${id}`
    );

    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

const MatchEditForm: FC<IProps> = ({ match }) => {
  console.log(match);
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
            <Switch
              defaultChecked={match.favorite_game == "0" ? false : true}
              className="bg-slate-400"
            />
          </div>
        </Form.Item>

        {/* Select'ы */}
        <Row>
          {/* Вид спорта */}
          <div className="mr-4 form-item">
            <p>
              Вид спорта:{" "}
              <span>
                {
                  sports.find(
                    (sport) => sport.id === Number(match.leagues.sport_id)
                  )?.label
                }
              </span>
            </p>
          </div>

          {/* Лига */}
          <div className="form-item">
            <p>
              Лига: <span>{match.leagues.league_name}</span>
            </p>
          </div>
        </Row>

        {/* Даты */}
        <Row>
          {/* Дата */}
          <div className="mr-4 form-item">
            <p>
              Дата:<span>{match.real_date}</span>
            </p>
          </div>
          {/* Время */}
          <div className="form-item">
            <p>
              Время:<span>{match.real_time}</span>
            </p>
          </div>
        </Row>

        {/* Команды */}
        <Row className="mt-8" justify={"space-between"}>
          {/* Первая команда */}
          <div className="w-5/12 form-item form-team">
            <p>
              Первая команда:<span>{match.home_team.team_name}</span>
            </p>
            <div className="mb-2">
              <p className="flex items-center">
                Страна:
                <CustomImage
                  classes="!object-contain"
                  errorSrc="https://cdn-icons-png.flaticon.com/512/921/921490.png"
                  src={`https://admin.aibetguru.com/uploads/${match.home_team.team_cc}.svg`}
                  width={35}
                  height={23}
                />
              </p>
            </div>
            <div className="flex">
              <CustomImage
                classes=""
                width={150}
                height={150}
                src={`https://admin.aibetguru.com/uploads/${match.home_team.team_id}.png`}
                errorSrc="https://metallprofil.pkmk.ru/local/templates/aspro-stroy/images/noimage_detail.png"
              />
            </div>
          </div>

          {/* Вторая команда */}
          <div className="w-5/12 form-item form-team">
            <p>
              Вторая команда:<span>{match.away_team.team_name}</span>
            </p>
            <div className="mb-2">
              <p className="flex items-center">
                Страна:
                <CustomImage
                  classes="!object-contain"
                  errorSrc="https://cdn-icons-png.flaticon.com/512/921/921490.png"
                  src={`https://admin.aibetguru.com/uploads/${match.away_team.team_cc}.svg`}
                  width={35}
                  height={23}
                />
              </p>
            </div>
            <div className="flex">
              <CustomImage
                classes="!object-fill"
                width={150}
                height={150}
                src={`https://admin.aibetguru.com/uploads/${match.away_team.team_id}.png`}
                errorSrc="https://metallprofil.pkmk.ru/local/templates/aspro-stroy/images/noimage_detail.png"
              />
            </div>
          </div>
        </Row>

        <div className="relative mt-8">
          <div className="sticky top-2 text-right z-10 inline-block ml-auto">
            <Button
              onClick={() => confirmGptMessage(match.id)}
              type="primary"
              className="mr-2"
            >
              Подтвердить
            </Button>
            <Button onClick={() => resendGptMessage(match.id)} type="primary">
              Повторный запрос
            </Button>
          </div>

          {/* Текст для чата GPT */}
          <Form.Item
            name={"chat_gpt_text"}
            initialValue={match.chat_gpt_text ? match.chat_gpt_text : ""}
          >
            <div className="form-item">
              <div className="flex items-center mb-2">
                <p className="!mb-0 mr-2">Текст для чата GPT</p>
                <Button
                  onClick={() => getMatchTextGpt(match.id)}
                  type="primary"
                >
                  Получить ответ
                </Button>
              </div>
              <TextArea
                className="!resize-none !h-80"
                size="large"
                defaultValue={match.chat_gpt_text ? match.chat_gpt_text : ""}
              />
            </div>
          </Form.Item>

          {/* Кф */}
          <Form.Item
            className="mt-8"
            name={"chat_gpt_text"}
            initialValue={match.game_cf ? match.game_cf : ""}
          >
            <div className="form-item">
              <p>Коэффициент:</p>
              <TextArea
                className="!resize-none !h-80"
                size="large"
                defaultValue={match.game_cf ? match.game_cf : ""}
              />
            </div>
          </Form.Item>

          {/* Анализ */}
          <Form.Item
            className="mt-8 pb-9"
            name={"analysis"}
            initialValue={match.game_analize ? match.game_analize : ""}
          >
            <div className="form-item">
              <p>Анализ:</p>

              <TextEditor
                defaultValue={match.game_analize ? match.game_analize : ""}
                onChange={(value) => form.setFieldsValue({ analysis: value })}
              />
            </div>
          </Form.Item>
        </div>
      </Form>

      {/* События */}
      <EventForm />

      <Button
        type="primary"
        size="large"
        className="mr-auto mt-8 flex w-44 justify-center"
        onClick={onFinish}
      >
        Сохранить
      </Button>
    </>
  );
};

export default MatchEditForm;
