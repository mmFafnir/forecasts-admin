import { FC, useState } from "react";
// import FilterHeader from "../../components/Filters/FilterHeader";
import TableCountries from "../../components/Tables/TableCountries";
import { Button, Modal } from "antd";
import CreateCountry from "../../modules/Forms/country-form/CreateCountry";

const CountriesPage: FC = () => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const onModalOpen = () => setIsOpenModal(true);
  const onCloseModal = () => setIsOpenModal(false);

  return (
    <>
      <div className="flex items-center">
        <h1>СТРАНЫ</h1>
        <Button
          onClick={onModalOpen}
          type="primary"
          size="large"
          className="ml-2 mr-10 w-24 block"
        >
          <span className="font-medium">Создать</span>
        </Button>
      </div>
      <div className="mt-6">{/* <FilterHeader items={[]} /> */}</div>
      <div></div>
      <TableCountries />
      <Modal
        open={isOpenModal}
        footer={() => <></>}
        onCancel={onCloseModal}
        title="Создать Страну"
      >
        <CreateCountry />
      </Modal>
    </>
  );
};

export default CountriesPage;
