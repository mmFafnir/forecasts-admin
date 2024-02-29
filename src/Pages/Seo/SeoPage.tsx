import { Button, Modal } from "antd";
import { FC, useState } from "react";
import TableSeo from "../../components/Tables/TableSeo/intex";
import CreateSeo from "../../modules/Forms/seo-form/CreateSeo";

const SeoPage: FC = () => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const onModalOpen = () => setIsOpenModal(true);
  const onCloseModal = () => setIsOpenModal(false);
  return (
    <>
      <div className="flex items-center">
        <h1>SEO</h1>
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
      <TableSeo />
      <Modal
        open={isOpenModal}
        footer={() => <></>}
        width={800}
        onCancel={onCloseModal}
        title="Создать Seo текст"
      >
        <CreateSeo />
      </Modal>
    </>
  );
};

export default SeoPage;
