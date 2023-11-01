import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import useFetch from '../../../../hooks/useFetch';
import { apiEndPointCalidBookingPhoto, httpResponseStatusCode } from '../../../../utils/apiEndpoint';
import './BookingPhoto.css';
import GlobalSpinner from '../../../Global/Spinner';

function BookingPhoto() {
  return (
    <div>BookingPhoto</div>
  )
}

export default BookingPhoto;