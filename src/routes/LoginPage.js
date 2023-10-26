import React, { useEffect, useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Authenticate from '../components/Template/AD/AdAuthentication/Authenticate';
import UserContextDisplay from '../components/Global/UserContextDisplay/UserContextDisplay';
import { UserContext } from '../context/UserContext';

function LoginPage() {
  const { userContext } = useContext(UserContext);

  useEffect(() => {
    //console.log('login userContext', userContext);
  }, [userContext]);

  return (
    <Container>
      <h2 className='title'>Login Page</h2>
      <Authenticate />
      <UserContextDisplay />
    </Container>
  )
}

export default LoginPage;