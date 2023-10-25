import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import 'bootstrap/dist/css/bootstrap.min.css';
import useFetch from '../../../../../hooks/useFetch';
import { apiEndPointWmpPersonnalInfo } from '../../../../../utils/apiEndpoint';
import './PersonnalInfo.css';
import FetchButton from '../../../../ui/button/fetch';
import FetchStatus from '../../../../Global/FetchStatus';
import PersonnalInfoSummary from '../Summary';

function PersonnalInfo() {
  const [searchFilter, setSearchFilter] = useState('workAddress=1500 Castellano Rd.');
  const [records, setRecords] = useState([]);
  const { fetchRequest, fetchRefresh, fetchReceived, fetchHeader, fetchLoading, fetchError, fetchStatus, fetchUrl
  } = useFetch({ url: apiEndPointWmpPersonnalInfo, getAllPages: true });
  const location = useLocation();
  const navigate = useNavigate();

  const onChange = (e) => {
    if (e.target.id === 'searchFilter') {
      setSearchFilter(e.target.value);
    }
  };

  const onSubmit = (e) => {
    if (searchFilter !== '') {
      e.preventDefault();
      setRecords([]);
      const url = `${apiEndPointWmpPersonnalInfo}/?filter=${searchFilter}`;
      fetchRequest(url, true);
    }
  };

  useEffect(() => {
    // console.log('onUseEffect - fetchReceived', fetchReceived);
    // console.log('onUseEffect - fetchLoading', fetchLoading);
    // console.log('onUseEffect - fetchError', fetchError);
    // console.log('onUseEffect - fetchStatus', fetchStatus);
  }, [fetchRequest, fetchRefresh, fetchReceived, fetchHeader, fetchLoading]);

  useEffect(() => {
    if (location.state) {
      //console.log('location', location);
      setRecords(location.state.records);
      //navigate(location.pathname, { replace: true });
    }
    if (fetchReceived) {
      setRecords(fetchReceived);
    }
  }, [fetchReceived, location]);

  useEffect(() => {
    fetchError && setRecords([]);
    // console.log('onUseEffect - fetchError', fetchError);
    // console.log('onUseEffect - fetchStatus', fetchStatus);
  }, [fetchError]);

  return (
    <Container className="search-container mt-5 mb-5">
      <h2 className='title'>WMPlus Personnal Search</h2>
      <Form>
        <Row>
          <Col>
            <Row>
              <Form.Group>
                <Form.Floating className="mb-3">
                  <Form.Control size="sm" id="searchFilter" type="text" placeholder="Path" value={searchFilter} required onChange={(e) => onChange(e)} />
                  <Form.Label htmlFor="searchFilter">Search Filter</Form.Label>
                </Form.Floating>
              </Form.Group>
            </Row>
          </Col>
        </Row>

        <FetchButton fetchLoading={fetchLoading} onSubmit={onSubmit} />
      </Form>
      {
        fetchError &&
        <FetchStatus fetchStatus={fetchStatus} />
      }
      {
        records &&
        <PersonnalInfoSummary records={records} fetchLoading={fetchLoading} />
      }
    </Container>
  )
}

export default PersonnalInfo;