import React from "react";
import Exception from "./components/Exception";
import logo from "./logo.svg";
import "./App.css";
import SiderComponent from "./components/ui/Sider";
import { RouteProps, routes } from "./lib/routes";
import { Layout } from "antd";
import { Suspense, useContext } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import Loading from "./components/common/loading";
import Header from "./components/ui/Header";
import HomePage from "./pages/HomePage";

function App() {
  const renderRoute = (route: RouteProps) => {
    if (!route.Component || !route.url) {
      return null;
    }

    return (
      <Route
        key={route.key}
        exact={route.exact}
        component={route.Component}
        path={route.url}
      />
    );
  };

  const _routes = routes.map((r) => renderRoute(r));

  return (
    <Layout>
      <Header />
      <div style={{ float: "left" }}>{"Home" + ">" + "Edit My Profile"}</div>
      <SiderComponent />
      <Layout className="ml-200">
        <Layout.Content>
          <Suspense fallback={<Loading />}>
            {/* <Switch>
              <Route exact path="/" component={HomePage} />
              {_routes}
              <Route component={Exception} />
            </Switch> */}
          </Suspense>
        </Layout.Content>
      </Layout>
    </Layout>
  );
}

export default App;
