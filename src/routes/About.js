import React, { useContext, useEffect }  from 'react';
import { UserContext } from '../context/UserContext';

function About() {
  const { userId, setUserId } = useContext(UserContext);

  useEffect(() => {
    console.log('about userId', userId);
  });

  return (
    <div className="about">
      <h1>About</h1>
      <h2>{userId}</h2>
    </div>
  )
}

export default About;