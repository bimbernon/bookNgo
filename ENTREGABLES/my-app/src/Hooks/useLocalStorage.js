import { useState, useEffect } from "react";

export const useLocalStorage = (key, initialValue = "") => {
  const localData = localStorage.getItem(key);
  const localDataValue = localData ? JSON.parse(localData) : initialValue;
  const [newLocalValue, setNewLocalValue] = useState(localDataValue);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(newLocalValue));
  }, [newLocalValue, key]);

  return [newLocalValue, setNewLocalValue];
};
