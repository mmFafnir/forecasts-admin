import axios from "../../../core/axios";
import { FC, useEffect, useState } from "react";
import { ISeo } from "../../../store/Slices/seoSlice/interface";
import UpdateHomeSeo from "../../../modules/Forms/seo-form/UpdateHomeSeo";
import { Space, Spin } from "antd";

const SeoHomePage: FC = () => {
  const [data, setData] = useState<null | ISeo>(null);
  const getSinglePageSeo = async () => {
    try {
      const { data } = await axios.get(`/get_home_page_ceo`);
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
        <UpdateHomeSeo seo={data} />
      )}
    </div>
  );
};

export default SeoHomePage;
