import React from "react";
import { BackPackItem } from "../components/main/BackPackItem/BackPackItem";

export function BackPack(props) {
  const { bag, setBag} = props;
  return (
    <div>
      <BackPackItem />
    </div>
  );
}
