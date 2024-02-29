import { FC, useState } from "react";
import FilterHeader from "../../components/Filters/FilterHeader";
import TableBookmakers from "../../components/Tables/TableBookmakers";
import { Button, Modal } from "antd";
import CreateBookmaker from "../../modules/Forms/bookmakers-form/CreateBookmaker";

const BookmakerPage: FC = () => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const openModal = () => setIsOpenModal(true);
  const closeModal = () => setIsOpenModal(false);

  return (
    <>
      <div className="flex items-center">
        <h1>ТОП БУКМЕКЕРОВ</h1>
        <Button
          onClick={openModal}
          className="ml-2 mr-10 w-24 block"
          size="large"
          type="primary"
        >
          <span className="font-medium">Создать</span>
        </Button>
      </div>
      <div className="mt-6">
        <FilterHeader items={[]} />
      </div>
      <div></div>
      <TableBookmakers />
      <Modal
        open={isOpenModal}
        footer={() => <></>}
        onCancel={closeModal}
        title="Создать Топ Букмекера"
      >
        <CreateBookmaker />
      </Modal>
    </>
  );
};

export default BookmakerPage;
