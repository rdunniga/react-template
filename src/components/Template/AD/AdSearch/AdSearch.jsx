import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import 'bootstrap/dist/css/bootstrap.min.css';
import useFetch from '../../../../hooks/useFetch';
import { apiEndPointAdSearch, httpResponseStatusCode } from '../../../../utils/apiEndpoint';
import './AdSearch.css';
import AdSearchDetail from '../AdSearchDetail';
import GlobalSpinner from '../../../Global/Spinner';

function AdSearch() {
  const [filter, setFilter] = useState('(|(samaccountname=rdunniga)(samaccountname=appuser))');
  const [path, setPath] = useState('LDAP://DC=RSODOM,DC=RIVERSIDESHERIFF,DC=ORG');
  const [property, setProperty] = useState('');
  const [propertiesToLoad, setPropertiesToLoad] = useState(['cn', 'employeeId', 'samaccountname', 'employeeNumber']);
  const [scope, setScope] = useState('2');
  const [sortByPropertyName, setSortByPropertyName] = useState('cn');
  const { fetchRequest, fetchRefresh, fetchReceived, fetchHeader, fetchLoading, fetchError, fetchStatus, fetchUrl
  } = useFetch({ url: apiEndPointAdSearch, getAllPages: false });

  const onChange = (e) => {
    if (e.target.id === 'filter') {
      setFilter(e.target.value);
    } else if (e.target.id === 'path') {
      setPath(e.target.value);
    } else if (e.target.id === 'property') {
      setProperty(e.target.value);
    } else if (e.target.id === 'propertiesToLoad') {
      //setPropertiesToLoad(e.target.value);
    } else if (e.target.id === 'scope') {
      setScope(e.target.value);
    } else if (e.target.id === 'sortByPropertyName') {
      setSortByPropertyName(e.target.value);
    }
  };

  const onPropertyAdd = () => {
    const list = [...propertiesToLoad];
    list.push(property);
    setPropertiesToLoad(list);
    setProperty('');
  }

  const onPropertyRemove = (index) => {
    setPropertiesToLoad(propertiesToLoad.toSpliced(index, 1));
  }

  const onSubmit = (e) => {
    // https://react-bootstrap.netlify.app/docs/forms/validation
    e.preventDefault();
    let index = 0;
    const properties = propertiesToLoad.reduce((a, v) => {
      return a += '&propertiesToLoad[' + index++ + ']=' + v;
    }, '');
    const url = `${apiEndPointAdSearch}/?filter=${filter}&path=${path}&scope=${scope}${properties}`;
    // console.log('properties', properties);
    // console.log('url', url);
    fetchRequest(url);
  };

  useEffect(() => {
    //  console.log('onUseEffect', fetchReceived);
  }, [fetchRequest, fetchRefresh, fetchReceived, fetchHeader, fetchLoading, fetchError]);

  return (
    <>
      <Container className="search-container mt-5 mb-5">
        <h2 className='title'>AD Search</h2>
        <Form size="sm">
          <Row>
            <Col>
              <Row>
                <Form.Group>
                  <Form.Floating className="mb-3">
                    <Form.Control size="sm" id="path" type="text" placeholder="Path" value={path} required onChange={(e) => onChange(e)} />
                    <Form.Label htmlFor="path">Path</Form.Label>
                  </Form.Floating>
                </Form.Group>
              </Row>
              <Row>
                <Form.Group>
                  <Form.Floating className="mb-3">
                    <Form.Select id="scope" size="sm" type="text" placeholder="Scope" value={scope} required onChange={(e) => onChange(e)} >
                      <option key="0" value="0">Base</option>
                      <option key="1" value="1">OneLevel</option>
                      <option key="2" value="2">Subtree</option>
                    </Form.Select>
                    <Form.Label htmlFor="scope">Scope</Form.Label>
                  </Form.Floating>
                </Form.Group>
              </Row>
              <Row>
                <Form.Group>
                  <Form.Floating className="mb-3">
                    <Form.Control id="filter" size="sm" as="textarea" style={{ height: '100px' }} placeholder="Filter" value={filter} required onChange={(e) => onChange(e)} />
                    <Form.Label htmlFor="filter">Filter</Form.Label>
                  </Form.Floating>
                </Form.Group>
              </Row>
              <Row>
                <Form.Group>
                  <Form.Floating className="mb-3">
                    <Form.Control id="sortByPropertyName" size="sm" type="text" placeholder="Sort By Property Name" value={sortByPropertyName} required onChange={(e) => onChange(e)} />
                    <Form.Label htmlFor="sortByPropertyName">Sort By Property Name</Form.Label>
                  </Form.Floating>
                </Form.Group>
              </Row>
            </Col>

            <Col>
              <Row>
                <Col>
                  <Form.Group>
                    <Form.Floating className="mb-3">
                      <Form.Control id="property" size="sm" type="text" placeholder="Add to property list" value={property} onChange={(e) => onChange(e)} />
                      <Form.Label size="sm" htmlFor="property">Add to property list</Form.Label>
                    </Form.Floating>
                  </Form.Group>
                </Col>
                <Col className="align-self-center">
                  {
                    property &&
                    property.length > 0 &&
                    <Button size="sm" className="mb-3" disabled={property === ''} onClick={(() => onPropertyAdd())}>Click To Add</Button>
                  }
                </Col>
              </Row>
              <Row>
                <Col>
                  <Container>
                    {propertiesToLoad &&
                      propertiesToLoad.map((property, index) => {
                        return (
                          <div key={index}>
                            <Button variant="danger" size="sm" className="mb-3" onClick={(() => onPropertyRemove(index))}>{property}</Button>
                          </div>
                        )
                      })
                    }
                  </Container>
                </Col>
                <Col className="align-self-center">
                  {
                    propertiesToLoad && propertiesToLoad.length > 0 ? <span>Click item to remove</span> : ''
                  }
                  
                </Col>
              </Row>
            </Col>
          </Row>

          {fetchLoading
            ? <GlobalSpinner msg="loading..." />
            : <Button variant="primary" type="submit" disabled={fetchLoading} onClick={(e) => onSubmit(e)}>Submit</Button>
          }
        </Form>
      </Container>
      <AdSearchDetail
        fetchLoading={fetchLoading}
        fetchError={fetchError}
        fetchMessage="Loading..."
        fetchReceived={fetchReceived}
      />
    </>
  )
}

export default AdSearch;