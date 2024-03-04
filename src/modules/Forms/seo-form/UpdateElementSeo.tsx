import { Button, Form, Input } from "antd";
import { FC, memo, useState } from "react";
import { ISeo } from "../../../store/Slices/seoSlice/interface";
import { required } from "../../../core/form-rools";
import UploadInput from "../../../components/UI/Form/UploadInput";
import CustomImage from "../../../components/UI/CustomImage";
import { updateElementSeo } from "../../../store/Slices/seoSlice/asyncActions";
import { notify } from "../../../assets/scripts/notify";
import { AxiosError } from "axios";
import SelectCountries from "../../Selects/SelectCountries";
import SelectLeagues from "../../Selects/SelectLeagues";
import SelectOneSport from "../../Selects/SelectOneSport";
import TextEditor from "../../../components/TextEditor";

interface IInputs {
  ceo_title: string;
  ceo_description: string;
  ceo_keywords: string;
  ceo_h: string;
  ceo_short_description_for_h: string;
  ceo_text: string;
}

interface IProps {
  seo: ISeo;
}
const titleClasses = `text-left font-semibold text-sm mb-2`;
const UpdateElementSeo: FC<IProps> = ({ seo }) => {
  const type = seo.country && seo.country.length > 0 ? "country" : "league";

  const [loading, setLoading] = useState<boolean>(false);

  const [sport, setSport] = useState<number>(seo.sports_idi || 1);
  console.log(sport);
  const [countries, setCountries] = useState<string[]>(
    seo.country?.map((item) => `${item.country_id}`) || []
  );
  const [leagues, setLeagues] = useState<string[]>(
    seo.league?.map((item) => `${item.league_id}`) || []
  );

  const [imgFile, setImgFile] = useState<File | null>(null);
  const [previewImage, serPreviewImage] = useState<string | null>(null);

  const [form] = Form.useForm<IInputs>();

  const onFinish = (values: IInputs) => {
    setLoading(true);
    const formData = new FormData();
    // console.log('seo': seo.id);
    formData.append("ceo_id ", `3`);
    if (imgFile) {
      formData.append("ceo_photo", imgFile);
    }
    for (const [key, value] of Object.entries(values)) {
      formData.append(key, value);
    }

    formData.append("sport_id", `${sport}`);

    if (type === "country") {
      if (countries.length == 0) {
        notify({
          type: "error",
          message: "Список стран пуст...",
        });
        setLoading(false);
        return;
      }
      countries.forEach((country) => {
        console.log(country);
        formData.append("countrys_id[]", country);
      });
    } else {
      if (leagues.length == 0) {
        notify({
          type: "error",
          message: "Список лиг пуст...",
        });
        setLoading(false);
        return;
      }
      leagues.forEach((league) => {
        formData.append("leagues_id[]", league);
      });
    }

    updateElementSeo(formData, seo.id)
      .then(() => {
        notify({
          type: "success",
          message: "Успешно",
          description: `Seo тест успешно обнавлен успешно обнавлен`,
        });
      })
      .catch((error) => {
        const err = error as AxiosError;
        serPreviewImage(null);
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

  return (
    <Form
      form={form}
      layout="vertical"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      style={{ maxWidth: "700px" }}
      autoComplete="off"
      onFinish={onFinish}
    >
      {/* sport country league */}
      <div>
        <p className={`${titleClasses}`}>Спорт:</p>
        <SelectOneSport
          value={sport}
          setValue={setSport}
          className="mb-2 text-left"
        />
        {type === "country" && (
          <>
            <p className={`${titleClasses}`}>Страна:</p>
            <SelectCountries
              all
              className="mb-2"
              setData={setCountries}
              data={seo.country?.map((item) => String(item.country_id)) || []}
            />
          </>
        )}
        {type === "league" && (
          <>
            <p className={`${titleClasses}`}>Лиги:</p>
            <SelectLeagues
              all
              className="mb-2"
              setData={setLeagues}
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              data={
                seo.league?.map((item) => ({
                  label: item.league?.league_name || "",
                  value: item.league_id,
                })) || []
              }
            />
          </>
        )}
      </div>
      {/* ceo_title */}
      <div>
        <p className={titleClasses}>Заголовок</p>
        <Form.Item
          className="mr-3"
          name="ceo_title"
          rules={[required]}
          initialValue={seo.ceo_title}
        >
          <Input />
        </Form.Item>
      </div>

      {/* ceo_description */}
      <div>
        <p className={titleClasses}>Описание</p>
        <Form.Item
          className="mr-3"
          name="ceo_description"
          rules={[required]}
          initialValue={seo.ceo_description}
        >
          <Input />
        </Form.Item>
      </div>

      {/* ceo_keywords */}
      <div>
        <p className={titleClasses}>Ключевые слова</p>
        <Form.Item
          className="mr-3"
          name="ceo_keywords"
          rules={[required]}
          initialValue={seo.ceo_keywords}
        >
          <Input />
        </Form.Item>
      </div>

      {/* ceo_h */}
      <div>
        <p className={titleClasses}>H1 заголовок</p>
        <Form.Item
          className="mr-3"
          name="ceo_h"
          rules={[required]}
          initialValue={seo.ceo_h}
        >
          <Input />
        </Form.Item>
      </div>

      {/* ceo_short_description_for_h */}
      {/* <div>
        <p className={titleClasses}>H1 подзаголовок</p>
        <Form.Item
          className="mr-3"
          name="ceo_short_description_for_h"
          rules={[required]}
          initialValue={seo.ceo_short_description_for_h}
        >
          <Input />
        </Form.Item>
      </div> */}

      {/* ceo_text */}
      <div>
        <p className={titleClasses}>Текст</p>
        <Form.Item
          name="ceo_text"
          rules={[required]}
          initialValue={seo.ceo_text}
        >
          <TextEditor initialValue={seo.ceo_text} />
        </Form.Item>
      </div>

      <div className="mb-7 flex flex-col items-start text-left">
        <p className={titleClasses}>Seo Картика</p>

        <div className="h-40 mb-3" style={{ minWidth: "300px" }}>
          <CustomImage
            rootClasses="!overflow-hidden rounded-2xl"
            src={
              previewImage
                ? previewImage
                : `https://admin.aibetguru.com/uploads/${seo.ceo_photo}`
            }
            errorSrc="https://metallprofil.pkmk.ru/local/templates/aspro-stroy/images/noimage_detail.png"
            width={"100%"}
            height={"100%"}
          />
        </div>
        <UploadInput
          file={imgFile}
          setFile={setImgFile}
          setPreviewImage={serPreviewImage}
        />
      </div>

      <Button
        type="primary"
        htmlType="submit"
        size="large"
        className="ml-auto font-semibold"
        loading={loading}
      >
        Сохранить
      </Button>
    </Form>
  );
};

export default memo(UpdateElementSeo);
