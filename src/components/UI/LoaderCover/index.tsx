import { FC, ReactNode } from "react";
import styles from "./style.module.scss";
import { Spin } from "antd";

interface IProps {
  children: ReactNode;
  loading: boolean;
}
const LoaderCover: FC<IProps> = ({ children, loading }) => {
  return (
    <div className={`${loading && styles.loading}`}>
      {children}
      <div className={styles.spin}>
        <Spin size="large" />
      </div>
    </div>
  );
};

export default LoaderCover;
