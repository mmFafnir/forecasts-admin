import { Table as AntTable, Button, Modal } from "antd";
import { FC, useEffect, useMemo, useState } from "react";
import Search from "antd/es/input/Search";
import { TypeRateDetail } from "../../../../../store/Slices/rateSlice/interface";
import { columns } from "./columns";
import { UpdateDetailsRate } from "../../update/UpdateDetailsRate";

type TypeValuta = "price_rub" | "price_usd" | "price_euro";
type TypeDay = "work_day" | "work_month" | "work_year";

interface IValue<T> {
  text: string;
  value: T;
}

const prices: IValue<TypeValuta>[] = [
  {
    text: "RUB",
    value: "price_rub",
  },
  {
    text: "USD",
    value: "price_usd",
  },
  {
    text: "EU",
    value: "price_euro",
  },
];

const days: IValue<TypeDay>[] = [
  {
    text: "День",
    value: "work_day",
  },
  {
    text: "Месяц",
    value: "work_month",
  },
  {
    text: "Год",
    value: "work_year",
  },
];

interface IProps {
  data: TypeRateDetail[];
}

export const Table: FC<IProps> = ({ data }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [currentDetail, setCurrentDetail] = useState<TypeRateDetail | null>(
    null
  );

  const [currentData, setCurrentData] = useState<TypeRateDetail[]>([]);
  const [valuta, setValuta] = useState<IValue<TypeValuta>>(prices[0]);
  const [day, setDay] = useState<IValue<TypeDay>>(days[0]);

  const cols = useMemo(() => {
    return columns.map((item) => {
      if (item.key === "price") {
        item.filterDropdown = (props) => {
          const key = props.selectedKeys[0];
          return (
            <div className="flex flex-col">
              {prices.map((price) => (
                <Button
                  onClick={() => {
                    props.setSelectedKeys([price.value]);
                    setValuta(price);
                  }}
                  className={` ${
                    key === price.value && "pointer-events-none"
                  } text-left rounded-none border-transparent first:rounded-tl  rounded-tr last:rounded-bl rounded-br`}
                  key={price.value}
                  type={key === price.value ? "primary" : "default"}
                >
                  {price.text}
                </Button>
              ))}
            </div>
          );
        };
        item.title = <p style={{ width: 100 }}>Цена {valuta.text}</p>;
        item.render = (_, record) => (
          <p>
            {record[valuta.value] == "0" ? "Бесплатно" : record[valuta.value]}
          </p>
        );
        return item;
      }

      if (item.key === "work") {
        item.colSpan = 1;
        item.filterDropdown = (props) => {
          const key = props.selectedKeys[0];
          return (
            <div className="flex flex-col">
              {days.map((day) => (
                <Button
                  onClick={() => {
                    props.setSelectedKeys([day.value]);
                    setDay(day);
                  }}
                  className={` ${
                    key === day.value && "pointer-events-none"
                  } text-left rounded-none border-transparent first:rounded-tl  rounded-tr last:rounded-bl rounded-br`}
                  key={day.value}
                  type={key === day.value ? "primary" : "default"}
                >
                  {day.text}
                </Button>
              ))}
            </div>
          );
        };
        item.title = <p style={{ width: 150 }}>Переод в {day.text}</p>;
        item.render = (_, record) => <p>{record[day.value] || "Пусто"}</p>;
        return item;
      }

      return item;
    });
  }, [valuta, day]);

  const handleSearch = (value: string) => {
    setCurrentData([...data.filter((item) => `${item.name}`.includes(value))]);
  };

  const onModalOpen = () => setIsOpenModal(true);
  const onCloseModal = () => setIsOpenModal(false);

  useEffect(() => {
    setCurrentData(data);
  }, [data]);

  return (
    <div className="pr-11">
      <Search className="max-w-sm ml-auto block mb-3" onSearch={handleSearch} />
      <AntTable
        className="table w-full"
        rowKey="id"
        columns={cols.map((col) => {
          if (col.key === "action") {
            col.render = (_, record) => (
              <button
                onClick={() => {
                  setCurrentDetail(record);
                  onModalOpen();
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="21"
                  height="22"
                  viewBox="0 0 21 22"
                  fill="none"
                >
                  <path
                    d="M16.8528 9.98553L17.3169 9.52138L15.9245 8.12893L13.3737 5.57816L11.9813 4.18572L11.5171 4.64987L10.5888 5.57816L2.40664 13.7603C1.97946 14.1875 1.66729 14.7174 1.49477 15.2965L0.0407125 20.242C-0.0619753 20.587 0.0324975 20.9608 0.291271 21.2155C0.550044 21.4701 0.91972 21.5646 1.26475 21.466L6.20609 20.012C6.78525 19.8394 7.31512 19.5273 7.7423 19.1001L15.9245 10.9179L16.8528 9.98553ZM6.57166 16.9026L6.19787 17.835C6.03357 17.9623 5.84874 18.0568 5.65157 18.1184L2.4395 19.0631L3.38423 15.8552C3.44173 15.6539 3.54031 15.4691 3.66765 15.3089L4.60005 14.9351V16.2495C4.60005 16.6109 4.89579 16.9067 5.25725 16.9067H6.57166V16.9026ZM14.8976 1.26528L14.3061 1.86087L13.3778 2.78916L12.9095 3.25331L14.302 4.64576L16.8528 7.19652L18.2452 8.58897L18.7094 8.12482L19.6377 7.19652L20.2332 6.60093C21.2601 5.57406 21.2601 3.91051 20.2332 2.88364L18.619 1.26528C17.5921 0.238398 15.9286 0.238398 14.9017 1.26528H14.8976ZM12.9506 8.1659L7.03581 14.0807C6.78114 14.3354 6.36217 14.3354 6.10751 14.0807C5.85284 13.826 5.85284 13.4071 6.10751 13.1524L12.0223 7.2376C12.277 6.98293 12.696 6.98293 12.9506 7.2376C13.2053 7.49227 13.2053 7.91123 12.9506 8.1659Z"
                    fill="#888888"
                  />
                </svg>
              </button>
            );
          }
          return col;
        })}
        dataSource={currentData}
      />

      <Modal
        open={isOpenModal}
        footer={() => <></>}
        onCancel={onCloseModal}
        title={`Изменить элемент в тариф ${currentDetail?.name}`}
      >
        <UpdateDetailsRate onClose={onCloseModal} data={currentDetail} />
      </Modal>
    </div>
  );
};
