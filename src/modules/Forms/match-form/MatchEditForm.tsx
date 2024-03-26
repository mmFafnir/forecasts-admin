import { Button, Form, Row, Spin, Switch } from "antd";
import { FC, useState } from "react";
import { sports } from "../../../assets/data/sports";
import TextEditor from "../../../components/TextEditor";
import EventForm from "../../../components/Events/EventForm";
import { TypeMatch } from "../../../store/Slices/matchesSlice/interface";
import TextArea from "antd/es/input/TextArea";
import {
  confirmGptMessage,
  getMatchTextGpt,
  resendGptMessage,
} from "../../../api/ChatGPT";
import { useTypeDispatch } from "../../../hooks/useTypeDispatch";
import { switchFavoriteCups } from "../../../store/Slices/matchesSlice/asyncAction";
import { notify } from "../../../assets/scripts/notify";
import LoaderCover from "../../../components/UI/LoaderCover";
import CustomImage from "../../../components/UI/CustomImage";
import { useTypeSelector } from "../../../hooks/useTypeSelector";
import { Link } from "react-router-dom";
import ModalFullScreen from "../../../components/UI/ModalFullScreen";
import { updateMatch } from "./api/updateMatch";

interface IProps {
  match: TypeMatch;
}

interface IInputs {
  chat_gpt_text: string;
  game_analize: string;
  show_card: boolean;
}

