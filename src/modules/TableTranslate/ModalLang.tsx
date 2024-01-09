import { Modal } from "antd";
import { FC } from "react";
import TableTranslate from "./TableTranslate";
import { ITranslateLeague } from "../../store/Slices/leaguesSlice/interface";

interface IProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  translate: ITranslateLeague[];
}
const ModalLang: FC<IProps> = ({ open, setOpen, translate }) => {
  const modalClose = () => setOpen(false);
  return (
    <Modal title={"Переводы"} footer={<></>} open={open} onCancel={modalClose}>
      <TableTranslate translate={translate} />
    </Modal>
  );
};

export default ModalLang;
