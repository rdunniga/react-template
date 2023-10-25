import React, { useEffect, useContext } from 'react'
import Authenticate from '../components/Authenticate';
import { UserContext } from '../context/UserContext';

function Login() {
  const { userContext } = useContext(UserContext);

  useEffect(() => {
    console.log('login userContext', userContext);
  }, [userContext]);

  return (
    <>
        <Authenticate />
    </>
  )
}

export default Login;