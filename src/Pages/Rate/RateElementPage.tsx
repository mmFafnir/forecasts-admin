import { Button, Modal, Space, Spin } from "antd";
import axios from "../../core/axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IRateFetchSingle } from "../../store/Slices/rateSlice/interface";
import { UpdateRate } from "../../modules/Forms/reate-form";
import { CreateDetailsRate } from "../../modules/Forms/reate-form/create/CreateDetailsRate";
import { useTypeDispatch } from "../../hooks/useTypeDispatch";
import { deleteRate } from "../../store/Slices/rateSlice/asyncActions";
import { notify } from "../../assets/scripts/notify";

const fetchSingleRate = async (id: string) => {
  const { data } = await axios.get(`/single_page_rate?rate_id=${id}`);
  if (!data.data) throw Error();
  return data.data;
};

export const RateElementPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const dispatch = useTypeDispatch();

  const [data, setData] = useState<null | IRateFetchSingle>(null);
  const [loading, setLoading] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isOpenModalDelete, setIsOpenModalDelete] = useState<boolean>(false);

  const onModalOpen = () => setIsOpenModal(true);
  const onCloseModal = () => setIsOpenModal(false);

  const onModalOpenDelete = () => setIsOpenModalDelete(true);
  const onCloseModalDelete = () => setIsOpenModalDelete(false);

  const onDelete = () => {
    if (!data) return;
    setLoadingDelete(true);
    dispatch(deleteRate(data.id))
      .then((res) => {
        if (!res.payload) {
          notify({
            type: "error",
            message: "Ошибка!",
          });
          return;
        }
        notify({
          type: "success",
          message: "Тариф успешно удален!",
        });
        navigate("/rates");
      })
      .finally(() => setLoadingDelete(false));
  };

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetchSingleRate(id)
      .then((res) => {
        setData(res);
      })
      .catch(() => {
        navigate("/404");
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="form">
      <div className="flex">
        <h1 className="mb-5 mr-2">
          Тариф {data?.name || <Spin size="small" />}
        </h1>
        <Button type="primary" onClick={onModalOpen}>
          Добавить
        </Button>
        <Button
          className="ml-2"
          type="primary"
          danger
          onClick={onModalOpenDelete}
        >
          Удалить
        </Button>
      </div>
      {loading ? (
        <Space className="flex h-96 max-w-md justify-center items-center">
          <Spin size="large" />
        </Space>
      ) : (
        <UpdateRate data={data} />
      )}
      <Modal
        open={isOpenModal}
        footer={() => <></>}
        onCancel={onCloseModal}
        title="Создать элемент в тариф"
      >
        <CreateDetailsRate id={id} />
      </Modal>
      <Modal
        title="Удалить?"
        open={isOpenModalDelete}
        onOk={onDelete}
        okText={"Да"}
        okType="danger"
        cancelText="Нет"
        confirmLoading={loadingDelete}
        onCancel={onCloseModalDelete}
      >
        <p>Вы точно хотите удалить Тариф {data?.name}?</p>
      </Modal>
    </div>
  );
};
