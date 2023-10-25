import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import useFetch from '../../../../../hooks/useFetch';
import { apiEndPointWmpPersonnalInfo, httpResponseStatusCode } from '../../../../../utils/apiEndpoint';
import './PersonnalInfoDetail.css';
import FetchButton from '../../../../ui/button/fetch';
import GlobalSpinner from '../../../../Global/Spinner';
import PersonnalInfoSummary from '../Summary';

function PersonnalInfoDetail() {
  const { id } = useParams();
  const { fetchRequest, fetchRefresh, fetchReceived, fetchHeader, fetchLoading, fetchError, fetchStatus, fetchUrl
  } = useFetch({ url: apiEndPointWmpPersonnalInfo, getAllPages: true });
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const url = `${apiEndPointWmpPersonnalInfo}/?filter=ppms_id=${id}`;
    fetchRequest(url, true);
  }, []);

  useEffect(() => {
    //console.log('onUseEffect', fetchReceived);
  }, [fetchRequest, fetchRefresh, fetchReceived, fetchHeader, fetchLoading, fetchError]);

  if (fetchLoading === true) { return (<div>Loading...</div>) }
  if (fetchError) { return (<div>Fetch failed</div>) }
  if (!fetchReceived) { return (<></>) }

  return (
    <Container>
      <h2 className='title'>Personnal Detail</h2>
      <Container className="mt-3" style={{ height: '500px', overflowY: 'auto' }}>
        {
          Object.keys(fetchReceived[0]).sort().map((x, index) => {
            return (
              <Row size="sm" key={index}>
                <Col className="border text-truncate">{x}</Col>
                <Col className="border text-truncate">{fetchReceived[0][x]}</Col>
              </Row>
            )
          })
        }
      </Container>
      <Button className="mt-3" size="sm" type="button" onClick={(e) => navigate('/wmppersonnalinfo', {state: location.state})}>Back</Button>
    </Container>
  )
}

export default PersonnalInfoDetail;