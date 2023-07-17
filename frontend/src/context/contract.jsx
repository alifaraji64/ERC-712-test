import React, { createContext, useState } from 'react';

// Create the context
export const ContractContext = createContext();

// Create a provider component
export const ContractProvider = ({ children }) => {
  const [contract, setContract] = useState(null);
  const [address, setAddress] = useState(null);

  return (
    <ContractContext.Provider value={{ contract, setContract, address, setAddress }}>
      { children }
    </ContractContext.Provider>
  );
};
