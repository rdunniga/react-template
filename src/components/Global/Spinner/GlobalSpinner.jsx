import React from 'react';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

function GlobalSpinner(prop) {
  return (
    <>
      <Button variant="primary" disabled>
        <Spinner
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
        />
        <span>{prop?.msg ? prop.msg : "Loading..."}</span>
      </Button>
    </>
  )
}

export default GlobalSpinner;