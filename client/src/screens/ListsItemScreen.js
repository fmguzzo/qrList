import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import PaginationView from "../components/PaginationView";
import { itemCrud } from "../actions/itemActions";
import { Container, Row, Col, Button } from "react-bootstrap";
import Item from "../screens/Item";

const ListsItemScreen = ({ history, match }) => {
  const { categoryId } = match.params;
  const dispatch = useDispatch();
  const [currentPage, setcurrentPage] = useState(1);
  const [limitPage, setLimitPage] = useState(3);
  const { result, isLoading, isSuccess } = useSelector(
    (state) => state.item.list
  );

  useEffect(() => {
    dispatch(itemCrud.list(categoryId, currentPage, limitPage));
  }, [dispatch, categoryId, currentPage, limitPage]);

  const handleRemoveItem = (categoryId, itemId) => {
    if (window.confirm("Are you sure?")) {
      dispatch(itemCrud.currentAction("delete", { itemId }));
      dispatch(itemCrud.delete(categoryId, itemId));
    }
  };

  const handleNewItem = (categoryId) => {
    history.push(`/category/${categoryId}/item/add`);
  };

  const handlePaginate = (activeItem) => {
    setcurrentPage(activeItem);
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1>Items</h1>
        </Col>
        <Col>
          <Button onClick={() => handleNewItem(categoryId)}>
            <i className="fas fa-plus"></i> Item
          </Button>
        </Col>
      </Row>
      <Row>
        {isLoading ? (
          <Loader />
        ) : isSuccess ? (
          <Row>
            <ul className="list-unstyled">
              {result.items.map((item) => (
                <Item
                  key={item._id}
                  categoryId={categoryId}
                  itemId={item._id}
                  name={item.name}
                  desc={item.desc}
                  image={item.image}
                  price={item.price}
                  handleRemoveItem={handleRemoveItem}
                />
              ))}
            </ul>
            <PaginationView
              current={result.pagination.current}
              pageSize={result.pagination.pageSize}
              total={result.pagination.total}
              handlePaginate={handlePaginate}
            />
          </Row>
        ) : (
          <div>Empty</div>
        )}
      </Row>
    </Container>
  );
};

export default ListsItemScreen;
