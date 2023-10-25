import React, { createContext, useEffect, useState } from 'react';

export const UserContext = createContext();

const UserContextProvider = (props) => {
  const userDefault = {
    awIsSupervisor: false,
    awRank: '',
    awRankTier: 0,
    container: '',
    email: '',
    employeeId: '',
    employeeNumber: '',
    firstname: '',
    isSworn: false,
    lastname: '',
    rank: '',
    station: '',
    supervisorEmail: '',
    supervisorEmployeeId: '',
    supervisorEmployeeNumber: '',
    supervisorFirstname: '',
    supervisorLastname: '',
    supervisorRank: '',
    supervisorUsername: '',
    timestamp: '',
    token: '',
    tokenExpiry: '',
    username: '',
    validCredentials: false,
    roles: [],
    security: [],
  };

  const [ userId, setUserId ] = useState('testing');
  const [ userContext, setUserContext ] = useState(userDefault);

  useEffect(() => {
    console.log('user context', userContext);
  });

  return (
    <UserContext.Provider value={{
      userId, setUserId,
      userContext, setUserContext,
    }}>
      { props.children }
    </UserContext.Provider> 
  );
}

export default UserContextProvider;