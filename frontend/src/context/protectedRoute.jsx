import React, { useContext } from 'react';
import { ContractContext } from './contract';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, redirectTo}) => {
    const { address } = useContext(ContractContext);
    return address ? children: <Navigate to={redirectTo} />
}

export default ProtectedRoute;
