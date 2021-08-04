import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Row, Col } from "react-bootstrap";

import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import Category from "../screens/Category";

import {
  getCategoriesList,
  categoryFetchReset,
  deleteCategoryId,
} from "../actions/categoryActions";

const ListsCategoryScreen = ({ match, history }) => {
  const { categories, fetchStatus, deleteStatus, error } = useSelector(
    (state) => state.category
  );
  const dispatch = useDispatch();
  const { listId } = match.params;

  useEffect(() => {
    dispatch(categoryFetchReset());
    return () => {
      //dispatch(categoryFetchReset());
    };
  }, [dispatch]);

  useEffect(() => {
    if (fetchStatus === "idle") {
      dispatch(getCategoriesList(listId));
    }
  }, [dispatch, fetchStatus, listId]);

  const handleRemoveCategory = (categoryId) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteCategoryId(categoryId));
    }
  };

  const handleNewCategory = (listId) => {
    history.push(`/lists/${listId}/category/add`);
  };

  let content;
  if (fetchStatus === "loading") {
    content = <Loader />;
  } else if (fetchStatus === "failed") {
    content = <Message variant="danger">{error}</Message>;
  } else if (fetchStatus === "succeeded") {
    content = categories.map((category) => (
      <Category
        key={category._id}
        categoryId={category._id}
        name={category.name}
        desc={category.desc}
        listId={category.idList}
        handleRemoveCategory={handleRemoveCategory}
      />
    ));
  }

  return (
    <FormContainer>
      <Row>
        <Col>
          <h1>Categories</h1>
        </Col>
        <Col>
          <Button onClick={() => handleNewCategory(listId)}>
            <i className="fas fa-plus"></i> Category
          </Button>
        </Col>
      </Row>
      <Row>
        {deleteStatus === "loading" && <Loader />}
        {deleteStatus === "failed" && (
          <Message variant="danger">{error}</Message>
        )}
        {content}
      </Row>
    </FormContainer>
  );
};

export default ListsCategoryScreen;
