import { Menu } from "antd";
import { SiderProps } from "antd/lib/layout/Sider";
import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import VectorUrl from "../../assets/image/VectorUrl.svg";
import { Context } from "../../Context/GlobalContext";
import { RouteProps, routes } from "../../lib/routes";
interface Props extends SiderProps {}

interface IContext {
  routeKey: string;
  setRouteKey: any;
  setEdit: boolean;
  edit: boolean;
  setImg: string;
  img: string;
}

export default function SiderComponent(props: Props) {
  const context = useContext(Context);
  const navigate = useNavigate();
  const location = useLocation();

  context.setRouteKey(location.pathname);

  const handleTo =
    (context: IContext, key: string, pathname?: string) => () => {
      if (pathname) {
        navigate(pathname);

        //Xử lý active sibar khi click vào menu sidebar
        context.setRouteKey(key);
      }
    };

  const renderMenuItem = (route: RouteProps, index: number) => {
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
          <p style={{ marginTop: "12px" }}>{route.title}</p>
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
