import axios from "../../../core/axios";
import { FC, useEffect, useState } from "react";
import { ISeo } from "../../../store/Slices/seoSlice/interface";
import { Space, Spin } from "antd";
import UpdateArchiveSeo from "../../../modules/Forms/seo-form/UpdateArchiveSeo";

const SeoArchivePage: FC = () => {
  const [data, setData] = useState<null | ISeo>(null);
  const getSinglePageSeo = async () => {
    try {
      const { data } = await axios.get(`/get_archive_page_seo`);
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
        <UpdateArchiveSeo seo={data} />
      )}
    </div>
  );
};

export default SeoArchivePage;
