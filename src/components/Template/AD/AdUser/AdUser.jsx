import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import useFetch from '../../../../hooks/useFetch';
import { apiEndPointAdUser, httpResponseStatusCode } from '../../../../utils/apiEndpoint';
import './AdUser.css';
import GlobalSpinner from '../../../Global/Spinner';
// await new Promise((resolve) => setTimeout(resolve, 1000));

function AdUser() {
  const [username, setUsername] = useState('');
  const [sheriffId, setSheriffId] = useState('');
  const { fetchRequest, fetchRefresh, fetchReceived, fetchHeader, fetchLoading, fetchError, fetchStatus, fetchUrl
  } = useFetch({ url: apiEndPointAdUser, getAllPages: false });

  const onChange = (e) => {
    if (e.target.id === 'username') {
      setUsername(e.target.value);
      setSheriffId('');
    } else if (e.target.id === 'sheriffId') {
      setSheriffId(e.target.value);
      setUsername('');
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    fetchRequest(`${apiEndPointAdUser}/${username !== '' ? username : sheriffId}`);
  };

  // useEffect(() => {
  //   console.log('onUseEffect', fetchReceived);
  // }, [fetchReceived]);

  return (
    <>
      <Container className="search-container mt-5 mb-5">
        <h2 className='title'>AD User Summary</h2>
        <Form>
          <Row>
            <Col md>
              <Form.Group>
                <Form.Floating className="mb-3">
                  <Form.Control id="username" type="text" placeholder="Username" value={username} onChange={(e) => onChange(e)} />
                  <label htmlFor="username">Username</label>
                </Form.Floating>
              </Form.Group>
            </Col>
            <Col md>
              <Form.Group>
                <Form.Floating className="mb-3">
                  <Form.Control id="sheriffId" type="text" placeholder="SheriffId ID" value={sheriffId} onChange={(e) => onChange(e)} />
                  <label htmlFor="sheriffId">Sheriff ID</label>
                </Form.Floating>
              </Form.Group>
            </Col>
          </Row>
          {fetchLoading
            ? <GlobalSpinner msg="loading..." />
            : <Button variant="primary" type="submit" disabled={fetchLoading} onClick={(e) => onSubmit(e)}>Submit</Button>
          }
        </Form>
      </Container>

      <Container className="detail-container mt-5 mb-5">
        {fetchLoading && <h4>fetching...</h4>}
        {fetchError &&
          <h4>fetch status: {fetchError === httpResponseStatusCode.notFound ? 'not found' : fetchError}</h4>
        }
        {fetchReceived &&
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Attribute Key</th>
                <th>Attribute Value</th>
              </tr>
            </thead>
            <tbody>
              {
                Object.keys(fetchReceived).sort().map((x, i) => {
                  const attributeKey = x.match(/^aw|^wm/) ? `${x} - Workforce Management` : x;
                  const attributeValue = typeof(fetchReceived[x]) === 'boolean'
                    ? fetchReceived[x] === true ? 'True' : 'False'
                    : fetchReceived[x];
                  return (<tr key={i}><td>{attributeKey}</td><td>{attributeValue}</td></tr>);
                })
              }
            </tbody>
          </Table>
        }
      </Container>
    </>

  )
}

export default AdUser;