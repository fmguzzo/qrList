import React from "react";
import { useDispatch } from "react-redux";
import { Button, Media } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { itemCrud } from "../actions/itemActions";

const Item = ({
  categoryId,
  itemId,
  name,
  desc,
  image,
  price,
  handleRemoveItem,
}) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleOnClick = (itemId) => {
    dispatch(itemCrud.currentItem({ itemId }));
  };
  return (
    /*
    <Card style={{ width: "15rem" }}>
      <Card.Img variant="top" src={image} />
      <Card.Body>
        <Card.Title>{itemId}</Card.Title>
        <Card.Text>
          <div>{categoryId}</div>
          <div>{name}</div>
          <div>{desc}</div>
          <div>{price}</div>
        </Card.Text>
        <Button
          variant="danger"
          onClick={() => handleRemoveItem(categoryId, itemId)}
        >
          Delete
        </Button>{" "}
        <Button
          variant="primary"
          onClick={() =>
            history.push(`/category/${categoryId}/item/${itemId}/edit`)
          }
        >
          Edit
        </Button>
      </Card.Body>
    </Card>
    */

    <Media as="li" onClick={() => handleOnClick(itemId)}>
      <img width={64} height={64} className="mr-3" src={image} alt={name} />
      <Media.Body>
        <h5>{name}</h5>
        <p>{desc}</p>
        <p>{price}</p>
        <Button
          variant="danger"
          onClick={() => handleRemoveItem(categoryId, itemId)}
        >
          Delete
        </Button>{" "}
        <Button
          variant="primary"
          onClick={() =>
            history.push(`/category/${categoryId}/item/${itemId}/edit`)
          }
        >
          Edit
        </Button>
      </Media.Body>
    </Media>
  );
};

export default Item;
