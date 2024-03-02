import { Select, Space, Spin } from "antd";
import axios from "../../../core/axios";
import { useEffect, useState } from "react";
import { ISeo } from "../../../store/Slices/seoSlice/interface";
import { SeoStaticElementPage } from "./SeoStaticElementPage";

const pages = [
  {
    label: "Главная",
    value: "home",
  },
  {
    label: "Архив",
    value: "archive",
  },
  {
    label: "Политика конфиденциальности",
    value: "privacy-policy",
  },

  {
    label: "Условия Пользования",
    value: "term-of-use",
  },
  {
    label: "Вопросы/ответы",
    value: "faq",
  },
];

const fetchStaticPages = async () => {
  const { data } = await axios.get("/get_static_page_seo");
  return data.data;
};

export const SeoStatic = () => {
  const [page, setPage] = useState<string>("home");
  const [data, setData] = useState<ISeo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    fetchStaticPages()
      .then((res) => {
        setData(res);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  console.log(data);

  return (
    <div className="form">
      <h1 className="mb-5">Статические страницы</h1>
      <div className="flex mb-7">
        <Select
          className="flex-shrink flex-grow-0 basis-60 text-left"
          options={pages}
          size="large"
          value={page}
          onChange={setPage}
        />
      </div>
      {loading ? (
        <Space className="flex h-96 max-w-md justify-center items-center">
          <Spin size="large" />
        </Space>
      ) : (
        <SeoStaticElementPage seo={data.find((seo) => seo.page === page)} />
      )}
    </div>
  );
};
