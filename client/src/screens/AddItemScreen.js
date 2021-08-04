import React from "react";
import { useDispatch } from "react-redux";
import { itemCrud } from "../actions/itemActions";
import ItemFormScreen from "./ItemFormScreen";

const AddItemScreen = ({ history, match }) => {
  const dispatch = useDispatch();
  const handleOnSubmit = (item) => {
    dispatch(itemCrud.create(item));
  };

  return <ItemFormScreen handleOnSubmit={handleOnSubmit} />;
};

export default AddItemScreen;
