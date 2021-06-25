import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListDetails, updateListDetails } from "../actions/listActions";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";

function ListEditScreen({ match, history }) {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [active, setActive] = useState(false);

  const listDetails = useSelector((state) => state.listDetails);
  const { loading, list, error } = listDetails;

  const listUpdate = useSelector((state) => state.listUpdate);
  const { success } = listUpdate;

  const dispatch = useDispatch();

  const listId = match.params.listId;

  useEffect(() => {
    if (!list.name || list._id !== listId) {
      dispatch(getListDetails(listId));
    } else {
      setName(list.name);
      setDesc(list.desc);
      setActive(list.active);
    }
  }, [dispatch, list, listId]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateListDetails(listId, {
        name,
        desc,
        active,
      })
    );
  };

  return (
    <>
      <Link to="/list" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit List</h1>
        {success && <Message variant="success">Profile Updated</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="desc">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter description"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="active">
              <Form.Label>Active</Form.Label>
              <Form.Check
                type="checkbox"
                value={active}
                onChange={(e) => setActive(e.target.value)}
              ></Form.Check>
            </Form.Group>

            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
}

export default ListEditScreen;
