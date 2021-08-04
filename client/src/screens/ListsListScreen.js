import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListList, deleteList } from "../actions/listActions";

import { Button, Row, Col } from "react-bootstrap";

import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
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
    <FormContainer>
      <Row>
        <Col>
          <h1>List</h1>
        </Col>
        <Col>
          <Button onClick={handleNewList}>
            <i className="fas fa-plus"></i> Create List
          </Button>
        </Col>
      </Row>
      <Row>
        {loadingDelete && <Loader />}
        {errorDelete && <Message variant="danger">{errorDelete}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          lists.map((list) => (
            <List
              key={list._id}
              {...list}
              handleRemoveList={handleRemoveList}
            />
          ))
        )}
      </Row>
    </FormContainer>
  );
};

export default ListsListScreen;
