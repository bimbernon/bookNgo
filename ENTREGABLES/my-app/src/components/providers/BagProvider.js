import React from "react";
import { useLocalSession } from "../../Hooks/useLocalSession";

export const BagContext = React.createContext();

export const BagProvider = (props) => {
  const { children } = props;

  const [bag, setBag] = useLocalSession("bag");

  return (
    <BagContext.Provider value={[bag, setBag]}>{children}</BagContext.Provider>
  );
};
