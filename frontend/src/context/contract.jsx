import React, { createContext, useEffect, useState } from 'react';

// Create the context
export const ContractContext = createContext();

// Create a provider component
export const ContractProvider = ({ children }) => {

  const [contract, setContract] = useState(null);

  const [address, setAddress] = useState(null);

  const [isOwner, setIsOwner] = useState(false);

  const [web3Instance, setWeb3Instance] = useState(null);

  useEffect(() => {
    checkIsOwner(address)
  }, [contract,address]);

  const checkIsOwner = async (address) => {
    console.log('bam');
    if (!contract) return;
    let res = await contract.methods.owner().call();
    console.log(res + ' ' + address);
    setIsOwner(res == address);
  }

  return (
    <ContractContext.Provider value={{ contract, setContract, address, setAddress, isOwner,web3Instance, setWeb3Instance }}>
      {children}
    </ContractContext.Provider>
  );
};
