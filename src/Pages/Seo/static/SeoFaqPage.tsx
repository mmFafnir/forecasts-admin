import axios from "../../../core/axios";
import { FC, useEffect, useState } from "react";
import { IFaqSeo } from "../../../store/Slices/seoSlice/interface";
import { Space, Spin } from "antd";
import UploadFaqSeo from "../../../modules/Forms/seo-form/UploadFaqSeo";

const SeoFaqPage: FC = () => {
  const [data, setData] = useState<null | IFaqSeo>(null);
  const getSinglePageSeo = async () => {
    try {
      const { data } = await axios.get(`/get_global_faq_ceo`);
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
      {!data ? (
        <Space className="flex h-96 max-w-md justify-center items-center">
          <Spin size="large" />
        </Space>
      ) : (
        <UploadFaqSeo seo={data} />
      )}
    </div>
  );
};

export default SeoFaqPage;
