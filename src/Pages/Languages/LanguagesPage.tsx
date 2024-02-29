import { FC, useState } from "react";
import TableLanguages from "../../components/Tables/TableLanguages";
import { Button, Modal } from "antd";
import CreateLanguage from "../../modules/Forms/languages-form/CreateLanguage";

const LanguagesPage: FC = () => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const openModal = () => setIsOpenModal(true);
  const closeModal = () => setIsOpenModal(false);
  return (
    <>
      <div className="flex items-center">
        <h1>ЯЗЫКИ</h1>
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
      <TableLanguages />
      <Modal
        open={isOpenModal}
        footer={() => <></>}
        onCancel={closeModal}
        title="Создать Язык"
      >
        <CreateLanguage />
      </Modal>
    </>
  );
};

export default LanguagesPage;
