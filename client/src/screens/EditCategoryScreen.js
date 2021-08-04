import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import CategoryFormScreen from "./CategoryFormScreen";
import { updateCategory } from "../actions/categoryActions";

const EditCategoryScreen = ({ history }) => {
  const { categoryId, listId } = useParams();
  const { categories, updateStatus } = useSelector((state) => state.category);
  const categoryToEdit = categories.find(
    (category) => category._id === categoryId
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (updateStatus === "succeeded") {
      history.push(`/lists/${listId}/category`);
    }
  }, [history, updateStatus, listId]);

  const handleOnSubmit = (category) => {
    dispatch(updateCategory(category));
  };

  return (
    <CategoryFormScreen
      category={categoryToEdit}
      handleOnSubmit={handleOnSubmit}
    />
  );
};

export default EditCategoryScreen;
