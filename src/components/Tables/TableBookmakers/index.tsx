import { FC, Key, useEffect, useState } from "react";
import { useTypeDispatch } from "../../../hooks/useTypeDispatch";
import { useTypeSelector } from "../../../hooks/useTypeSelector";
import { TFilter } from "../../../types/TypeFilter";
import { Modal, Spin } from "antd";
// import Pagination from "../../UI/Pagination";
import Table from "..";
import { columns } from "./colums";
import { EnumStatus } from "../../../types/Status";
import {
  deleteBookmaker,
  fetchBookmakers,
} from "../../../store/Slices/bookmakersSlice/asyncActions";
import { notify } from "../../../assets/scripts/notify";

const TableBookmakers: FC = () => {
  const { bookmakers, status } = useTypeSelector((state) => state.bookmakers);
  const { limit, search } = useTypeSelector((state) => state.filters);
  const dispatch = useTypeDispatch();

  const [loading, setLoading] = useState<boolean>(false);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [ids, setIds] = useState<Key[]>([]);

  const [page, setPage] = useState<number>(1);

  const onGetAllLeagues = (
    params: Pick<TFilter, "page" | "search" | "limit">
  ) => {
    dispatch(fetchBookmakers(params));
  };

  const onDeleteAll = () => {
    setLoading(true);
    dispatch(deleteBookmaker(ids as number[]))
      .then(() => {
        notify({
          type: "success",
          message: `Букмекеры были успешно удалены`,
        });
      })
      .finally(() => {
        setModalIsOpen(false);
        setLoading(false);
      });
  };

  const onModalOpen = (ids: Key[]) => {
    setIds(ids);
    setModalIsOpen(true);
  };

  useEffect(() => {
    onGetAllLeagues({
      page,
      limit,
      search,
    });
  }, [page, limit, search]);

  useEffect(() => {
    setPage(1);
  }, [search]);

  return (
    <div>
      <Spin
        size="large"
        spinning={status == EnumStatus.LOADING}
        tip="Loading..."
      >
        <Table
          callback={{ title: "Удалить", fn: onModalOpen, danger: true }}
          data={bookmakers}
          columns={columns}
        />
      </Spin>
      {/* <Pagination setPage={setPage} defaultPage={page} total={total} /> */}
      <Modal
        title="Удалить?!"
        open={modalIsOpen}
        onOk={onDeleteAll}
        onCancel={() => setModalIsOpen(false)}
        cancelText="Нет"
        okText="Уверен!"
        confirmLoading={loading}
      >
        <p>Вы уверены, что хотите удалить Букмекеров?</p>
      </Modal>
    </div>
  );
};

export default TableBookmakers;
