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
        {/* {prop?.msg ? prop.msg : " Loading..."} */}
        <span>{prop?.msg ? prop.msg : "Loading..."}</span>
      </Button>
      {/* {' '} */}
      {/* <Button variant="primary" disabled>
        <Spinner
          as="span"
          animation="grow"
          size="sm"
          role="status"
          aria-hidden="true"
        />
        {prop?.msg ? prop.msg : "Loading..."}
      </Button>
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner> */}
    </>
  )
}

export default GlobalSpinner;