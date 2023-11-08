import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import useFetch from '../../../../hooks/useFetch';
import { apiEndPointCalidBookings, httpResponseStatusCode } from '../../../../utils/apiEndpoint';
import './Booking.css';
import GlobalSpinner from '../../../Global/Spinner';
import FetchButton from '../../../ui/button/fetch';
import FetchStatus from '../../../Global/FetchStatus';
import BookingCard from './BookingCard';

function Booking() {
  const [filter, setFilter] = useState('booking_num=202300001');
  const [startDate, setStartDate] = useState('2023-10-01T00:00:00');
  const [endDate, setEndDate] = useState('2023-10-01T01:00:00');
  const { fetchRequest, fetchRefresh, fetchReceived, fetchHeader, fetchLoading, fetchError, fetchStatus, fetchUrl
  } = useFetch({ url: apiEndPointCalidBookings, getAllPages: true });

  const onChange = (e) => {
    if (e.target.id === 'filter') {
      setFilter(e.target.value);
    } else if (e.target.id === 'startDate') {
      setStartDate(e.target.value);
    } else if (e.target.id === 'endDate') {
      setEndDate(e.target.value);
    }
  };

  const onSubmit = (e) => {
    if (filter !== '') {
      e.preventDefault();
      let params = '';
      if (startDate && endDate) {
        var daysBetween = (new Date(endDate).getTime() - new Date(startDate).getTime()) / 86400000;
        //console.log('daysBetween', daysBetween);
        if (daysBetween > 1) {
          alert('date range cannot exceet 1 day');
          return;
        }
        if (daysBetween < 0) {
          alert('date range is not valid');
          return;
        }
        params = `?minBookingDt=${startDate}&maxBookingDt=${endDate}&orderBy=booking_date`;
      } else {
        params = `?filter=${filter}`;
      }
      const url = `${apiEndPointCalidBookings}/${params}`;
      fetchRequest(url, true);
    }
  };

  const formatDate = (s) => {
    if (s) {
      return new Intl.DateTimeFormat("en-US", { month: "2-digit", day: "2-digit", year: "numeric" })
      .format(new Date(s));
    }
  }

  useEffect(() => {
    if (fetchLoading) { return; }
    if (fetchError) {
      if (fetchError === httpResponseStatusCode.unauthorized) {
        return;
      }
    }
    console.log('fetchReceived', fetchReceived);
  }, [fetchReceived, fetchHeader, fetchLoading, fetchError]);

  useEffect(() => {
    //console.log('fetchError', fetchError);
  }, [fetchError]);

  useEffect(() => {
    console.log("render");
  });

  return (
    <>
      <Container className="search-container mt-5 mb-5">
        <h2 className='title'>Cal ID Booking Metadata and Photos</h2>
        <Form>
          <Row>
            <Col md>
              <Form.Group>
                <Form.Floating className="mb-3">
                  <Form.Control id="filter" type="text" placeholder="booking_num=202300001" value={filter} onChange={(e) => onChange(e)} />
                  <label htmlFor="filter">Filter</label>
                </Form.Floating>
              </Form.Group>
            </Col>
            <Col md>
              <Form.Group>
                <Form.Floating className="mb-3">
                  <Form.Control id="startDate" type="datetime-local" placeholder="" value={startDate} onChange={(e) => onChange(e)} />
                  <label htmlFor="startDate">Start Date</label>
                </Form.Floating>
              </Form.Group>
            </Col>
            <Col md>
              <Form.Group>
                <Form.Floating className="mb-3">
                  <Form.Control id="endDate" type="datetime-local" placeholder="" value={endDate} onChange={(e) => onChange(e)} />
                  <label htmlFor="endDate">End Date</label>
                </Form.Floating>
              </Form.Group>
            </Col>
          </Row>
          <FetchButton fetchLoading={fetchLoading} onSubmit={onSubmit} />
        </Form>
      </Container>
      <Container className="detailx-container mt-5 mb-5">
        {/* {fetchLoading && <h4>fetching...</h4>} */}
        {fetchError &&
          <h4>fetch status: {fetchError === httpResponseStatusCode.notFound ? 'not found' : fetchError}</h4>
        }
        {fetchReceived &&
           <Container className="row"> {
          fetchReceived.map((x, i) => {
            const record = x;
            return (
              <BookingCard key={record.entry.recordId} record={record} />
//              <BookingCard key={1 + (Math.random() * (100000000))} record={record} />
            );
          })
         } </Container>
        }
      </Container>
    </>
  )
}

export default Booking;