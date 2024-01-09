import { Button, Modal, Spin } from "antd";
import { useTypeDispatch } from "../../../hooks/useTypeDispatch";
import { useTypeSelector } from "../../../hooks/useTypeSelector";
import { FC, useEffect, useState } from "react";
import { EnumStatus } from "../../../types/Status";
import { columns } from "./colums";
import Pagination from "../../UI/Pagination";
import Table from "..";
import {
  deleteUser,
  getAllUsers,
} from "../../../store/Slices/userSlices/asyncAction";
import { TypeUser } from "../../../store/Slices/userSlices/interface";

const AdminsTable: FC = () => {
  const { users, status, total } = useTypeSelector((state) => state.user);
  const { search } = useTypeSelector((state) => state.filters);
  const dispatch = useTypeDispatch();

  const [page, setPage] = useState<number>(1);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [user, setUser] = useState<TypeUser | null>(null);

  const onDeleteUser = () => {
    if (!user) return;
    dispatch(deleteUser(user.id)).then(() => {
      setUser(null);
      setIsOpenModal(false);
    });
  };

  const openModal = (user: TypeUser) => {
    setUser(user);
    setIsOpenModal(true);
  };

  const closeModal = () => {
    setUser(null);
    setIsOpenModal(false);
  };
  useEffect(() => {
    dispatch(getAllUsers({ search }));
  }, [search]);

  return (
    <div>
      <Spin
        size="large"
        spinning={status == EnumStatus.LOADING}
        tip="Loading..."
      >
        <Table
          data={users}
          columns={columns.map((col) => {
            if (col.key === "delete") {
              col.render = (_, record) => (
                <Button
                  onClick={() => openModal(record)}
                  className="block ml-auto"
                  danger
                >
                  Удалить
                </Button>
              );
            }
            return col;
          })}
        />
      </Spin>
      <Pagination setPage={setPage} defaultPage={page} total={total} />
      <Modal
        open={isOpenModal}
        onCancel={closeModal}
        title="Уведомление"
        footer={
          <div>
            <Button onClick={closeModal}>Отмена</Button>
            <Button
              onClick={onDeleteUser}
              type="primary"
              loading={status === EnumStatus.LOADING}
            >
              Уверен
            </Button>
          </div>
        }
      >
        <p>Вы действительно хотите удалить {user?.name}</p>
      </Modal>
    </div>
  );
};

export default AdminsTable;
