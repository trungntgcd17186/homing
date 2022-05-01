import { routes } from "../lib/routes";
import { createContext, useState } from "react";

type RouteKeyProviderProps = {
  children: React.ReactNode;
};

const RouteKeyContext = createContext<any>("");

function RouteKeyProvider({ children }: RouteKeyProviderProps) {
  const [routeKey, setRouteKey] = useState("");
  const [edit, setEdit] = useState(false);
  const [dataUser, setDataUser] = useState([]);

  const value = {
    routeKey,
    setRouteKey,
    setEdit,
    edit,
    setDataUser,
    dataUser,
  };
  return (
    <RouteKeyContext.Provider value={value}>
      {children}
    </RouteKeyContext.Provider>
  );
}

export { RouteKeyContext, RouteKeyProvider };
