import { RouteProps, routes } from "../../lib/routes";
import { useHistory } from "react-router-dom";
import { Layout, Menu } from "antd";
import React from "react";
import { SiderProps } from "antd/lib/layout/Sider";

interface Props extends SiderProps {}

export default function SiderComponent(props: Props) {
  const history = useHistory();

  const handleTo = (context: any, key: string, pathname?: string) => () => {
    console.log(pathname);
    if (pathname) {
      history.push(pathname);
    }

    console.log("abc");

    // //Xử lý active sibar khi click vào menu sidebar
    // context.setRouteKey(key);
  };

  const renderMenuItem = (route: RouteProps) => {
    return (
      <Menu.Item
        key={route.key}
        disabled={route.disabled}
        onClick={handleTo("context", route.key, route.url)}
      >
        {route.title}
      </Menu.Item>
    );
  };
  return (
    <div style={{ height: "100vh", width: "100px" }} {...props}>
      <div onClick={handleTo("/", "/")}></div>
      <Menu theme="dark" mode="inline" selectedKeys={["context.routeKey"]}>
        {routes.map((route) => renderMenuItem(route))}
      </Menu>
    </div>
  );
}
