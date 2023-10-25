import React from 'react';
import Container from 'react-bootstrap/Container';
import GetData from '../components/GetData';
import Example from '../components/Example';
//import UserContextDump from '../components/UserContextDump';
import { apiEndPointRmsTiburonSsctab, httpResponseStatusCode } from '../utils/apiEndpoint';

function Home() {
  return (
    <>
      <div className="xhome">
        <h1>Home</h1>
      </div>
      <Container fluid="md" style={{maxHeight:'5%'}}>
        {/* <UserContextDump /> */}
      </Container>
      <Container fluid="md">
        <GetData url={apiEndPointRmsTiburonSsctab + '/n*'} />
      </Container>
      <Container fluid="md">
        <Example />
      </Container>
    </>
  )
}

export default Home;