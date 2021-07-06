import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import ListFormScreen from "../screens/ListFormScreen";
import { updateListDetails } from "../actions/listActions";
import Message from "../components/Message";
import Loader from "../components/Loader";

const EditListScreen = ({ history }) => {
  const listList = useSelector((state) => state.listList);
  const { lists } = listList;

  const listUpdate = useSelector((state) => state.listUpdate);
  const {
    loading: loadingUpdate,
    success: successUpdate,
    error: errorUpdate,
  } = listUpdate;

  const { listId } = useParams();
  const listToEdit = lists.find((list) => list._id === listId);

  const dispatch = useDispatch();

  useEffect(() => {
    if (successUpdate) {
      history.push("/lists");
    }
  }, [history, successUpdate]);

  const handleOnSubmit = (list) => {
    dispatch(updateListDetails(listId, { ...list }));
  };

  return (
    <div>
      {loadingUpdate && <Loader />}
      {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
      <ListFormScreen list={listToEdit} handleOnSubmit={handleOnSubmit} />
    </div>
  );
};

export default EditListScreen;
