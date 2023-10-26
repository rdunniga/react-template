import React, { useContext, useEffect, useState } from 'react';
import useFetch from '../../../../hooks/useFetch';
import { UserContext } from '../../../../context/UserContext';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import 'bootstrap/dist/css/bootstrap.min.css';
import { apiEndPointAuthenticate, httpResponseStatusCode } from '../../../../utils/apiEndpoint';

const Authenticate = ({ }) => {
  const { fetchRequest, fetchRequestBody, fetchReceived, fetchHeader, fetchLoading, fetchError, fetchStatus, fetchUrl
  } = useFetch({ url: apiEndPointAuthenticate, method: "POST" });
  const { userContext, setUserContext } = useContext(UserContext);

  useEffect(() => {
  }, [userContext]);

  useEffect(() => {
    if (fetchLoading) { return; }
    if (fetchError) {
      if (fetchError === httpResponseStatusCode.unauthorized) {
        return;
      }
    }
    setUserContext(fetchReceived);
    setUsername('');
    setPassword('');
    setTokenExpiresAfter('');
  }, [fetchReceived, fetchHeader, fetchLoading, fetchError]);

  useEffect(() => {

  }, [fetchError]);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [tokenExpiresAfter, setTokenExpiresAfter] = useState('');

  const onAuthenticate = (e) => {
    if (username && password) {
      e.preventDefault();
      if ((!username) || (!password)) { return; }
      fetchRequestBody({ body: { username, password, tokenExpiresAfter } });
    }
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
            <Col md>
              <Form.Group controlId="tokenExpiresAfter4">
                <Form.Label>Token Expires After</Form.Label>
                <Form.Control type="number" value={tokenExpiresAfter} placeholder="604800" onChange={(e) => setTokenExpiresAfter(e.target.value)} />
              </Form.Group>
            </Col>
          </Row>
          <Button className="mt-3" variant="primary" type="submit" disabled={fetchLoading} onClick={(e) => onAuthenticate(e)}>Submit</Button>
        </Form>
        {
          fetchError && fetchStatus &&
          <Container className="mt-3">
            {fetchStatus === httpResponseStatusCode.unauthorized ? "Not Authorized" : fetchStatus}
          </Container>
        }
      </Container>
    </>
  );
}

export default Authenticate;