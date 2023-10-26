import React from 'react'
import UserContextDisplay from '../components/Global/UserContextDisplay/UserContextDisplay';
import Container from 'react-bootstrap/Container';

function UserContextDisplayPage() {
  return (
    <Container>
      <h2 className="title">User Context Display Page</h2>
      <UserContextDisplay />
    </Container>
  )
}

export default UserContextDisplayPage;