import {useState} from 'react';
import Button from '@mui/material/Button';
import Web3 from 'web3';

const Navbar = () => {
    const [web3, setWeb3] = useState(null);
    const [accounts, setAccounts] = useState([]);
    async function connectToMetaMask() {
        console.log('hello')
      }
    return (
        <div>
            <Button variant="contained">Connect Wallet</Button>
        </div>
    );
}

export default Navbar;
