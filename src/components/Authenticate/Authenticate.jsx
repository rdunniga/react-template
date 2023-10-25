import React, { useContext, useEffect, useState } from 'react';
//import { Link, Navigate, useNavigate } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import { UserContext } from '../../context/UserContext';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import 'bootstrap/dist/css/bootstrap.min.css';
import { apiEndPointAuthenticate, httpResponseStatusCode } from '../../utils/apiEndpoint';

const Authenticate = ({ }) => {
  const { fetchRequest, fetchRequestBody, fetchReceived, fetchHeader, fetchLoading, fetchError, fetchStatus, fetchUrl
  } = useFetch({url: apiEndPointAuthenticate, method: "POST" });
  const { userContext, setUserContext } = useContext(UserContext);

  useEffect(() => {
    console.log('userContext', userContext);
  }, [userContext]);

  useEffect(() => {
    //console.log('Example userId', userId);
    //console.log('Example', dataFetched, fetchHeader, fetchLoading, fetchError);
    console.log('fetch', fetchLoading, fetchHeader, fetchReceived, fetchError);
    if (fetchLoading) { return; }
    if (fetchError) {
      if (fetchError === httpResponseStatusCode.unauthorized) {
        alert("not authorized");
        return;
      }
    }
    setUserContext(fetchReceived);
  }, [ fetchReceived, fetchHeader, fetchLoading, fetchError ]);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onAuthenticate = (e) => {
    e.preventDefault();
    if ((! username) || (! password)) { return;}
    console.log('onAuthenticate', username, password, e);
    fetchRequestBody({body: {username, password}});
  };

  const onHandleChange = (e) => {

  };

  return (
    <>
      {/* <div className="mt-5 mb-5">
        <Form>
          <Form.Group>
            <Form.Floating className="mb-3">
              <Form.Control id="username1" type="text" placeholder="Windows Username" required />
              <label htmlFor="username1">Username</label>
            </Form.Floating>
          </Form.Group>
          <Form.Group>
            <Form.Floating>
              <Form.Control id="password1" type="password" placeholder="Password" required />
              <label htmlFor="password1">Password</label>
            </Form.Floating>
          </Form.Group>
          <Button variant="primary" type="submit">Submit</Button>
        </Form>
      </div> */}

      {/* <div className="mt-5 mb-5">
        <Form>
          <Form.Group controlId="username2">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="username" required />
          </Form.Group>
          <Form.Group controlId="password2">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="password" required />
          </Form.Group>
          <Button variant="primary" type="submit">Submit</Button>
        </Form>
      </div> */}

      {/* <Container className="mt-5 mb-5">
        <Form>
          <Form.Group controlId="username3">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="username" required />
          </Form.Group>
          <Form.Group controlId="password3">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="password" required />
          </Form.Group>
          <Button variant="primary" type="submit">Submit</Button>
        </Form>
      </Container> */}

      <Container className="mt-5 mb-5">
        <Form>
          <Row>
            <Col md>
              <Form.Group controlId="username4">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" value={username} placeholder="username" required onChange={(e) => setUsername(e.target.value)} />
              </Form.Group>
            </Col>
            <Col md>
              <Form.Group controlId="password4">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" value={password} placeholder="password" required onChange={(e) => setPassword(e.target.value)} />
              </Form.Group>
            </Col>
          </Row>
          <Button variant="primary" type="submit" onClick={(e) =>onAuthenticate(e)}>Submit</Button>
        </Form>
      </Container>
    </>
  );
}

export default Authenticate;