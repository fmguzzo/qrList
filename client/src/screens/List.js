import "./card.css";
import React from "react";
import { Button, Card } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const List = ({ _id, name, desc, active, handleRemoveList }) => {
  const history = useHistory();
  const title = active ? "- Active -" : "- No Active -";
  return (
    <Card className="card">
      <Card.Header className="card-title"> {title}</Card.Header>
      <Card.Body className="card-detail">
        <p className="card-detail-name"> {name}</p>
        <p> {desc} </p>
      </Card.Body>
      <Card.Footer>
        <div className="card-button-crud">
          <Button
            variant="outline-primary mb-2"
            onClick={() => history.push(`/lists/edit/${_id}`)}
          >
            <i className="fas fa-edit"> </i> Edit
          </Button>{" "}
          <Button
            variant="outline-danger mb-2"
            onClick={() => handleRemoveList(_id)}
          >
            <i className="fas fa-trash"> </i> Delete
          </Button>
        </div>
        <div className="card-button-fetch">
          <Button
            variant="secondary"
            onClick={() => history.push(`/lists/${_id}/category`)}
          >
            <i className="fas fa-list"> </i> Category
          </Button>
        </div>
      </Card.Footer>
    </Card>
  );
};

export default List;
