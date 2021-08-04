import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import CategoryFormScreen from "./CategoryFormScreen";
import { createCategory } from "../actions/categoryActions";

const AddCategoryScreen = ({ history, match }) => {
  const { listId } = match.params;
  const dispatch = useDispatch();

  const { createStatus } = useSelector((state) => state.category);

  useEffect(() => {
    if (createStatus === "succeeded") {
      history.push(`/lists/${listId}/category`);
    }
  }, [history, createStatus, listId]);

  const handleOnSubmit = (category) => {
    dispatch(createCategory(category));
  };

  return <CategoryFormScreen handleOnSubmit={handleOnSubmit} />;
};

export default AddCategoryScreen;
