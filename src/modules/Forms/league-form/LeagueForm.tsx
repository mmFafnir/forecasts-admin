import { Button, Form, Input, Row, Select, Switch } from "antd";
import { FC, useState } from "react";
import { TypeLeague } from "../../../store/Slices/leaguesSlice/interface";
import { useTypeDispatch } from "../../../hooks/useTypeDispatch";
import dayjs from "dayjs";
import { required } from "../../../core/form-rools";
import CustomImage from "../../../components/UI/CustomImage";
import { updateLeague } from "../../../store/Slices/leaguesSlice/asyncActions";
import { AxiosError } from "axios";
import { notify } from "../../../assets/scripts/notify";
import {
  asyncTogglePindLeague,
  asyncTogglePindLeagueAdmin,
} from "../../../api/league/asyncTogglePindLeague";
import TableTranslate from "../../TableTranslate/TableTranslate";

interface IInputs {
  league_name: string;
  tir: string;
}
interface IProps {
  league: TypeLeague;
}

const tirs = new Array(20).fill(null);

const titleClasses = `text-left font-semibold text-sm mb-2`;
const LeagueForm: FC<IProps> = ({ league }) => {
  console.log(league);
  const dispatch = useTypeDispatch();

  const [form] = Form.useForm<IInputs>();
  const [loading, setLoading] = useState<boolean>(false);

  const [switchValue, setSwitchValue] = useState<boolean>(
    league.favorit == "1"
  );
  const [loadingSwitch, setLoadingSwitch] = useState<boolean>(false);

  const [switchPinAdmin, setSwitchPinAdmin] = useState<boolean>(
    league.has_toplist_admin == "1"
  );
  const [loadingPinAdmin, setLoadingPinAdmin] = useState<boolean>(false);

  const onFinish = () => {
    setLoading(true);
    dispatch(
      updateLeague({
        league_id: league.id,
        name: form.getFieldsValue().league_name,
        tir: form.getFieldsValue().tir,
      })
    )
      .then(() => {
        notify({
          type: "success",
          message: "Успешно",
          description: `Лига ${league.league_name} успешно обнавлена`,
        });
      })
      .catch((error) => {
        const err = error as AxiosError;
        notify({
          type: "error",
          message: `Ошибка ${err.code}`,
          description: err.message,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const togglePind = () => {
    setLoadingSwitch(true);
    setSwitchValue((prev) => !prev);
    asyncTogglePindLeague(league.id)
      .then((res) => {
        setSwitchValue(res.message === "Add ed in favorite");
      })
      .catch(() => {
        setSwitchValue((prev) => !prev);
        notify({
          type: "error",
          message: "Ошибка",
          description: "Произошла ошибка, попробуйте позже",
        });
      })
      .finally(() => {
        setLoadingSwitch(false);
      });
  };

  const togglePindAdmin = () => {
    setLoadingPinAdmin(true);
    setSwitchPinAdmin((prev) => !prev);
    asyncTogglePindLeagueAdmin(league.id)
      .catch(() => {
        setSwitchPinAdmin((prev) => !prev);
        notify({
          type: "error",
          message: "Ошибка",
          description: "Произошла ошибка, попробуйте позже",
        });
      })
      .finally(() => {
        setLoadingPinAdmin(false);
      });
  };

  return (
    <>
      <Form
        form={form}
        name="league-form"
        layout="vertical"
        style={{ maxWidth: "700px" }}
        className="mb-10"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <div className="flex justify-start flex-col max-w-96">
          <div className="flex items-center mb-4">
            <p className={`${titleClasses} !mb-0 mr-2`}>Лига в избранном:</p>
            <Switch
              onChange={togglePind}
              checkedChildren="Да"
              unCheckedChildren="Нет"
              loading={loadingSwitch}
              checked={switchValue}
            />
            <p className={`${titleClasses} !mb-0 mr-2 ml-auto`}>Тир лиги:</p>
            <Form.Item
              name={"tir"}
              noStyle
              initialValue={`${league.tir}` || "1"}
            >
              <Select
                defaultActiveFirstOption
                options={tirs.map((_, index) => ({
                  value: String(index + 1),
                  label: `Тир: ${index + 1}`,
                }))}
              />
            </Form.Item>
          </div>

          <div className="flex items-center mb-4">
            <p className={`${titleClasses} !mb-0 mr-2`}>
              Лига в избранном от Админа:
            </p>
            <Switch
              onChange={togglePindAdmin}
              checkedChildren="Да"
              unCheckedChildren="Нет"
              loading={loadingPinAdmin}
              checked={switchPinAdmin}
            />
          </div>

          <Form.Item
            className="mr-3"
            name="league_name"
            rules={[required]}
            initialValue={league.league_name}
          >
            <div>
              <p className={titleClasses}>Наименование команды</p>
              <Input defaultValue={league.league_name} />
            </div>
          </Form.Item>

          <Row justify={"space-between"} className="mb-4">
            <div className="">
              <p className={`${titleClasses.replace("mb-2", "mb-1")} mr-1`}>
                Вид спорта:
              </p>
              <p className={titleClasses}>{"Футбол"}</p>
            </div>
            <div>
              <p className={titleClasses.replace("mb-2", "mb-1")}>Даты:</p>
              <div className="flex items-center">
                <p className="text-right font-medium text-sm me-2">
                  Обновлено:
                </p>
                <p className="text-right font-medium text-sm">
                  {dayjs(league.updated_at).format("DD.MM.YYYY")}
                </p>
              </div>
            </div>
          </Row>

          <Row justify={"space-between"}>
            <div>
              <p className={titleClasses.replace("text-left", "text-center")}>
                Флаг Лиги
              </p>
              <CustomImage
                src={`https://admin.aibetguru.com/${league.photo}`}
                errorSrc="https://metallprofil.pkmk.ru/local/templates/aspro-stroy/images/noimage_detail.png"
              />
            </div>
            <div>
              <p className={titleClasses.replace("text-left", "text-center")}>
                Страна: {league.league_cc}
              </p>
              <CustomImage
                src={`https://admin.aibetguru.com/${
                  league.country ? league.country.photo : "null.svg"
                }`}
                errorSrc="https://cdn-icons-png.flaticon.com/512/921/921490.png"
              />
            </div>
          </Row>
        </div>

        <Button
          htmlType="submit"
          type="primary"
          size="large"
          className="mt-8 block w-40"
          loading={loading}
        >
          Редактировать
        </Button>
      </Form>
      <TableTranslate translate={league.translate} />
    </>
  );
};

export default LeagueForm;
