import axios from "../../core/axios";
import { FC, useEffect, useState } from "react";
import { ISeo } from "../../store/Slices/seoSlice/interface";
import { Space, Spin } from "antd";
import UpdateMatchSeo from "../../modules/Forms/seo-form/UploadMatchSeo";

const SeoMatchPage: FC = () => {
  const [data, setData] = useState<null | ISeo>(null);
  const getSinglePageSeo = async () => {
    try {
      const { data } = await axios.get(`/get_match_ceo`);
      setData(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSinglePageSeo();
  }, []);

  return (
    <div className="form">
      <h1 className="mb-5">Редактировать Seo для Страницы Матча</h1>
      {!data ? (
        <Space className="flex h-96 max-w-md justify-center items-center">
          <Spin size="large" />
        </Space>
      ) : (
        <UpdateMatchSeo seo={data} />
      )}
    </div>
  );
};

export default SeoMatchPage;
