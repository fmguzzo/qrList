import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListList, deleteList } from "../actions/listActions";

import { Table, Button, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";

import * as actionTypes from "../constants/listConstants";

const ListScreen = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const listList = useSelector((state) => state.listList);
  const { loading, lists, error } = listList;

  const listDelete = useSelector((state) => state.listDelete);
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = listDelete;

  const listUpdate = useSelector((state) => state.listUpdate);
  const { success: successUpdate } = listUpdate;

  useEffect(() => {
    if (lists.length === 0 || successDelete || successUpdate) {
      dispatch({ type: actionTypes.LIST_DELETE_RESET });
      dispatch({ type: actionTypes.LIST_UPDATE_RESET });
      dispatch(getListList());
    }
  }, [dispatch, lists, successDelete, successUpdate]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteList(id));
    }
  };

  const createHandler = () => {
    console.log("Create new list");
  };

  return (
    <FormContainer>
      <Row>
        <Col>
          <h1>List</h1>
        </Col>
        <Col>
          <Button onClick={createHandler}>
            <i className="fas fa-plus"></i> Create List
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>NAME</th>
              <th>DESC</th>
              <th>ACTIVE</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {lists.map((list) => (
              <tr key={list._id}>
                <td>{list.name}</td>
                <td>{list.desc}</td>
                <td>{list.active}</td>
                <td>
                  <LinkContainer to={`/list/${list._id}`}>
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(list._id)}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </FormContainer>
  );
};

export default ListScreen;
