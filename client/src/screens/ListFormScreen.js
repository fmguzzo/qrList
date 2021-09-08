import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import FormContainer from "../components/FormContainer";

const ListFormScreen = (props) => {
  const [list, setList] = useState(() => {
    return {
      name: props.list ? props.list.name : "",
      desc: props.list ? props.list.desc : "",
      active: props.list ? props.list.active : false,
    };
  });

  const [errorMsg, setErrorMsg] = useState("");
  const { name, desc, active } = list;

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
        active,
      };
      console.log(list);
      props.handleOnSubmit(list);
    } else {
      errorMsg = "Please fill out all the fields.";
    }
    setErrorMsg(errorMsg);
  };

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
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
          [name]: type === "checkbox" ? checked : value,
        }));
    }
  };

  return (
    <FormContainer>
      <div className="main-form ">
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
              className="input-control"
              type="text"
              name="desc"
              maxlength="50"
              value={desc}
              placeholder="Enter description"
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className="control-group" controlId="active">
            <Form.Check
              type="checkbox"
              name="active"
              checked={active}
              label="Active"
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
