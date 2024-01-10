import { Button, Modal, Spin } from "antd";
import { useTypeDispatch } from "../../../hooks/useTypeDispatch";
import { useTypeSelector } from "../../../hooks/useTypeSelector";
import { FC, useEffect, useState } from "react";
import { EnumStatus } from "../../../types/Status";
import { columns } from "./colums";
import Pagination from "../../UI/Pagination";
import Table from "..";
import {
  deleteAdmin,
  getAllAdmins,
} from "../../../store/Slices/userSlices/asyncAction";
import { TypeUser } from "../../../store/Slices/userSlices/interface";

const AdminsTable: FC = () => {
  const { admins, status, total } = useTypeSelector((state) => state.user);
  const { search } = useTypeSelector((state) => state.filters);
  const dispatch = useTypeDispatch();

  const [page, setPage] = useState<number>(1);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [admin, setAdmin] = useState<TypeUser | null>(null);

  const onDeleteAdmin = () => {
    if (!admin) return;
    dispatch(deleteAdmin(admin.id)).then(() => {
      setAdmin(null);
      setIsOpenModal(false);
    });
  };

  const openModal = (user: TypeUser) => {
    setAdmin(user);
    setIsOpenModal(true);
  };

  const closeModal = () => {
    setAdmin(null);
    setIsOpenModal(false);
  };
  useEffect(() => {
    dispatch(getAllAdmins({ search }));
  }, []);

  return (
    <div>
      <Spin
        size="large"
        spinning={status == EnumStatus.LOADING}
        tip="Loading..."
      >
        <Table
          data={admins}
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
              onClick={onDeleteAdmin}
              type="primary"
              loading={status === EnumStatus.LOADING}
            >
              Уверен
            </Button>
          </div>
        }
      >
        <p>Вы действительно хотите удалить {admin?.name}</p>
      </Modal>
    </div>
  );
};

export default AdminsTable;
