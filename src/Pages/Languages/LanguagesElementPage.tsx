import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TypeLanguages } from "../../store/Slices/languagesSlice/interface";
import axios from "../../core/axios";
import LanguagesForm from "../../modules/Forms/LanguageForm/UpdateLanguages";
import { Space, Spin } from "antd";

const LanguagesElementPage = () => {
  const { id } = useParams();
  const [lang, setLag] = useState<TypeLanguages | null>(null);
  const getSinglePageLang = async (id: string) => {
    try {
      const { data } = await axios.get(`/single_page_lang?lang_id=${id}`);
      setLag(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!id) return;
    getSinglePageLang(id);
  }, []);
  return (
    <div className="form">
      <h1 className="mb-5">Редактировать Язык</h1>
      {!lang ? (
        <Space className="flex h-96 max-w-md justify-center items-center">
          <Spin size="large" />
        </Space>
      ) : (
        <LanguagesForm lang={lang} />
      )}
    </div>
  );
};

export default LanguagesElementPage;
