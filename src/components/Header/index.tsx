import { FC } from "react";
import { Header as HeaderAnt } from "antd/es/layout/layout";
import { Button, Menu } from "antd";

import "./header.scss";
import { sports } from "../../assets/data/sports";
import { LogoutOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { logout } from "../../store/Slices/userSlices";
import { setMenu } from "../../store/Slices/filterSlice";
import { useTypeSelector } from "../../hooks/useTypeSelector";

const Header: FC = () => {
  const { menu } = useTypeSelector((state) => state.filters);
  const dispatch = useDispatch();
  const onChangeMenu = (value: string) => dispatch(setMenu(value));
  const onLogout = () => dispatch(logout());

  return (
    <HeaderAnt style={headerStyle}>
      <div>
        <Menu
          style={{ backgroundColor: "transparent" }}
          mode="horizontal"
          selectedKeys={[menu]}
          items={[
            {
              onClick: () => onChangeMenu(String("general")),
              key: "general",
              label: <button className="font-bold">Общая</button>,
            },
            ...sports.map((sport, index) => {
              const key = index + 1;
              return {
                key,
                onClick: () => onChangeMenu(String(key)),
                label: (
                  <button
                    // onClick={}
                    className="font-bold"
                  >
                    {sport.label}
                  </button>
                ),
              };
            }),
          ]}
        />
      </div>
      <div className="ml-auto">
        <a href="#" className="header-author-link">
          <p>Администратор, Антон</p>
          <img
            src="https://android-obzor.com/wp-content/uploads/2022/03/man-silhouette.jpg"
            alt="Администратор, Антон"
          />
        </a>
      </div>
      <div className="ml-3">
        <Button
          onClick={onLogout}
          type="primary"
          shape="circle"
          icon={<LogoutOutlined />}
        />
      </div>
    </HeaderAnt>
  );
};

const headerStyle: React.CSSProperties = {
  textAlign: "center",
  height: 64,
  lineHeight: "64px",
  padding: "0px 20px",
  backgroundColor: "#E9E9E9",
  display: "flex",
  justifyContent: "space-between",
};

export default Header;
