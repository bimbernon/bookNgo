import { useState, useEffect } from "react";

export const useLocalSession = (key, initialValue = "") => {
  const localData = sessionStorage.getItem(key);
  const localDataValue = localData ? JSON.parse(localData) : initialValue;
  const [newLocalValue, setNewLocalValue] = useState(localDataValue);

  useEffect(() => {
    sessionStorage.setItem(key, JSON.stringify(newLocalValue));
  }, [newLocalValue, key]);

  return [newLocalValue, setNewLocalValue];
};
