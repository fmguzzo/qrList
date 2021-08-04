import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import { API_BASE_URL } from "../config/serverApiConfig";
import storePersist from "../storePersist";

const userInfo = storePersist.get("userInfo");
const token = userInfo ? userInfo.token : "";

const ItemFormScreen = (props) => {
  const { categoryId } = useParams();

  const [item, setItem] = useState(() => {
    return {
      name: props.item ? props.item.name : "",
      desc: props.item ? props.item.desc : "",
      image: props.item ? props.item.image : "",
      price: props.item ? props.item.price : "",
    };
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const { name, desc, image, price } = item;

  const handleOnSubmit = (event) => {
    event.preventDefault();
    const values = [name, desc, image, price];
    let errorMsg = "";

    const allFieldsFilled = values.every((field) => {
      const value = `${field}`.trim();
      return value !== "" && value !== "0";
    });

    if (allFieldsFilled) {
      const item = {
        categoryId,
        itemId: props.item ? props.item._id : null,
        name,
        desc,
        image,
        price,
      };
      props.handleOnSubmit(item);
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
          setItem((prevState) => ({
            ...prevState,
            [name]: value,
          }));
        }
        break;
      default:
        setItem((prevState) => ({
          ...prevState,
          [name]: value,
        }));
    }
  };

  const handleUploadFile = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("imageFile", file);
    setIsUploading(true);

    try {
      const config = {
        baseURL: API_BASE_URL,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.post("/api/upload", formData, config);

      setItem((prevState) => ({
        ...prevState,
        image: data.result.path,
      }));

      setIsUploading(false);
    } catch (error) {
      console.error(error);
      setIsUploading(false);
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

          <Form.Group controlId="image">
            <Form.Label>Image</Form.Label>
            <Form.Control
              className="input-control"
              type="text"
              placeholder="Enter image url"
              value={image}
              onChange={handleInputChange}
            ></Form.Control>
            <Form.File
              id="imageFile"
              custom
              onChange={handleUploadFile}
            ></Form.File>
            {isUploading && <Loader />}
          </Form.Group>

          <Form.Group controlId="price">
            <Form.Label>Price</Form.Label>
            <Form.Control
              className="input-control"
              type="number"
              name="price"
              value={price}
              placeholder="Enter unit price"
              onChange={handleInputChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="submit-btn">
            {props.item ? "Update" : "Create"}
          </Button>
        </Form>
      </div>
    </FormContainer>
  );
};

export default ItemFormScreen;
