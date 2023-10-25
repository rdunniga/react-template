import React from 'react';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import { httpResponseStatusCode } from '../../../../utils/apiEndpoint';
import './AdSearchDetail.css';
import GlobalSpinner from '../../../Global/Spinner';

function AdSearchDetail(prop) {
  const fetchError = prop?.fetchError;
  const fetchLoading = prop?.fetchLoading;
  const fetchReceived = prop?.fetchReceived;

  console.log('AdSearchDetail prop', prop);
  return (
    <Container className="detail-container mt-5 mb-5">
      {fetchLoading && <h4>{prop?.fetchMessage}</h4>}
      {fetchError &&
        <h4>fetch status: {fetchError === httpResponseStatusCode.notFound ? 'not found' : fetchError}</h4>
      }
      {
        fetchReceived &&
        fetchReceived.map((x, index) => {
          return (
            <Container key={index}>
              <h5 className='title'>AD Search Result</h5>
              <Table className="mb-5" size="sm" responsive="sm">
                <tbody>
                  <tr><td style={{ fontWeight: 'bold' }} colSpan={3}>PATH - {x.path}</td></tr>
                  {
                    x.attributeSet &&
                    x.attributeSet
                      .sort((a, b) => {
                        if (a.attributeName < b.attributeName) { return -1; }
                        if (a.attributeName > b.attributeName) { return 1; }
                        return 0;
                      })
                      .map((x, index2) => {
                        return (
                          <tr key={index2}><td></td><td>{x.attributeName}</td><td>{x.attributeValues}</td></tr>
                        )
                      })
                  }
                </tbody>
              </Table>
            </Container>
          )
        })
      }
    </Container>
  )
}

export default AdSearchDetail;