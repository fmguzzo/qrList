import "./loginScreen.css";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { login } from "../actions/userActions";

const LoginScreen = ({ history }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      history.push("/lists");
    }
  }, [history, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(username, password));
  };

  return (
    <Container fluid>
      <Row className="login-back">
        <Col className="d-none d-md-block" xs={12} md={6}>
          <div className="login-left">
            <h1>QRList....</h1>
            <h2>THE BEST LIST ON WEB</h2>
            <h3>Try free for 1 month</h3>
          </div>
        </Col>
        <Col className=" login-container" xs={12} md={6}>
          <div className="login-form">
            <h4>Sign In</h4>
            <Form onSubmit={submitHandler}>
              <Form.Group className="mt-2 mb-3" controlId="username">
                <Form.Control
                  type="text"
                  placeholder="Enter user name"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group className="mb-3" controlId="password">
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Button type="submit" variant="primary" className="mb-4 w-50">
                Sign In
              </Button>
            </Form>
            <Row>
              <Col>
                New Seller? <Link to={"/register"}>Register here</Link>
              </Col>
            </Row>
          </div>
          <Row className="mt-4">
            {error && <Message variant="danger">{error}</Message>}
            {loading && <Loader />}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginScreen;
