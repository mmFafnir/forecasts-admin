import { FC, useState } from "react";
import {
  IDataCreateBookmaker,
  TypeBookmaker,
} from "../../store/Slices/bookmakersSlice/interface";
import { Button, Form, Input, Modal } from "antd";
import UploadInput from "../../components/UI/Form/UploadInput";
import { required } from "../../core/form-rools";
import { useTypeDispatch } from "../../hooks/useTypeDispatch";
import {
  deleteBookmaker,
  updateBookmaker,
} from "../../store/Slices/bookmakersSlice/asyncActions";
import { notify } from "../../assets/scripts/notify";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

interface IProps {
  bookmaker: TypeBookmaker;
}
const titleClasses = `text-left font-semibold text-sm mb-1`;

const BookmakerForm: FC<IProps> = ({ bookmaker }) => {
  const dispatch = useTypeDispatch();
  const navigate = useNavigate();

  const [form] = Form.useForm<IDataCreateBookmaker>();
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingError, setLoadingError] = useState<boolean>(false);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  const showNotifyError = () => {
    notify({
      type: "error",
      message: "Ошибка!",
      description: "Произошла ошибка, букмекер хочет жить, попробуйте позже",
    });
  };
  const onDelete = () => {
    setLoadingError(true);
    dispatch(deleteBookmaker(bookmaker.id))
      .then(() => {
        navigate("/bookmakers");
        notify({
          type: "success",
          message: `Букмекер ${bookmaker.name} был успешно удален`,
        });
      })
      .catch(() => {
        setModalIsOpen(false);
        showNotifyError();
      })
      .finally(() => {
        setModalIsOpen(false);
        setLoadingError(false);
      });
  };

  const onFinish = (values: IDataCreateBookmaker) => {
    setLoading(true);
    dispatch(
      updateBookmaker({
        ...values,
        bookmaker_id: bookmaker.id,
      })
    )
      .then(() => {
        notify({
          type: "success",
          message: "Успешно",
          description: `Букмекер ${bookmaker.name} успешно обнавлен`,
        });
      })
      .catch((error) => {
        const err = error as AxiosError;
        notify({
          type: "error",
          message: `Ошибка ${err.code}`,
          description: err.message,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Form
      form={form}
      name="bookmaker-create-form"
      layout="vertical"
      style={{ maxWidth: "700px" }}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item
        name="name"
        className="mb-7"
        initialValue={bookmaker.name}
        rules={[required]}
      >
        <div>
          <p className={titleClasses}>Наименование Букмекера </p>
          <Input defaultValue={bookmaker.name} />
        </div>
      </Form.Item>
      <Form.Item
        name="url"
        className="mb-7"
        rules={[
          required,
          {
            pattern: /(http|https):\/\/[^\s]+/gm,
            message: "Данное значение не является ссылкой",
          },
        ]}
        initialValue={bookmaker.url}
      >
        <div>
          <p className={titleClasses}>Ссылка на Букмекера</p>
          <Input defaultValue={bookmaker.url} />
        </div>
      </Form.Item>

      <div className="mb-7 flex flex-col items-start">
        <p className={`${titleClasses} mb-3`}>Загрузить новый логотип</p>
        <UploadInput />
      </div>

      <Form.Item
        name="code"
        className="mb-7"
        rules={[required]}
        initialValue={bookmaker.code}
      >
        <div>
          <p className={titleClasses}>Промокод </p>
          <Input defaultValue={bookmaker.code} />
        </div>
      </Form.Item>

      <Form.Item
        name="price"
        className="mb-7"
        rules={[required]}
        initialValue={bookmaker.price}
      >
        <div>
          <p className={titleClasses}>Сумма подарка </p>
          <Input type="number" defaultValue={bookmaker.price} />
        </div>
      </Form.Item>

      <div className="flex">
        <Button
          type="primary"
          size="large"
          danger
          onClick={() => setModalIsOpen(true)}
        >
          Удалить
        </Button>
        <Button
          htmlType="submit"
          className="ml-2"
          size="large"
          type="primary"
          loading={loading}
        >
          Сохранить
        </Button>
      </div>
      <Modal
        title="Удалить?!"
        open={modalIsOpen}
        onOk={onDelete}
        onCancel={() => setModalIsOpen(false)}
        cancelText="Нет"
        okText="Уверен!"
        confirmLoading={loadingError}
      >
        <p>Вы уверены, что хотите удалить Букмекера {bookmaker.name}?</p>
      </Modal>
    </Form>
  );
};

export default BookmakerForm;
