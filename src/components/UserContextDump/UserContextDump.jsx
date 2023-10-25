import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import 'bootstrap/dist/css/bootstrap.min.css';

const UserContextDump = ({ }) => {
  const { userContext } = useContext(UserContext);

  useEffect(() => {

  });

  console.log('userContext', userContext);
  return (
    <Container className="border">
      {!userContext?.validCredentials && <h2>Not Logged On</h2>}
      {
        userContext?.validCredentials &&
        Object.keys(userContext).sort().map((x, i) => {
          return (
            <div key={i}>
            {/* <div key={i}>{x}: {userContext[x]}</div> */}
            <Row key={i}>
              <Col xs={4}>{x}</Col>
              <Col className="border text-truncate" style={{width:'45%'}} xs={8}>{userContext[x]}</Col>
            </Row>
            </div>
          )
        })
      }
    </Container>
  )
}

export default UserContextDump;