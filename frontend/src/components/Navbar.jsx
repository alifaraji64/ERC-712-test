import { useState, useContext } from 'react';
import kingpin from '../nft-1.png'
import Web3 from 'web3';
import contractArtifact from '../contracts/KingPinNFT.json'
import { ContractContext } from '../context/contract';
import { Link, Outlet } from 'react-router-dom';
const Navbar = () => {
    const [contract, setContract] = useState(null);
    const contractContext = useContext(ContractContext)
    const connectToWallet = async () => {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const web3Instance = new Web3(window.ethereum);
        contractContext.setWeb3Instance(web3Instance);
        const accounts = await web3Instance.eth.getAccounts();
        const address = accounts[0];
        contractContext.setAddress(address);
        const contractAbi = contractArtifact.abi // The ABI of your smart contract
        const contractAddress = contractArtifact.networks['80001'].address; // The address of your deployed smart contract
        const contractInstance = new web3Instance.eth.Contract(contractAbi, contractAddress);
        setContract(contractInstance);
        contractContext.setContract(contractInstance);
        //contractContext.checkIsOwner(address)
    }
    return (
        <>
            <nav className="demo">
                <div className="brand">
                    <Link to='/' style={{ color: 'black' }}>
                        <img className="logo" src={kingpin} alt='kingpin' />
                        <span>KingPinNFT</span>
                    </Link>
                </div>
                <input id="bmenub" type="checkbox" className="show" />
                <label htmlFor="bmenub" className="burger pseudo button">menu</label>

                <div className="menu">
                    {contractContext.contract ?
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Link className="button" to='/minted'>your NFTs</Link>
                            {contractContext.isOwner ?
                                <Link className='button warning' to='/owner' style={{ marginLeft: '0.5rem'}}>
                                    owner functions
                                </Link> : ''}
                            <p style={{ marginLeft: '0.5rem'}}>{contractContext.address}</p>
                        </div> :
                        <button className="button icon-puzzle" onClick={connectToWallet}>Connect Your Wallet</button>}
                </div>
            </nav>
            <Outlet />
        </>

    );
}

export default Navbar;
