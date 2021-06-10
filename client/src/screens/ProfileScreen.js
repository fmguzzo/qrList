import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Row, Col } from "react-bootstrap";

import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";

import { getSiteDetails, updateSiteProfile } from "../actions/siteActions";

const ProfileScreen = ({ history }) => {
  const [business, setBusiness] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const siteDetail = useSelector((state) => state.siteDetail);
  const { loading, site, error } = siteDetail;

  const siteUpdate = useSelector((state) => state.siteUpdate);
  const { success } = siteUpdate;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!site) {
        dispatch(getSiteDetails());
      } else {
        setBusiness(site.business);
        setAddress(site.siteAddress.address);
        setCity(site.siteAddress.city);
        setPostalCode(site.siteAddress.postalCode);
        setPhone(site.phone);
        setEmail(site.email);
      }
    }
  }, [dispatch, history, userInfo, site]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateSiteProfile({
        business,
        siteAddress: { address, city, postalCode },
        phone,
        email,
      })
    );
  };

  return (
    <FormContainer>
      <Row>
        <Col md={4}>
          <h2>User Profile</h2>
          {message && <Message variant="danger">{message}</Message>}
          {}
          {success && <Message variant="success">Profile Updated</Message>}
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="business">
                <Form.Label>Business</Form.Label>
                <Form.Control
                  type="name"
                  placeholder="Enter business name"
                  value={business}
                  onChange={(e) => setBusiness(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="address">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="city">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="postalCode">
                <Form.Label>Postal Code</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter postal code"
                  value={postalCode}
                  required
                  onChange={(e) => setPostalCode(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="phone">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="phone"
                  placeholder="Enter phone"
                  value={phone}
                  required
                  onChange={(e) => setPhone(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Button type="submit" variant="primary">
                Update
              </Button>
            </Form>
          )}
        </Col>
      </Row>
    </FormContainer>
  );
};

export default ProfileScreen;
