import { FC, createElement, useEffect, useMemo, useState } from "react";
import Sider from "antd/es/layout/Sider";
import Logo from "../UI/Logo";
import { Menu, MenuProps } from "antd";
import { SidebarMenu } from "./SidebarMenu";
import { Link, useNavigate } from "react-router-dom";
import { useTypeSelector } from "../../hooks/useTypeSelector";

const getCurrentMenu = (menu: string, links: MenuProps["items"]) => {
  const res: MenuProps["items"] = [];
  links?.forEach((link) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (link.menu == menu) {
      res.push(link);
    }
  });
  return res;
};

let path = window.location.pathname;
const Sidebar: FC = () => {
  const { menu } = useTypeSelector((state) => state.filters);
  const navigate = useNavigate();
  const [active, setActive] = useState<string>("sub1");

  const links: MenuProps["items"] = useMemo(
    () =>
      SidebarMenu.map((item, index) => {
        const key = String(index + 1);
        if (path.includes(item.href)) setActive(`sub${key}`);

        return {
          key: `sub${key}`,
          icon: item.icon ? createElement(item.icon) : null,
          label: item.name,
          menu: item.menu,
          href: item.href,
          children: item.children?.map((submenu) => {
            if (path.includes(submenu.link)) setActive(submenu.link + key);
            if (!submenu.link && submenu.children) {
              return {
                key: `sub${key + submenu.text}`,
                label: submenu.text,
                children: submenu.children.map((deepMenu) => {
                  if (deepMenu.link == path) setActive(deepMenu.link + key);
                  return {
                    key: deepMenu.link + key,
                    label: (
                      <Link
                        to={deepMenu.link || "/"}
                        className="w-full text-right"
                      >
                        {deepMenu.text}
                      </Link>
                    ),
                  };
                }),
              };
            }
            return {
              key: submenu.link + key,
              label: (
                <Link to={submenu.link || ""} className="w-full text-right">
                  {submenu.text}
                </Link>
              ),
            };
          }),
        };
      }),
    []
  );

  useEffect(() => {
    const items = getCurrentMenu(menu, links);
    const link = items[0];
    if (path.length > 1) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      path = "/";
      return;
    }
    setActive(String(link?.key || ""));
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    navigate(link.href);
  }, [menu]);

  return (
    <Sider style={siderStyle}>
      <div
        style={{ height: "64px" }}
        className="w-full px-5 flex justify-center items-center bg-blue-400"
      >
        <Logo />
      </div>
      <div className="mt-7">
        <Menu
          selectedKeys={[active]}
          onClick={(e) => setActive(e.key)}
          activeKey={active}
          className="text-left"
          style={{ height: "100%", backgroundColor: "transparent" }}
          items={getCurrentMenu(menu, links)}
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
