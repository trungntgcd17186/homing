import { routes } from "../lib/routes";
import { createContext, useState } from "react";

type RouteKeyProviderProps = {
  children: React.ReactNode;
};

const RouteKeyContext = createContext<any>("");

function RouteKeyProvider({ children }: RouteKeyProviderProps) {
  const [routeKey, setRouteKey] = useState("");
  const [edit, setEdit] = useState(false);

  const value = {
    routeKey,
    setRouteKey,
    setEdit,
    edit,
  };
  return (
    <RouteKeyContext.Provider value={value}>
      {children}
    </RouteKeyContext.Provider>
  );
}

export { RouteKeyContext, RouteKeyProvider };
