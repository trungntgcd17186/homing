import React from "react";
import Exception from "./components/Exception";
import "./App.css";
import SiderComponent from "./components/ui/Sider";
import { RouteProps, routes } from "./lib/routes";
import { Layout } from "antd";
import { Suspense, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Loading from "./components/common/loading";
import Header from "./components/ui/Header";
import HomePage from "./pages/HomePage";
import "antd/dist/antd.css";
import "@fontsource/poppins";

function App() {
  const renderRoute = (route: RouteProps) => {
    if (!route.Component || !route.url) {
      return null;
    }

    return (
      <Route
        key={route.key}
        // exact={route.exact}
        element={<route.Component />}
        path={route.url}
      />
    );
  };

  const _routes = routes
    .map((r) => renderRoute(r))
    .reduce((result: any[], route) => {
      if (!route) {
        return result;
      }
      if (Array.isArray(route)) {
        return [...result, ...route.filter(Boolean)];
      }

      result.push(route);

      return result;
    }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Header />

      <div
        style={{
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <SiderComponent />
          <div style={{ width: "60%" }}>
            <Layout.Content>
              <Suspense fallback={<Loading />}>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  {_routes}
                  <Route element={<Exception />} />
                </Routes>
              </Suspense>
            </Layout.Content>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
