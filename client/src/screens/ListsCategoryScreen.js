import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Container, Row, Col } from "react-bootstrap";

import Message from "../components/Message";
import Loader from "../components/Loader";
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

  /**
   * 
   *       <Row>
        <Col>
          <h1>Categories</h1>
        </Col>
        <Col>
          <Button onClick={() => handleNewCategory(listId)}>
            <i className="fas fa-plus"></i> Category
          </Button>
        </Col>
      </Row>
   * 
   * 
   */

  return (
    <Container>
      <Row className="border-bottom pb-3">
        <Col className="d-flex justify-content-between ">
          <h3>Category Details</h3>
          <Button onClick={() => handleNewCategory(listId)}>
            <i className="fas fa-plus"></i> New Category
          </Button>
        </Col>
      </Row>
      <Row>
        <Col className="d-inline-flex justify-content-center">
          {deleteStatus === "loading" && <Loader />}
          {deleteStatus === "failed" && (
            <Message variant="danger">{error}</Message>
          )}
        </Col>
      </Row>
      <Row>
        <Col className="list-detail">{content}</Col>
      </Row>
    </Container>
  );
};

export default ListsCategoryScreen;
