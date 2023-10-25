import React from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import GlobalSpinner from '../../../Global/Spinner';

function FetchButton(prop) {
  const fetchLoading = prop?.fetchLoading;
  const onSubmit = prop?.onSubmit;
  return (
    <>
    {fetchLoading
      ? <GlobalSpinner msg="loading..." />
      : <Button variant="primary" type="submit" disabled={fetchLoading} onClick={(e) => onSubmit(e)}>Submit</Button>
    }
    </>
)
}

export default FetchButton;