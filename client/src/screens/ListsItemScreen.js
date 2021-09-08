import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
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
      <Row className="border-bottom pb-3">
        <Col className="d-flex justify-content-between ">
          <h3>Items Details</h3>
          <Button onClick={() => handleNewItem(categoryId)}>
            <i className="fas fa-plus"></i> Item
          </Button>
        </Col>
      </Row>
      {isLoading ? (
        <Row>
          <Col className="d-inline-flex justify-content-center">
            <Loader />
          </Col>
        </Row>
      ) : isSuccess ? (
        <>
          <Row>
            <Col className="item-detail border mb-auto">
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
            </Col>
          </Row>
          <Row>
            <Col className="d-inline-flex justify-content-center">
              <PaginationView
                current={result.pagination.current}
                pageSize={result.pagination.pageSize}
                total={result.pagination.total}
                handlePaginate={handlePaginate}
              />
            </Col>
          </Row>
        </>
      ) : (
        <div>Empty</div>
      )}
    </Container>
  );
};

export default ListsItemScreen;
