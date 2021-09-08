import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import FormContainer from "../components/FormContainer";

const CategoryFormScreen = (props) => {
  const { listId } = useParams();

  const [category, setCategory] = useState(() => {
    return {
      name: props.category ? props.category.name : "",
      desc: props.category ? props.category.desc : "",
    };
  });

  const [errorMsg, setErrorMsg] = useState("");
  const { name, desc } = category;

  const handleOnSubmit = (event) => {
    event.preventDefault();
    const values = [name, desc];
    let errorMsg = "";

    const allFieldsFilled = values.every((field) => {
      const value = `${field}`.trim();
      return value !== "" && value !== "0";
    });

    if (allFieldsFilled) {
      const category = {
        categoryId: props.category ? props.category._id : null,
        listId,
        name,
        desc,
      };
      props.handleOnSubmit(category);
    } else {
      errorMsg = "Please fill out all the fields.";
    }
    setErrorMsg(errorMsg);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "namexxx":
        if (value === "" || parseInt(value) === +value) {
          setCategory((prevState) => ({
            ...prevState,
            [name]: value,
          }));
        }
        break;
      default:
        setCategory((prevState) => ({
          ...prevState,
          [name]: value,
        }));
    }
  };

  return (
    <FormContainer>
      <div className="main-form">
        {errorMsg && <p className="errorMsg">{errorMsg}</p>}
        <Form onSubmit={handleOnSubmit}>
          <Form.Group className="control-group" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              required
              className="input-control"
              type="text"
              name="name"
              maxlength="25"
              value={name}
              placeholder="Enter name"
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className="control-group" controlId="desc">
            <Form.Label>Description</Form.Label>
            <Form.Control
              required
              className="input-control"
              type="text"
              name="desc"
              maxlength="50"
              value={desc}
              placeholder="Enter description"
              onChange={handleInputChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="submit-btn">
            {props.category ? "Update" : "Create"}
          </Button>
        </Form>
      </div>
    </FormContainer>
  );
};

export default CategoryFormScreen;
