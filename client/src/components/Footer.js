import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col className="text-center bottom py-3">
            Copyright &copy; Fernando Guzzo
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
