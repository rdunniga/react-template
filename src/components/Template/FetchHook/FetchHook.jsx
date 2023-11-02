import React, { useContext, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import useFetch from '../../../hooks/useFetch';
import { UserContext } from '../../../context/UserContext';
import './FetchHook.css';

const FetchHook = ({
  url = '',
  getAllPages = true,
}) => {
  const { fetchRequest, fetchRefresh, fetchReceived, fetchHeader, fetchLoading, fetchError, fetchStatus, fetchUrl
  } = useFetch({url: url, getAllPages: getAllPages });
  const { userContext } = useContext(UserContext);

  useEffect(() => {
    //if ((! userContext) || (! userContext.validCredentials)) { navigate('/login'); }
    fetchRequest(fetchUrl);
  }, [fetchUrl]);

  useEffect(() => {
    //console.log('FetchHook', fetchReceived?.length, fetchHeader, fetchLoading, fetchError);
  }, [ fetchReceived, fetchHeader, fetchLoading, fetchError ]);

  return (
    <Container className="mb-2 container__fetchhook">
    <Card className="card__fetchhook">
      <Card.Body className="card-body__fetchhook">
        <Card.Title className="card-title__fetchhook">Endpoint -- {fetchUrl}</Card.Title>
        <Card.Text className="card-text__fetchhook" style={{ color: fetchLoading ? "#ff0000" : "#00b000"}}>fetch -- {fetchLoading ? "active": "complete"}</Card.Text>
        <Card.Text className="card-text__fetchhook">fetch status {fetchStatus}</Card.Text>
        <Card.Text className="card-text__fetchhook">record count {fetchReceived?.length}</Card.Text>
        <Card.Text className="card-text__fetchhook">fetch error {fetchError}</Card.Text>
      </Card.Body>
    </Card>
    </Container>
  )
}

export default FetchHook;