import React, { useContext } from 'react';
import { ContractContext } from './contract';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, redirectTo, onlyOwner}) => {
    const { address, isOwner } = useContext(ContractContext);
    console.log(onlyOwner, isOwner);
    if(onlyOwner){
        if(isOwner){
            return children;
        }
        return <Navigate to='/' />
    }
    return address ? children: <Navigate to={redirectTo} />
}

export default ProtectedRoute;
