import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import FormContainer from "../components/FormContainer";

const ListFormScreen = (props) => {
  const [list, setList] = useState(() => {
    return {
      name: props.list ? props.list.name : "",
      desc: props.list ? props.list.desc : "",
    };
  });

  const [errorMsg, setErrorMsg] = useState("");
  const { name, desc } = list;

  const handleOnSubmit = (event) => {
    event.preventDefault();
    const values = [name, desc];
    let errorMsg = "";

    const allFieldsFilled = values.every((field) => {
      const value = `${field}`.trim();
      return value !== "" && value !== "0";
    });

    if (allFieldsFilled) {
      const list = {
        name,
        desc,
      };
      props.handleOnSubmit(list);
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
          setList((prevState) => ({
            ...prevState,
            [name]: value,
          }));
        }
        break;
      default:
        setList((prevState) => ({
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
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              className="input-control"
              type="text"
              name="name"
              value={name}
              placeholder="Enter name"
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="desc">
            <Form.Label>Description</Form.Label>
            <Form.Control
              className="input-control"
              type="text"
              name="desc"
              value={desc}
              placeholder="Enter description"
              onChange={handleInputChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="submit-btn">
            {props.list ? "Update" : "Create"}
          </Button>
        </Form>
      </div>
    </FormContainer>
  );
};

export default ListFormScreen;
