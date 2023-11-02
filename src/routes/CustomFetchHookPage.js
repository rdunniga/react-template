import React from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import FetchHook from '../components/Template/FetchHook';
import { apiEndPointRmsTiburonSsctab, apiEndPointRedsAudits, apiEndPointWmpPersonnalInfo }
  from '../utils/apiEndpoint';

function CustomFetchPage() {
  return (
    <>
      <h2 className='title'>Custom Fetch Hook</h2>
      <Container>
        <Row>
        <FetchHook url={apiEndPointRmsTiburonSsctab + '/n*'} />
        </Row>
        <Row>
        <FetchHook url={`${apiEndPointWmpPersonnalInfo}?filter=workAddress=1500 Castellano Rd.`} />
        </Row>
        <Row>
        <FetchHook url={apiEndPointRedsAudits} />
        </Row>
      </Container>
    </>
  )
}

export default CustomFetchPage;