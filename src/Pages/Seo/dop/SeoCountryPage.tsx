import { FC, useEffect, useState } from "react";
import { Button, Modal, Select, Space, Spin } from "antd";
import { CreateCountrySeo } from "../../../modules/Forms/seo-form/create";
import TableSeo from "../../../components/Tables/TableSeo";
import { useTypeSelector } from "../../../hooks/useTypeSelector";
import { useTypeDispatch } from "../../../hooks/useTypeDispatch";
import { fetchAllSeo } from "../../../store/Slices/seoSlice/asyncActions";
import { EnumStatus } from "../../../types/Status";

export const SeoCountryPage: FC = () => {
  const { sports } = useTypeSelector((state) => state.sports);
  const { seo, status } = useTypeSelector((state) => state.seo);
  const dispatch = useTypeDispatch();

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [sportId, setSportId] = useState<number>(1);

  useEffect(() => {
    dispatch(fetchAllSeo({ sportId: sportId, country: true }));
  }, [sportId]);

  const onModalOpen = () => setIsOpenModal(true);
  const onCloseModal = () => setIsOpenModal(false);

  return (
    <div className="form">
      <div className="flex items-center mb-5">
        <h1>Редактировать Seo для Стран</h1>
        <Button
          onClick={onModalOpen}
          type="primary"
          className="ml-auto mr-10 w-24 block"
        >
          <span className="font-medium">Добавить</span>
        </Button>
      </div>
      <div className="mb-5 flex justify-start flex-wrap">
        <p className="font-semibold mb-2 text-xs flex-auto basis-full text-left">
          Вид Спорта:
        </p>
        <Select
          className="flex-grow-0 flex-shrink basis-32 text-left"
          defaultValue={1}
          onChange={(value) => setSportId(value)}
          options={sports.map((sport) => ({
            label: sport.name,
            value: sport.id,
          }))}
        />
      </div>
      {!seo ? (
        <Space className="flex h-96 max-w-md justify-center items-center">
          <Spin size="large" />
        </Space>
      ) : (
        <TableSeo data={seo} loading={status === EnumStatus.LOADING} />
      )}
      <Modal
        open={isOpenModal}
        footer={() => <></>}
        width={800}
        onCancel={onCloseModal}
        title="Создать Seo текст"
      >
        <CreateCountrySeo />
      </Modal>
    </div>
  );
};
