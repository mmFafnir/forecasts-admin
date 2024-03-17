import { Button, Modal } from "antd";
import { FC, ReactNode, useState } from "react";
import "./modal.full.screen.scss";
import { FullscreenOutlined } from "@ant-design/icons";

interface IProps {
  children: ReactNode;
}
const ModalFullScreen: FC<IProps> = ({ children }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="modal-full-screen-div">
      <Button
        className="modal-full-screen-btn"
        type="text"
        onClick={() => setVisible(true)}
      >
        <FullscreenOutlined />
      </Button>
      {children}
      <Modal
        className="!w-screen !h-screen !top-0 max-w-none modal-full-screen p-0"
        title="Modal 1000px width"
        // This was removed
        // centered
        open={visible}
        onCancel={() => setVisible(false)}
        rootClassName="!w-screen !h-screen"
        wrapClassName="!h-screen"
        // This was removed
        width={"1000"}
      >
        {children}
      </Modal>
    </div>
  );
};

export default ModalFullScreen;
