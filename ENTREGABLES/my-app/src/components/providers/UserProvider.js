import React from "react";
import { useLocalStorage } from "../../Hooks/useLocalStorage";

export const UserContext = React.createContext();

export const UserProvider = (props) => {
  const { children } = props;

  const [selectedUser, setSelectedUser] = useLocalStorage("selectedUser");

  return (
    <UserContext.Provider value={{ selectedUser, setSelectedUser }}>
      {children}
    </UserContext.Provider>
  );
};
