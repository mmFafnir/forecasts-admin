import { Button, Modal, Spin } from "antd";
import Table from "./Table";
import { columns } from "./columns";
import { useTypeSelector } from "../../../hooks/useTypeSelector";
import { EnumStatus } from "../../../types/Status";
import { useEffect, useState } from "react";
import { useTypeDispatch } from "../../../hooks/useTypeDispatch";
import {
  deleteRate,
  fetchAllRate,
} from "../../../store/Slices/rateSlice/asyncActions";
import { TypeRate } from "../../../store/Slices/rateSlice/interface";
import { notify } from "../../../assets/scripts/notify";

const TableRate = () => {
  const { rates, status } = useTypeSelector((state) => state.rate);
  const dispatch = useTypeDispatch();

  const [currentDeleteRate, setCurrentDeleteRate] = useState<TypeRate | null>(
    null
  );
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [isOpenModalDelete, setIsOpenModalDelete] = useState<boolean>(false);

  const onModalOpenDelete = () => setIsOpenModalDelete(true);
  const onCloseModalDelete = () => setIsOpenModalDelete(false);

  const onDelete = () => {
    if (!currentDeleteRate) return;
    setLoadingDelete(true);
    dispatch(deleteRate(currentDeleteRate.id))
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
        onCloseModalDelete();
      })
      .finally(() => setLoadingDelete(false));
  };

  useEffect(() => {
    dispatch(fetchAllRate());
  }, []);

  return (
    <div>
      <Spin
        size="large"
        spinning={status === EnumStatus.LOADING}
        tip="Loading..."
      >
        <Table
          data={rates}
          columns={columns.map((col) => {
            if (col.key === "delete") {
              col.render = (_, record) => (
                <div className="flex">
                  <Button
                    onClick={() => {
                      setCurrentDeleteRate(record);
                      onModalOpenDelete();
                    }}
                    type="primary"
                    className="ml-auto"
                    danger
                  >
                    Удалить
                  </Button>
                </div>
              );
            }
            return col;
          })}
        />
      </Spin>
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
        <p>Вы точно хотите удалить Тариф {currentDeleteRate?.name}?</p>
      </Modal>
      {/* <Pagination setPage={setPage} defaultPage={page} total={total} /> */}
    </div>
  );
};

export default TableRate;
