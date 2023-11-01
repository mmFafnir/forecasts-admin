import { FC } from "react";
import { Header as HeaderAnt } from "antd/es/layout/layout";
import { Menu } from "antd";

import "./header.scss";
import { sports } from "../../assets/data/sports";

const Header: FC = () => {
  return (
    <HeaderAnt style={headerStyle}>
      <div>
        <Menu
          style={{ backgroundColor: "transparent" }}
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          items={sports.map((sport, index) => {
            const key = index + 1;
            return {
              key,
              label: <button className="font-bold">{sport.label}</button>,
            };
          })}
        />
      </div>
      <div>
        <a href="#" className="header-author-link">
          <p>Администратор, Антон</p>
          <img
            src="https://android-obzor.com/wp-content/uploads/2022/03/man-silhouette.jpg"
            alt="Администратор, Антон"
          />
        </a>
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
