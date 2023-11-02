import React, { useContext, useEffect } from 'react';
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { UserContext } from '../context/UserContext';
import useFetch from '../hooks/useFetch';
import { apiEndPointSeraRoleGroups, httpResponseStatusCode } from '../utils/apiEndpoint';

function LoginTokenPage() {
  const { userContext, Logout } = useContext(UserContext);
  const { fetchRequest, fetchRefresh, fetchReceived, fetchHeader, fetchLoading, fetchError, fetchStatus, fetchUrl
  } = useFetch({
    url: apiEndPointSeraRoleGroups,
    getAllPages: false,
    headers: { 'Authorization': `Bearer ${userContext?.token}` }
  });

  const onClick = () => {
    fetchRequest(apiEndPointSeraRoleGroups);
  };

  useEffect(() => {
    // console.log('onUseEffect fetchError', fetchError);
    // console.log('onUseEffect fetchReceived', fetchReceived);
  }, [fetchRequest, fetchRefresh, fetchReceived, fetchHeader, fetchLoading, fetchError]);

  return (
    <>
      <Container>
        <h2 className='title'>JWT Example</h2>
        <Row className="mb-4">
          {
            userContext?.token
              ? <Link onClick={() => Logout()}>Logout</Link>
              : <Link to="/login">Login</Link>
          }
        </Row>
        <Row>
          <textarea style={{ padding: "5px" }} type="textarea" rows={3} cols={80} disabled placeholder="login to obtain a token" value={userContext?.token} readOnly />
        </Row>
        <Row className="mt-4">
          <Button size="sm" className="mb-3" onClick={(() => onClick())}>Get Sera Role Group Count</Button>
        </Row>
      </Container>
      <Container>
        {fetchLoading && <h4>fetching...</h4>}
        {fetchError &&
          <h4>Fetch Response: {fetchStatus === httpResponseStatusCode.unauthorized ? '401 - Not authorized' : fetchError}</h4>
        }
        {fetchReceived && `records returned: ${fetchReceived.length}`}
      </Container>
    </>
  )
}

export default LoginTokenPage;