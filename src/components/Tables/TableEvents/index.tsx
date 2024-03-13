import { FC, useEffect, useState } from "react";
import { useTypeSelector } from "../../../hooks/useTypeSelector";
import { useTypeDispatch } from "../../../hooks/useTypeDispatch";
import { Button, Form, Spin } from "antd";
import { EnumStatus } from "../../../types/Status";
import { columns } from "./columnt";
import Table from "..";
import {
  fetchEvents,
  updateEvent,
} from "../../../store/Slices/eventsSlice/asyncActions";
import { useForm } from "antd/es/form/Form";
import { ITranslateLeague } from "../../../store/Slices/leaguesSlice/interface";
import ModalLang from "../../../modules/TableTranslate/ModalLang";

// interface IValues {
//   [key: number]: string;
// }
const TableEvents: FC = () => {
  const { events, status } = useTypeSelector((state) => state.events);
  const { search } = useTypeSelector((state) => state.filters);
  const dispatch = useTypeDispatch();

  const [form] = useForm();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [translate, setTranslate] = useState<ITranslateLeague[]>([]);

  const openModal = (translate: ITranslateLeague[]) => {
    setTranslate(translate);
    setIsModalOpen(true);
  };

  const updateEventName = (id: number) => {
    dispatch(updateEvent({ id: id, name: form.getFieldValue(id) }));
  };

  useEffect(() => {
    dispatch(
      fetchEvents({
        page: 1,
        search,
        limit: "",
      })
    );
  }, [search]);

  return (
    <>
      <Form
        name={`events-update`}
        form={form}
        className="no-action"
        initialValues={{ remember: true }}
        // onFinish={onFinish}
      >
        <Spin
          size="large"
          spinning={status == EnumStatus.LOADING}
          tip="Loading..."
        >
          <Table
            data={events}
            columns={columns.map((col) => {
              if (col.key === "translate") {
                col.render = (_, record) => (
                  <Button
                    type="default"
                    onClick={() => openModal(record.translate)}
                  >
                    Посмотреть
                  </Button>
                );
              }
              if (col.key === "save") {
                col.render = (_, record) => (
                  <Button
                    type="primary"
                    onClick={() => updateEventName(record.id)}
                  >
                    Сохранить
                  </Button>
                );
              }
              return col;
            })}
          />
        </Spin>
      </Form>
      <ModalLang
        open={isModalOpen}
        setOpen={setIsModalOpen}
        translate={translate}
      />
    </>
  );
};

export default TableEvents;
