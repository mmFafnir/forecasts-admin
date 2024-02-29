import { FC, useState } from "react";
import TableFaq from "../../components/Tables/TableFaq";
import { Button, Modal } from "antd";
import CreateFaq from "../../modules/Forms/faq-from/CreateFaq";

const FAQPage: FC = () => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const onModalOpen = () => setIsOpenModal(true);
  const onCloseModal = () => setIsOpenModal(false);

  return (
    <>
      <div className="flex items-center">
        <h1>FAQ</h1>
        <Button
          onClick={onModalOpen}
          type="primary"
          size="large"
          className="ml-2 mr-10 w-24 block"
        >
          <span className="font-medium">Создать</span>
        </Button>
      </div>
      <div className="mt-6"></div>
      <TableFaq />
      <Modal
        open={isOpenModal}
        footer={() => <></>}
        onCancel={onCloseModal}
        title="Создать FAQ"
      >
        <CreateFaq />
      </Modal>
    </>
  );
};

export default FAQPage;
