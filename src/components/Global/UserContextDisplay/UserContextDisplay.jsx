import React, { useContext, useEffect } from 'react';
import { UserContext } from '../../../context/UserContext';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import 'bootstrap/dist/css/bootstrap.min.css';

const UserContextDisplay = ({ }) => {
  const { userContext } = useContext(UserContext);

  useEffect(() => {

  });

  return (
    <Container className="border" style={{ height: '350px', overflowY: 'auto' }}>
      {!userContext?.validCredentials && <h2>Not Logged On</h2>}
      {
        userContext?.validCredentials &&
        Object.keys(userContext).sort().map((x, i) => {
          const attributeKey = x.match(/^aw|^wm/) ? `${x} - WMPlus` : x;
          const attributeValue = typeof (userContext[x]) === 'boolean'
            ? userContext[x] === true ? 'True' : 'False'
            : userContext[x];
          return (
            <Row key={i}>
              <Col>{attributeKey}</Col>
              <Col className="text-truncate" size="xs">{attributeValue}</Col>
            </Row>
          )
        })
      }
    </Container>
  )
}

export default UserContextDisplay;