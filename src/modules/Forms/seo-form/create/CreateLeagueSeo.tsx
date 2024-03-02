import { Button, Form, Input } from "antd";
import { FC, useEffect, useState } from "react";
import { required } from "../../../../core/form-rools";
import TextArea from "antd/es/input/TextArea";
import CustomImage from "../../../../components/UI/CustomImage";
import UploadInput from "../../../../components/UI/Form/UploadInput";
import { useTypeDispatch } from "../../../../hooks/useTypeDispatch";
import { createSeo } from "../../../../store/Slices/seoSlice/asyncActions";
import SelectLeagues from "../../../Selects/SelectLeagues";
import SelectOneSport from "../../../Selects/SelectOneSport";
import { notify } from "../../../../assets/scripts/notify";

interface IInputs {
  ceo_title: string;
  ceo_description: string;
  ceo_keywords: string;
  ceo_h: string;
  ceo_short_description_for_h: string;
  ceo_text: string;
  sports_id: string;
  countrys_id: string;
  leagues_id: string;
}

const titleClasses = `text-left font-semibold mb-2`;

export const CreateLeagueSeo: FC = () => {
  const dispatch = useTypeDispatch();
  const [form] = Form.useForm<IInputs>();
  const [loading, setLoading] = useState<boolean>(false);

  const [imgFile, setImgFile] = useState<File | null>(null);
  const [previewImage, serPreviewImage] = useState<string | null>(null);

  const [sport, setSport] = useState<number>(1);
  const [leagues, setLeagues] = useState<string[]>([]);

  const onFinish = (values: IInputs) => {
    if (leagues.length === 0) {
      notify({
        message: "Список лиг пуст...",
        type: "error",
      });
      return;
    }
    setLoading(true);
    console.log(values);
    const formData = new FormData();

    for (const [key, value] of Object.entries(values)) {
      formData.append(key, value);
    }
    if (imgFile) {
      formData.append("ceo_photo", imgFile);
    }

    formData.append("sport_id", `${sport}`);
    leagues.forEach((league) => {
      formData.append("leagues_id[]", league);
    });

    dispatch(createSeo({ formData, sportId: sport }))
      .then(() => {
        form.resetFields();
        setSport(1);
        setLeagues([]);

        serPreviewImage(null);
        setImgFile(null);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    form.setFieldValue("ceo_photo", imgFile);
  }, [imgFile]);

  return (
    <Form
      form={form}
      layout="vertical"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      autoComplete="off"
      onFinish={onFinish}
    >
      {/* sport country league */}
      <div>
        <p className={`${titleClasses} !mb-0`}>Спорт:</p>
        <SelectOneSport value={sport} setValue={setSport} className="mb-2" />

        <p className={`${titleClasses} !mb-0`}>Лиги:</p>
        <SelectLeagues
          values={leagues}
          data={[]}
          className="mb-2"
          setData={setLeagues}
        />
      </div>

      {/* ceo_title */}
      <div>
        <p className={titleClasses}>Заголовок</p>
        <Form.Item className="mr-3" name="ceo_title" rules={[required]}>
          <Input />
        </Form.Item>
      </div>

      {/* ceo_description */}
      <div>
        <p className={titleClasses}>Описание</p>
        <Form.Item className="mr-3" name="ceo_description" rules={[required]}>
          <Input />
        </Form.Item>
      </div>

      {/* ceo_keywords */}
      <div>
        <p className={titleClasses}>Ключевые слова</p>
        <Form.Item className="mr-3" name="ceo_keywords" rules={[required]}>
          <Input />
        </Form.Item>
      </div>

      {/* ceo_h */}
      <div>
        <p className={titleClasses}>H1 заголовок</p>
        <Form.Item className="mr-3" name="ceo_h" rules={[required]}>
          <Input />
        </Form.Item>
      </div>

      {/* ceo_short_description_for_h */}
      <div>
        <p className={titleClasses}>H1 подзаголовок</p>
        <Form.Item
          className="mr-3"
          name="ceo_short_description_for_h"
          rules={[required]}
        >
          <Input />
        </Form.Item>
      </div>

      {/* ceo_text */}
      <div>
        <p className={titleClasses}>Текст</p>
        <Form.Item name="ceo_text" rules={[required]}>
          <TextArea style={{ minHeight: 150 }} />
        </Form.Item>
      </div>

      <div className="mb-7 flex flex-col items-start text-left">
        <p className={titleClasses}>Seo Картика</p>

        {previewImage && (
          <div className="h-40 mb-3" style={{ minWidth: "300px" }}>
            <CustomImage
              rootClasses="!overflow-hidden rounded-2xl"
              src={previewImage}
              errorSrc="https://metallprofil.pkmk.ru/local/templates/aspro-stroy/images/noimage_detail.png"
              width={"100%"}
              height={"100%"}
            />
          </div>
        )}
        <Form.Item name={"ceo_photo"} initialValue={imgFile} rules={[required]}>
          <UploadInput
            file={imgFile}
            setFile={setImgFile}
            setPreviewImage={serPreviewImage}
          />
        </Form.Item>
      </div>

      <Button
        type="primary"
        htmlType="submit"
        size="large"
        className="ml-auto flex font-semibold"
        loading={loading}
      >
        Сохранить
      </Button>
    </Form>
  );
};
