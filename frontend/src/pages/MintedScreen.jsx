import React, { useContext, useEffect, useState } from 'react';
import { useLoaderData, useParams } from 'react-router-dom';
import { ContractContext } from '../context/contract';
const MintedScreen = () => {
    const { address, contract } = useContext(ContractContext)
    const [NFTs, setNFTs] = useState([]);
    const getNFTs = async () => {
        try {
            let myNFTs = await contract.methods.getOwnedNFTs(address).call();
            console.log(myNFTs);
            let nfts = [];
            myNFTs.forEach(nft => {
                nfts.push({ id: nft.id, data: nft.data, exists: nft.exists })
            });
            setNFTs(nfts);
            console.log(nfts);
        } catch (e) {
            console.log(e);
        }
    }
    useEffect(() => {
        getNFTs();


    }, []);
    return (
        <div>
            {NFTs.map(nft => {
                return nft.exists? <div key={nft.id} className='container'>
                <div style={{ background: nft.data }}>{nft.data}</div>
            </div>:''
            })}
        </div>
    );
}


export default MintedScreen;
