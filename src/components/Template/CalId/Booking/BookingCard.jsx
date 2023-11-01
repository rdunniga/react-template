import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { apiEndPointCalidBookingPhotos } from '../../../../utils/apiEndpoint';
import NoPhoto from '../../../../assets/images/NoPhotoAvailable.jpg';

function BookingCard(props) {
  const imageType = {
    front: 'front',
    side: 'side',
    smt: 'smt',
  };

  const imageDimension = {
    height: 180,
    width: 180,
  };

  const getImageUrl = (pics) => {
    const result = pics && pics.find((pic) => pic.height === imageDimension.height);
    if (result) {
      return `${apiEndPointCalidBookingPhotos}/${result.b_Id_Thumbnail}`;
    }
  };

  const [activeImageType, setActiveImageType] = useState(imageType.front);
  const [imageUrl, setImageUrl] = useState('');
  const [smtOffset, setSmtOffset] = useState(0);
  const [smts, setSmts] = useState([]);
  const [smtLabel, setSmtLabel] = useState('SMT');

  const formatDate = (s) => {
    if (s) {
      return new Intl.DateTimeFormat("en-US", { month: "2-digit", day: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit" })
      .format(new Date(s));
    }
  }

  const onImageType = (e) => {
    setActiveImageType(e.target.name);
    if (e.target.name === imageType.front) {
      setImageUrl(getImageUrl(props.record.frontBlobsMetadata));
    } else if (e.target.name === imageType.side) {
      setImageUrl(getImageUrl(props.record.sideBlobsMetadata));
    } else if (e.target.name === imageType.smt) {
      //setImageUrl(getImageUrl(props.record.smtBlobsMetadata));
      setImageUrl(`${apiEndPointCalidBookingPhotos}/${smts[smtOffset].b_Id_Thumbnail}`);
      const offset = smtOffset + 1;
      setSmtOffset(offset < smts.length ? offset : 0);
    } else {
      setImageUrl('');
    }
  };

  useEffect(() => {
  }, [imageUrl]);

  useEffect(() => {
    setActiveImageType(imageType.front);
    setImageUrl(props.record.frontBlobsMetadata.length > 0 ? getImageUrl(props.record.frontBlobsMetadata) : NoPhoto);
    const smts = props?.record?.smtBlobsMetadata.filter((x) => x.height === imageDimension.height);
    setSmts(smts);
  }, []);

  // useEffect(() => {
  //   setSmtLabel(`SMT - ${smtOffset + 1} of ${smts.length}`);
  // }, [smtOffset]);

  return (
    <Card className="me-3 mb-3">
      <Card.Img variant="top" alt="Booking Photo" src={imageUrl} />
      <Card.Body>
        <Card.Title>Case# - {props?.record?.entry.agencY_CASE_NUM}</Card.Title>
        <Card.Text><span className="card__text">CAL-ID</span>{props?.record?.entry.caliD_NUM}</Card.Text>
        <Card.Text><span className="card__text">Bk Date</span>{formatDate(props?.record?.entry.bookinG_DATE)}</Card.Text>
        {
          props?.record?.frontBlobsMetadata?.length > 0 &&
          <Button name={imageType.front} variant="link" onClick={((e) => onImageType(e))}>Front</Button>
        }
        {
          props?.record?.sideBlobsMetadata?.length > 0 &&
          <Button name={imageType.side} variant="link" onClick={((e) => onImageType(e))}>Side</Button>
        }
        {
          smts.length > 0 &&
          <Button name={imageType.smt} variant="link" onClick={((e) => onImageType(e))}>
            SMT - {smtOffset + 1} of {smts.length}</Button>
        }
      </Card.Body>
    </Card>

  )
}

export default BookingCard;