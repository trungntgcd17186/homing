import { routes } from "../lib/routes";
import { createContext, useState } from "react";

type RouteKeyProviderProps = {
  children: React.ReactNode;
};

const Context = createContext<any>("");

function GlobalProvider({ children }: RouteKeyProviderProps) {
  const [routeKey, setRouteKey] = useState("");
  const [edit, setEdit] = useState(false);
  const [dataUser, setDataUser] = useState([]);
  const [isModalVerifyPhoneNumberVisible, setIsModalVerifyPhoneNumberVisible] =
    useState(false);

  const value = {
    routeKey,
    setRouteKey,
    setEdit,
    edit,
    setDataUser,
    dataUser,
    setIsModalVerifyPhoneNumberVisible,
    isModalVerifyPhoneNumberVisible,
  };
  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export { Context, GlobalProvider };
