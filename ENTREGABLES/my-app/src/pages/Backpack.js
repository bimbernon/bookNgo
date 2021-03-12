import React from "react";
import { useParams } from "react-router";
import { BackPackItem } from "../components/main/BackPackItem/BackPackItem";

export function BackPack() {

  return (
    <div>
      <BackPackItem />
    </div>
  );
}
