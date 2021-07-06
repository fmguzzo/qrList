import React from "react";
import { Button, Card } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const List = ({ _id, name, desc, active, handleRemoveList }) => {
  const history = useHistory();
  return (
    <Card style={{ width: "12rem" }} className="list">
      <Card.Body>
        <Card.Title className="list-title">{_id}</Card.Title>
        <div className="list-details">
          <div>Name: {name}</div>
          <div>Description: {desc} </div>
          <div>Active: {active} </div>
        </div>
        <Button
          variant="primary"
          onClick={() => history.push(`/lists/edit/${_id}`)}
        >
          Edit
        </Button>{" "}
        <Button variant="danger" onClick={() => handleRemoveList(_id)}>
          Delete
        </Button>
      </Card.Body>
    </Card>
  );
};

export default List;
