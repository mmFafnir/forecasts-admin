import axios from "../core/axios";
import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Space, Spin } from "antd";
import BookmakerForm from "../modules/Forms/Update/BookmakerForm";
import { TypeBookmaker } from "../store/Slices/bookmakersSlice/interface";

const BookmakerElementPage: FC = () => {
  const { id } = useParams();
  const [bookmaker, setBookmaker] = useState<null | TypeBookmaker>(null);

  const getSinglePageBookmaker = async (id: string) => {
    try {
      const { data } = await axios.get(
        `/single_page_best_bookmaker/bookmaker_id=${id}`
      );
      setBookmaker(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!id) return;
    getSinglePageBookmaker(id);
  }, []);

  return (
    <div className="form">
      <h1 className="mb-5">Редактировать Букмекера</h1>
      {!bookmaker ? (
        <Space className="flex h-96 max-w-md justify-center items-center">
          <Spin size="large" />
        </Space>
      ) : (
        <BookmakerForm bookmaker={bookmaker} />
      )}
    </div>
  );
};

export default BookmakerElementPage;
