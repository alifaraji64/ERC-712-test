import { useState, useContext } from 'react';
import kingpin from '../nft-1.png'
import Web3 from 'web3';
import contractArtifact from '../contracts/KingPinNFT.json'
import { ContractContext } from '../context/contract';
const Navbar = () => {
    const [web3, setWeb3] = useState(null);
    const [contract, setContract] = useState(null);
    const contractContext = useContext(ContractContext)
    const connectToWallet = async () => {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const web3Instance = new Web3(window.ethereum);
            setWeb3(web3Instance);
            const accounts = await web3Instance.eth.getAccounts();
            const address = accounts[0];
            contractContext.setAddress(address);

            const contractAbi = contractArtifact.abi // The ABI of your smart contract
            const contractAddress = contractArtifact.networks['5777'].address; // The address of your deployed smart contract
            const contractInstance = new web3Instance.eth.Contract(contractAbi, contractAddress);
            setContract(contractInstance);
            contractContext.setContract(contractInstance);
    }
    return (
        <nav className="demo">
            <div className="brand">
                <img className="logo" src={kingpin} alt='kingpin' />
                <span>KingPinNFT</span>
            </div>
            <input id="bmenub" type="checkbox" className="show" />
            <label htmlFor="bmenub" className="burger pseudo button">menu</label>

            <div className="menu">
                {contract ? <div onClick={()=>console.log(contractContext.contract)}>{contractContext.address}</div> : <button className="button icon-puzzle" onClick={connectToWallet}>Connect Your Wallet</button>}
            </div>
        </nav>
    );
}

export default Navbar;