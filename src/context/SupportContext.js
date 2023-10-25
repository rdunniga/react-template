import React, { createContext, useState } from 'react';

export const SupportContext = createContext();

const SupportContextProvider = (props) => {

  return (
    <SupportContext.Provider value={{
      
    }}>
      { props.children }
    </SupportContext.Provider> 
  );
}

export default SupportContextProvider;