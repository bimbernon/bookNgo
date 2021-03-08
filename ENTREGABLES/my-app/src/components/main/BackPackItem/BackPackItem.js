import React from "react";
import "./BackPackItem.css"
import { Book } from "../Book/Book";
import { useParams} from "react-router-dom";

export const BackPackItem = () => {

  let {bookId} = useParams();

  return (
  <div className="backPack-container">
    <Book bookId={bookId}/>
    <button className="pay-button" type="submit"></button>
  </div>
  );
};

