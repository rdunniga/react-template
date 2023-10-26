import React, { useContext } from 'react';
import { UserContext } from '../../../context/UserContext';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import 'bootstrap/dist/css/bootstrap.min.css';

function LoginStatus() {
  const { userContext } = useContext(UserContext);

  return (
    <Container>
      <Row className="float-end">
        <Col className="float-end">
        {userContext?.validCredentials ? "Logged In" : "Logged Out"}
        </Col>
      </Row>
    </Container>
  )
}

export default LoginStatus;