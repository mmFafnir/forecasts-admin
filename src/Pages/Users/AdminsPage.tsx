import { Button, Modal } from "antd";

import TableAdmin from "../../components/Tables/TableAdmin";
import { useState } from "react";
import CreateUserForm from "../../modules/Forms/admins-form/CreateAdminForm";

const AdminsPage = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  return (
    <>
      <div className="flex items-center">
        <h1>МОДЕРАТОРЫ</h1>
        <Button
          onClick={openModal}
          className="ml-2 mr-10 w-24 block"
          size="large"
          type="primary"
        >
          <span className="font-medium">Создать</span>
        </Button>
      </div>
      <div className="mt-6"></div>
      <TableAdmin />
      <Modal
        open={isOpen}
        footer={() => <></>}
        onCancel={closeModal}
        title="Создать Пользователя"
      >
        <CreateUserForm />
      </Modal>
    </>
  );
};

export default AdminsPage;
