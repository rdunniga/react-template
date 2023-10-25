import React from 'react';
import Container from 'react-bootstrap/Container';
import { httpResponseStatusCode } from '../../../utils/apiEndpoint';

function FetchStatus(prop) {
  return (
    <Container className="mt-3">
      <h4>Fetch Status:
        {prop.fetchStatus === httpResponseStatusCode.ok && <span>ok</span>}
        {prop.fetchStatus === httpResponseStatusCode.created && <span>created</span>}
        {prop.fetchStatus === httpResponseStatusCode.badRequest && <span>bad request</span>}
        {prop.fetchStatus === httpResponseStatusCode.unauthorized && <span>unauthorized</span>}
        {prop.fetchStatus === httpResponseStatusCode.forbidden && <span>forbidden</span>}
        {prop.fetchStatus === httpResponseStatusCode.notFound && <span>not found</span>}
        {prop.fetchStatus === httpResponseStatusCode.internalServerError && <span>internal server error</span>}
      </h4>
    </Container>
  )
}

export default FetchStatus;