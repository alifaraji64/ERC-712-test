import React, { useContext } from 'react';
import { ContractContext } from '../context/contract';
import { Link, useLoaderData } from 'react-router-dom';
const HomeScreen = () => {
    const contractContext = useContext(ContractContext);
    return (
        <>
            <div>
                <center>
                    <h1>Welcome to KingpinNFT</h1>
                    <p>login to mint your NFT and be eligible for an airdrop</p>
                    <p>if you've already minted an NFT you can see when you are logged in</p>
                </center>
            </div>
            <div className='flex two center demo'>
            <Link className="button success half" to='/mint'>Mint Your KingpinNFT</Link>
                {(contractContext.contract && contractContext.address) ? <button className="button error half">Disconnect Your Wallet</button> : null}
            </div>

        </>
    );
}

export default HomeScreen;
