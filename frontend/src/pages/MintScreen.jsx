import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { ContractContext } from '../context/contract';
import web3 from 'web3';
import swal from 'sweetalert';
const MintScreen = () => {
    const nfts = useLoaderData();
    const contractContext = useContext(ContractContext);
    const mint = async(data)=>{
        try {
            let res = await contractContext.contract.methods.mint(contractContext.address,data).send({from: contractContext.address, value:web3.utils.toWei('0.5', 'ether')});
            console.log(res);
            swal("Congratulations, you successfullly minted your NFT. Here is you transaction hash: \n \n"+ res.transactionHash);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div>
            <center>
                <h1>Mint Screen</h1>
            </center>
            <center>
                <div className="flex one two-500 demo">
                    {nfts.map(nft => (
                        <div key={nft.data} className='container'>
                            <div style={{ background: nft.data }}>{nft.data}</div>
                            {contractContext.contract ? <button className='button' onClick={()=>mint(nft.data)}>Mint</button> : <p>connect your wallet to mint</p>}
                        </div>
                    ))}
                </div>
            </center>
        </div>
    );
}

export default MintScreen;

export const nftLoader = async () => {
    const res = await fetch('http://localhost:4000/nfts');
    return await res.json();
}
