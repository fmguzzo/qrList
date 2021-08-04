import React from "react";
import Pagination from "react-bootstrap/Pagination";

const PaginationView = ({ current, pageSize, total, handlePaginate }) => {
  let items = [];
  for (let number = 1; number <= pageSize; number += 1) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === current}
        onClick={() => handlePaginate(number)}
      >
        {number}
      </Pagination.Item>
    );
  }
  return <Pagination>{items}</Pagination>;
};

export default PaginationView;
