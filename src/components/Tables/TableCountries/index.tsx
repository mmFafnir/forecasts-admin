import { Button, Spin } from "antd";
import { FC, useState } from "react";
import { useTypeSelector } from "../../../hooks/useTypeSelector";
import { EnumStatus } from "../../../types/Status";
import { columns } from "./colums";
import ModalLang from "../../../modules/TableTranslate/ModalLang";
import { ITranslateLeague } from "../../../store/Slices/leaguesSlice/interface";
import TableCountry from "./TableCountry";

const TableCountries: FC = () => {
  const { countries, status } = useTypeSelector((state) => state.countries);

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [translate, setTranslate] = useState<ITranslateLeague[]>([]);

  const modalOpen = (translate: ITranslateLeague[]) => {
    setTranslate(translate);
    setIsOpenModal(true);
  };

  return (
    <div>
      <Spin
        size="large"
        spinning={status == EnumStatus.LOADING}
        tip="Loading..."
      >
        <TableCountry
          data={countries}
          columns={[
            ...columns.map((item) => {
              if (item.key === "translate") {
                item.render = (_, record) => (
                  <Button onClick={() => modalOpen(record.translate)}>
                    Посмотреть
                  </Button>
                );
              }
              return item;
            }),
          ]}
        />
      </Spin>
      <ModalLang
        open={isOpenModal}
        translate={translate}
        setOpen={setIsOpenModal}
      />
    </div>
  );
};

export default TableCountries;
