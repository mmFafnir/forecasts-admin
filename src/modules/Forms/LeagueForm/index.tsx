import { Button, Form, Input, Row, Switch } from "antd";
import { FC, useState } from "react";
import { TypeLeague } from "../../../store/Slices/leaguesSlice/interface";
import { useTypeDispatch } from "../../../hooks/useTypeDispatch";
import dayjs from "dayjs";
import { required } from "../../../core/form-rools";
import CustomImage from "../../../components/UI/CustomImage";
import { updateLeague } from "../../../store/Slices/leaguesSlice/asyncActions";
import { AxiosError } from "axios";
import { notify } from "../../../assets/scripts/notify";
import { asyncTogglePindLeague } from "../../../api/league/asyncTogglePindLeague";
import TableTranslate from "./TableTranslate";

interface IInputs {
  league_name: string;
}
interface IProps {
  league: TypeLeague;
}
const titleClasses = `text-left font-semibold text-sm mb-2`;
const LeagueForm: FC<IProps> = ({ league }) => {
  const dispatch = useTypeDispatch();

  const [form] = Form.useForm<IInputs>();
  const [loading, setLoading] = useState<boolean>(false);

  const [switchValue, setSwitchValue] = useState<boolean>(false);
  const [loadingSwitch, setLoadingSwitch] = useState<boolean>(false);

  const onFinish = () => {
    setLoading(true);
    dispatch(
      updateLeague({
        league_id: league.id,
        name: form.getFieldsValue().league_name,
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

  return (
    <>
      <Form
        form={form}
        name="league-form"
        layout="vertical"
        style={{ maxWidth: "700px" }}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <div className="flex justify-start flex-col max-w-96">
          <div className="flex items-center mb-2">
            <p className={`${titleClasses} mb-0 mr-2`}>Лига в избранном:</p>
            <Switch
              onChange={togglePind}
              checkedChildren="Да"
              unCheckedChildren="Нет"
              loading={loadingSwitch}
              checked={switchValue}
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
                src={`https://admin.aibetguru.com/uploads/${league.league_id}.png`}
                errorSrc="https://metallprofil.pkmk.ru/local/templates/aspro-stroy/images/noimage_detail.png"
              />
            </div>
            <div>
              <p className={titleClasses.replace("text-left", "text-center")}>
                Страна: {league.league_cc}
              </p>
              <CustomImage
                src={`https://admin.aibetguru.com/uploads/${league.league_cc}.svg`}
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
