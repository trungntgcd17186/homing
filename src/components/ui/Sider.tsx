import { RouteProps, routes } from "../../lib/routes";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Layout, Menu } from "antd";
import React, { useContext } from "react";
import VectorUrl from "../../image/VectorUrl.svg";
import { SiderProps } from "antd/lib/layout/Sider";
import { RouteKeyContext } from "../../Context/RouteContext";
interface Props extends SiderProps {}

export default function SiderComponent(props: Props) {
  const context = useContext(RouteKeyContext);
  const navigate = useNavigate();

  const location = useLocation();

  const handleTo = (context: any, key: string, pathname?: string) => () => {
    if (pathname) {
      navigate(pathname);

      //Xử lý active sibar khi click vào menu sidebar
      context.setRouteKey(key);
    }
  };

  const renderMenuItem = (route: RouteProps, index: any) => {
    return index === 4 ? (
      <>
        <div style={{ marginLeft: "24px" }}>
          <p className="my-media">My Media</p>
        </div>
        <Menu.Item
          key={route.key}
          disabled={route.disabled}
          onClick={handleTo(context, route.key, route.url)}
          className="menu-items"
        >
          {route.title}
        </Menu.Item>
      </>
    ) : (
      <Menu.Item
        key={route.key}
        disabled={route.disabled}
        onClick={handleTo(context, route.key, route.url)}
        className="menu-items"
      >
        {route.title}
      </Menu.Item>
    );
  };
  return (
    <div>
      <div style={{ marginTop: "20px" }}>
        <a className="pathname-1" href="">
          Home
        </a>
        <img style={{ marginLeft: "7px" }} src={VectorUrl} alt="icon" />
        <a className="pathname-2" href="">
          Edit My Profile
        </a>
      </div>
      <div className="sider">
        <p className="personal">Personal</p>
        <Menu
          className="menu"
          theme="light"
          mode="inline"
          selectedKeys={[`${context.routeKey}`]}
        >
          {routes.map((route, index) => renderMenuItem(route, index))}
        </Menu>
      </div>
    </div>
  );
}
