import React from 'react';
import { useParams } from 'react-router-dom';
const MintedScreen = () => {
    const {address} = useParams()
    return (
        <div>
            <h1>MintedScreen {address}</h1>
        </div>
    );
}

export default MintedScreen;
