import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { itemCrud } from "../actions/itemActions";
import ItemFormScreen from "./ItemFormScreen";

const EditItemScreen = ({ history, match }) => {
  const { categoryId, itemId } = match.params;
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.item.list.result);
  const { isSuccess } = useSelector((state) => state.item.update);

  // Find item to edit and set in current state [update]
  const itemToEdit = items.find((item) => item._id === itemId);
  //dispatch(itemCrud.currentAction("update", itemToEdit));

  useEffect(() => {
    if (isSuccess) {
      history.push(`/category/${categoryId}/item`);
    }
  }, [history, isSuccess, categoryId]);

  const handleOnSubmit = (item) => {
    dispatch(itemCrud.update(item));
  };

  return <ItemFormScreen item={itemToEdit} handleOnSubmit={handleOnSubmit} />;
};

export default EditItemScreen;
