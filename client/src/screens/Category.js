import React from "react";

import { Button, Card } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const Category = ({ categoryId, name, desc, listId, handleRemoveCategory }) => {
  const history = useHistory();
  return (
    <Card style={{ width: "15rem" }} className="category">
      <Card.Body>
        <Card.Title className="category-title">{categoryId}</Card.Title>
        <div className="category-details">
          <div>Name: {name}</div>
          <div>Description: {desc} </div>
        </div>
        <Button
          variant="primary"
          onClick={() =>
            history.push(`/lists/${listId}/category/${categoryId}/edit`)
          }
        >
          Edit
        </Button>{" "}
        <Button
          variant="danger"
          onClick={() => handleRemoveCategory(categoryId)}
        >
          Delete
        </Button>{" "}
        <Button
          variant="warning"
          onClick={() => history.push(`/category/${categoryId}/item`)}
        >
          Products
        </Button>
      </Card.Body>
    </Card>
  );
};

export default Category;
