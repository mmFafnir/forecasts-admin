import { FC, useState } from "react";
import { Button, Modal } from "antd";
import TableRefs from "../../components/Tables/TableRef";
import { CreateRef } from "../../modules/Forms/refs-form";

export const RefsPage: FC = () => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const openModal = () => setIsOpenModal(true);
  const closeModal = () => setIsOpenModal(false);

  return (
    <>
      <div className="flex items-center">
        <h1>Реферальные ссылки</h1>
        <Button
          onClick={openModal}
          className="ml-2 mr-10 w-24 block"
          type="primary"
        >
          <span className="font-medium">Создать</span>
        </Button>
      </div>
      <div className="mt-6"></div>
      <TableRefs />
      <Modal
        open={isOpenModal}
        footer={() => <></>}
        onCancel={closeModal}
        title="Создать Реферальную ссылку"
      >
        <CreateRef />
      </Modal>
    </>
  );
};
