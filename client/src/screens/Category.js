import React from "react";

import { Button, Card } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const Category = ({ categoryId, name, desc, listId, handleRemoveCategory }) => {
  const history = useHistory();
  return (
    <Card className="card">
      <Card.Header className="card-title"> Logo </Card.Header>
      <Card.Body className="card-detail">
        <p className="card-detail-name"> {name}</p>
        <p> {desc} </p>
      </Card.Body>
      <Card.Footer>
        <div className="card-button-crud">
          <Button
            variant="outline-primary mb-2"
            onClick={() =>
              history.push(`/lists/${listId}/category/${categoryId}/edit`)
            }
          >
            <i className="fas fa-edit"> </i> Edit
          </Button>{" "}
          <Button
            variant="outline-danger mb-2"
            onClick={() => handleRemoveCategory(categoryId)}
          >
            <i className="fas fa-trash"> </i> Delete
          </Button>{" "}
        </div>
        <div className="card-button-fetch">
          <Button
            variant="secondary"
            onClick={() => history.push(`/category/${categoryId}/item`)}
          >
            <i className="fas fa-list"> </i> Products
          </Button>
        </div>
      </Card.Footer>
    </Card>
  );
};

export default Category;
