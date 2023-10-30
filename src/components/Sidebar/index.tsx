import { FC, createElement } from "react";
import Sider from "antd/es/layout/Sider";
import Logo from "../UI/Logo";
import { Menu, MenuProps } from "antd";
import { SidebarMenu } from "./SidebarMenu";
import { Link } from "react-router-dom";

const links: MenuProps["items"] = SidebarMenu.map((item, index) => {
  const key = String(index + 1);

  return {
    key: `sub${key}`,
    icon: createElement(item.icon),
    label: item.name,

    children: item.children?.map((submenu) => {
      return {
        key: submenu.link + key,
        label: (
          <Link to={submenu.link} className="w-full text-right">
            {submenu.text}
          </Link>
        ),
      };
    }),
  };
});

const Sidebar: FC = () => {
  return (
    <Sider style={siderStyle}>
      <div className="w-full px-5 py-3 h-16 flex justify-center items-center bg-blue-400">
        <Logo />
      </div>
      <div className="mt-7">
        <Menu
          mode="inline"
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          style={{ height: "100%", backgroundColor: "transparent" }}
          items={links}
        />
      </div>
    </Sider>
  );
};

const siderStyle: React.CSSProperties = {
  textAlign: "center",
  backgroundColor: "#F1F1F1",
};

export default Sidebar;