const MatchEditForm: FC<IProps> = ({ match }) => {
  const { user } = useTypeSelector((state) => state.user);
  const dispatch = useTypeDispatch();

  const [form] = Form.useForm<IInputs>();
  const [favoriteCup, setFavoriteCup] = useState<boolean>(
    match.favorite_game == "0" ? false : true
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingSwitch, setSwitchLoading] = useState<boolean>(false);
  const [loadingUpdate, setLoadingUpdate] = useState<boolean>(false);
  const [chatGbtStatus, setChatGbtStatus] = useState<number>(
    match.chat_gpt_text_status
  );

  const onClickGetMatch = () => {
    setLoading(true);
    getMatchTextGpt(match.id)
      .then((res) => {
        if (res === "error") return;
        setChatGbtStatus(res.chat_gpt_text_status);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const switchCup = () => {
    setSwitchLoading(true);
    setFavoriteCup((prev) => !prev);
    dispatch(switchFavoriteCups(match.id))
      .catch(() => {
        notify({ type: "error", message: "Ошибка :(" });
        setFavoriteCup((prev) => !prev);
      })
      .finally(() => {
        setSwitchLoading(false);
      });
  };

  const confirmGptText = (id: number) => {
    confirmGptMessage(id).then((res) => {
      if (res === "error") return;
      setChatGbtStatus(res.chat_gpt_text_status);
    });
  };

  const resendGptText = (id: number) => {
    resendGptMessage(id)
      .then((res) => {
        setChatGbtStatus(res.chat_gpt_text_status);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onUpdate = () => {
    const values = form.getFieldsValue();
    setLoadingUpdate(true);
    updateMatch({
      match_id: match.id,
      game_analize: values.game_analize,
      show_card: values.show_card ? "1" : "0",
      chat_gpt_text: values.chat_gpt_text,
    })
      .then(() => {
        notify({
          type: "success",
          message: "Матч успешно обновлен",
        });
      })
      .catch(() => {
        notify({
          type: "error",
          message: "Ошибка, попробуйте позже",
        });
      })
      .finally(() => setLoadingUpdate(false));
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
        onFinish={onUpdate}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <div className="flex form-item mb-2">
          <p className="!mb-0 mr-2">Ссылка на матч:</p>
          <a
            target="_blank"
            style={{ fontSize: "16px" }}
            href={`https://aibetguru.com/soccer/${match.url}`}
          >
            https://aibetguru.com/soccer/{match.url}
          </a>
        </div>
        <div className="flex form-item">
          <p className="mr-3">Кубок любимый</p>
          <Switch
            loading={loadingSwitch}
            onChange={switchCup}
            checked={favoriteCup}
            className="bg-slate-400"
          />
        </div>
        {/* </Form.Item> */}

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
              Первая команда:
              <Link to={`/teams/${match.home_team.id}`}>
                {match.home_team.team_name}
              </Link>
            </p>
            <div className="mb-2">
              <p className="flex items-center">
                Страна:
                <CustomImage
                  classes="!object-contain"
                  errorSrc="https://cdn-icons-png.flaticon.com/512/921/921490.png"
                  src={`https://admin.aibetguru.com/${
                    match.home_team.country?.photo || "null.svg"
                  }`}
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
                src={`https://admin.aibetguru.com/${
                  match.home_team?.photo || "null.svg"
                }`}
                errorSrc="https://metallprofil.pkmk.ru/local/templates/aspro-stroy/images/noimage_detail.png"
              />
            </div>
          </div>

          {/* Вторая команда */}
          <div className="w-5/12 form-item form-team">
            <p>
              Вторая команда:
              <Link to={`/teams/${match.away_team.id}`}>
                {match.away_team.team_name}
              </Link>
            </p>
            <div className="mb-2">
              <p className="flex items-center">
                Страна:
                <CustomImage
                  classes="!object-contain"
                  src={`https://admin.aibetguru.com/${
                    match.away_team.country?.photo || "null.svg"
                  }`}
                  errorSrc="https://cdn-icons-png.flaticon.com/512/921/921490.png"
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
                src={`https://admin.aibetguru.com/${match.away_team.photo}`}
                errorSrc="https://metallprofil.pkmk.ru/local/templates/aspro-stroy/images/noimage_detail.png"
              />
            </div>
          </div>
        </Row>

        {/* gpt тексты */}
        <div className="relative mt-8 text-end">
          <div className="sticky top-2 text-right z-10 inline-block ml-auto mb-2">
            {chatGbtStatus == 2 && (
              <Button
                onClick={() => confirmGptText(match.id)}
                type="primary"
                className="mr-2"
              >
                Подтвердить
              </Button>
            )}
            {chatGbtStatus >= 2 && (
              <Button onClick={() => resendGptText(match.id)} type="primary">
                Повторный запрос
              </Button>
            )}
          </div>

          {/* Текст для чата GPT */}
          {chatGbtStatus !== 4 && user?.role_id == "1" && (
            <div className="form-item">
              <div className="flex items-center mb-2">
                <p className="!mb-0 mr-2">Текст для чата GPT</p>
                {(chatGbtStatus == 0 ||
                  chatGbtStatus == 1 ||
                  chatGbtStatus == 10) && (
                  <Button
                    className="ml-auto"
                    onClick={onClickGetMatch}
                    type="primary"
                    loading={
                      chatGbtStatus == 1 || chatGbtStatus == 10 || loading
                    }
                  >
                    Получить ответ
                  </Button>
                )}
                {chatGbtStatus === 3 && (
                  <p className="ml-auto">
                    <span className="!font-medium">
                      Ждем создания карточек:{" "}
                    </span>
                    <Spin size="default" />
                  </p>
                )}
              </div>
              <ModalFullScreen>
                <Form.Item
                  name={"chat_gpt_text"}
                  initialValue={match.chat_gpt_text ? match.chat_gpt_text : ""}
                >
                  <TextArea
                    className="!resize-none !h-80"
                    disabled={chatGbtStatus === 3}
                    size="large"
                    defaultValue={
                      match.chat_gpt_text ? match.chat_gpt_text : ""
                    }
                  />
                </Form.Item>
              </ModalFullScreen>
            </div>
          )}

          {/* Кф */}
          {chatGbtStatus !== 4 && (
            <Form.Item
              className="mt-8"
              name={"game_cf"}
              initialValue={match.game_cf ? match.game_cf : ""}
            >
              <div className="form-item">
                <div className="flex items-center mb-2">
                  <p className="!mb-0">Коэффициент:</p>
                  {chatGbtStatus === 3 && (
                    <p className="ml-auto">
                      <span className="!font-medium">
                        Ждем создания карточек:{" "}
                      </span>
                      <Spin size="default" />
                    </p>
                  )}
                </div>
                <LoaderCover loading={chatGbtStatus === 1}>
                  <TextArea
                    disabled={chatGbtStatus === 3}
                    className="!resize-none !h-80"
                    size="large"
                    defaultValue={match.game_cf ? match.game_cf : ""}
                  />
                </LoaderCover>
              </div>
            </Form.Item>
          )}

          {/* Анализ */}
          <div className="form-item mt-8 pb-9">
            <div className="flex mb-2">
              <p>Анализ:</p>
              {/* <Button>Изменить</Button> */}
            </div>
            <LoaderCover loading={chatGbtStatus === 1}>
              <Form.Item
                name={"game_analize"}
                initialValue={match.game_analize ? match.game_analize : ""}
              >
                <TextEditor
                  initialValue={match.game_analize ? match.game_analize : ""}
                  onChange={(value) =>
                    form.setFieldsValue({ game_analize: value })
                  }
                />
              </Form.Item>
            </LoaderCover>
          </div>
        </div>
        <div className="flex justify-end">
          {match.chat_gpt_text_status == 4 && (
            <div className="flex items-center mr-2">
              <p className="font-semibold mr-2">Показать события на сайте:</p>
              <Form.Item
                name={"show_card"}
                noStyle
                valuePropName="checked"
                initialValue={match.show_card == "1"}
              >
                <Switch title="После изменения не забудь нажать на кнопку 'Обновить'" />
              </Form.Item>
            </div>
          )}
          {(match.chat_gpt_text_status == 4 ||
            match.chat_gpt_text_status == 2) && (
            <Button
              type="primary"
              loading={loadingUpdate}
              htmlType="submit"
              size="large"
              className="font-semibold "
            >
              Обновить
            </Button>
          )}
        </div>
      </Form>

      {/* События */}
      {match.cards && match.cards.length > 0 && (
        <EventForm cards={match.cards} />
      )}
    </>
  );
};

export default MatchEditForm;
