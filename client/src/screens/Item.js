import React from "react";
import { useDispatch } from "react-redux";
import { Button, Image, Media } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { itemCrud } from "../actions/itemActions";
import { API_IMAGE_URL } from "../config/serverApiConfig";
import "./item.css";

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
    */

    <div className="d-flex align-items-center item p-3">
      <div className="xflex-shrink-0">
        <Image
          width={90}
          height={90}
          src={`${API_IMAGE_URL}${image}`}
          alt={name}
        />
      </div>
      <div className="flex-grow-1 ms-3">
        <h5>{name}</h5>
        <p>{desc}</p>
        <p>{price}</p>
      </div>
      <div className="ms-auto">
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
      </div>
    </div>
  );
};

export default Item;
