import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createListDetails } from "../actions/listActions";

import ListFormScreen from "../screens/ListFormScreen";
import Message from "../components/Message";
import Loader from "../components/Loader";

const AddListScreen = ({ history }) => {
  const listCreate = useSelector((state) => state.listCreate);
  const { loading, success, error } = listCreate;

  const dispatch = useDispatch();

  useEffect(() => {
    if (success) {
      history.push("/lists");
    }
  }, [history, success]);

  const handleOnSubmit = (list) => {
    dispatch(createListDetails(list));
  };

  return (
    <React.Fragment>
      {loading && <Loader />}
      {error && <Message variant="danger">{error}</Message>}
      <ListFormScreen handleOnSubmit={handleOnSubmit} />
    </React.Fragment>
  );
};

export default AddListScreen;
