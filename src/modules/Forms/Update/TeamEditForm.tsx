import { Button, Form, Input, Row, notification } from "antd";
import { FC, useState } from "react";
import { ITeam } from "../../../store/Slices/teamsSlice/interface";
import dayjs from "dayjs";
import { required } from "../../../core/form-rools";
import { useTypeDispatch } from "../../../hooks/useTypeDispatch";
import { updateTeam } from "../../../store/Slices/teamsSlice/asyncActions";
import CustomImage from "../../../components/UI/CustomImage";
import { AxiosError } from "axios";
import { updateTranslateId } from "../../../api/translate/updateTranslateId";
import { TypeTranslate } from "../../../types/translate";

interface IProps {
  team: ITeam;
}

interface IInputs {
  team_name: string;
}

const titleClasses = `text-left font-semibold text-sm mb-2`;

const TeamEditForm: FC<IProps> = ({ team }) => {
  const dispatch = useTypeDispatch();
  const [form] = Form.useForm<IInputs>();
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingTranslate, setLoadingTranslate] = useState<boolean>(false);

  const [translateRu, setTranslateRu] = useState<TypeTranslate | null>(
    team.translate && team.translate.length > 0 ? team.translate[0] : null
  );

  const onFinish = () => {
    setLoading(true);
    dispatch(
      updateTeam({
        team_id: team.id,
        name: form.getFieldsValue().team_name,
      })
    )
      .then(() => {
        notification.success({
          message: "Успешно",
          description: `Лига ${team.team_name} успешно обнавлена`,
          duration: 2,
        });
      })
      .catch((error) => {
        const err = error as AxiosError;
        notification.error({
          message: `Ошибка ${err.code}`,
          description: err.message,
          duration: 3,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <Form
        form={form}
        name="team-form"
        layout="vertical"
        style={{ maxWidth: "700px" }}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <div className="flex justify-start flex-col max-w-96 ">
          <Row justify={"space-between"}>
            <div className="">
              <p className={`${titleClasses.replace("mb-2", "mb-1")} mr-1`}>
                Вид спорта:
              </p>
              <p className={titleClasses}>{"Футбол"}</p>
            </div>
            <div>
              <p className={titleClasses.replace("mb-2", "mb-1")}>Даты:</p>
              {team.updated_at && (
                <div className="flex items-center">
                  <p className="text-right font-medium text-sm me-2">
                    Обновлено:
                  </p>
                  <p className="text-right font-medium text-sm">
                    {dayjs(team.updated_at).format("DD.MM.YYYY")}
                  </p>
                </div>
              )}
              {team.created_at && (
                <div className="flex items-center">
                  <p className="text-right font-medium text-sm me-2">
                    Создано:
                  </p>
                  <p className="text-right font-medium text-sm">
                    {dayjs(team.created_at).format("DD.MM.YYYY")}
                  </p>
                </div>
              )}
            </div>
          </Row>

          <Form.Item
            className="mr-3"
            name="team_name"
            rules={[required]}
            initialValue={team.team_name}
          >
            <div>
              <p className={titleClasses}>Наименование команды</p>
              <Input defaultValue={team.team_name} />
            </div>
          </Form.Item>

          {translateRu && (
            <div className="mr-3 mb-10">
              <p className={titleClasses}>Наименование команды (RU)</p>
              <div className="flex">
                <Input
                  value={translateRu.translation}
                  className="rounded-tr-none rounded-br-none"
                  onChange={(e) =>
                    setTranslateRu({
                      ...translateRu,
                      translation: e.target.value,
                    })
                  }
                />
                <Button
                  loading={loadingTranslate}
                  onClick={() =>
                    updateTranslateId({
                      id: translateRu.id,
                      text: translateRu.translation,
                      setLoading: setLoadingTranslate,
                    })
                  }
                  className="rounded-tl-none rounded-bl-none"
                >
                  Сохранить
                </Button>
              </div>
            </div>
          )}

          <Row justify={"space-between"}>
            <div style={{ maxWidth: "200px" }}>
              <p className={titleClasses.replace("text-left", "text-center")}>
                Флаг команды
              </p>
              <CustomImage
                src={`https://admin.aibetguru.com/uploads/${team.team_id}.png`}
                errorSrc="https://metallprofil.pkmk.ru/local/templates/aspro-stroy/images/noimage_detail.png"
              />
            </div>
            <div style={{ maxWidth: "200px" }}>
              <p className={titleClasses.replace("text-left", "text-center")}>
                Страна: {team.team_cc}
              </p>
              <CustomImage
                src={`https://admin.aibetguru.com/uploads/${team.team_cc}.svg`}
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
    </>
  );
};

export default TeamEditForm;
