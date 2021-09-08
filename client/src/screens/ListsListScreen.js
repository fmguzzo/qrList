import "./listsListScreen.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListList, deleteList } from "../actions/listActions";

import { Container, Button, Row, Col } from "react-bootstrap";

import Message from "../components/Message";
import Loader from "../components/Loader";
import List from "../screens/List";

import * as actionTypes from "../constants/listConstants";

const ListsListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const listList = useSelector((state) => state.listList);
  const { loading, lists, error } = listList;

  const listDelete = useSelector((state) => state.listDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = listDelete;

  useEffect(() => {
    dispatch({ type: actionTypes.LIST_DELETE_RESET });
    dispatch({ type: actionTypes.LIST_UPDATE_RESET });
    dispatch({ type: actionTypes.LIST_CREATE_RESET });
    dispatch(getListList());
  }, [dispatch, history, successDelete]);

  const handleRemoveList = (listId) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteList(listId));
    }
  };

  const handleNewList = () => {
    history.push("/lists/add");
  };

  return (
    <Container>
      <Row className="border-bottom pb-3">
        <Col className="d-flex justify-content-between ">
          <h3>List Details</h3>
          <Button onClick={handleNewList}>
            <i className="fas fa-plus"></i> New List
          </Button>
        </Col>
      </Row>
      <Row>
        <Col className="d-inline-flex justify-content-center">
          {loadingDelete && <Loader />}
          {errorDelete && <Message variant="danger">{errorDelete}</Message>}
        </Col>
      </Row>
      <Row>
        <Col className="list-detail">
          {loading ? (
            <Loader />
          ) : error ? (
            <div className="d-flex justify-content-center w-100">
              <Message variant="danger">{error}</Message>
            </div>
          ) : (
            lists.map((list) => (
              <List
                key={list._id}
                {...list}
                handleRemoveList={handleRemoveList}
              />
            ))
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ListsListScreen;
