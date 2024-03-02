import axios from "../../../core/axios";
import { FC, useEffect, useState } from "react";
import { ISeo } from "../../../store/Slices/seoSlice/interface";
import { Space, Spin } from "antd";
import { useParams } from "react-router-dom";
import UpdateElementSeo from "../../../modules/Forms/seo-form/UpdateElementSeo";

const SeoElementPage: FC = () => {
  const { id } = useParams();

  const [data, setData] = useState<null | ISeo>(null);
  const getSinglePageSeo = async () => {
    try {
      const { data } = await axios.get(`/single_page_ceo?ceo_id=${id}`);
      console.log(data);
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
      <h1 className="mb-5">Редактировать Seo Текст</h1>
      {!data ? (
        <Space className="flex h-96 max-w-md justify-center items-center">
          <Spin size="large" />
        </Space>
      ) : (
        <UpdateElementSeo seo={data} />
      )}
    </div>
  );
};

export default SeoElementPage;
