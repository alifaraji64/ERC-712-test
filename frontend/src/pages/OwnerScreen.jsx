import React, { useState, useContext } from 'react';
import Web3 from 'web3';
import swal from 'sweetalert';
import { ContractContext } from '../context/contract';
import contractArtifact from '../contracts/KingPinNFT.json'
const OwnerScreen = () => {
    const [placeholders, setPlaceholders] = useState([]);
    const { contract, address, web3Instance } = useContext(ContractContext);
    const addresses = [];
    const datas = [];
    const regex = /^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/;
    const accNumChanged = (e) => {
        const number = e.target.value;
        setPlaceholders(Array.from({ length: number }, (_, index) => { }))
    }
    const addressChanged = (e, index) => {
        const address = e.target.value;
        //remove the previous address in that index
        addresses.splice(index, 1);
        //add address to the specific index
        addresses.splice(index, 0, address)
    }
    const dataChanged = (e, index) => {
        const data = e.target.value;
        //remove the previous data in that index
        datas.splice(index, 1);
        //add data to the specific index
        datas.splice(index, 0, data);
    }

    const submit = async () => {
        console.log(addresses);
        console.log(datas);
        //address validation
        addresses.forEach((address) => {
            Web3.utils.isAddress(address) ? console.log('addresses are valid') : swal('make sure all addresses are valid');
        })
        //hex code validation
        datas.forEach((data) => {
            regex.test(data) ? console.log('datas are valid') : swal('make sure data is a valid hex code');
        })
        try {
            const data = contract.methods.airdrop(addresses,datas).encodeABI();
            const contractAddress = contractArtifact.networks['5777'].address;
            const gasAmount = await web3Instance.eth.estimateGas({
                to: contractAddress,
                data
              })
              console.log(Web3.utils.toWei(gasAmount,'Gwei'),Web3.utils.toWei('20','Gwei'));
              await web3Instance.eth.sendTransaction({
                from:address,
                to: contractAddress,
                data,
                gasLimit: gasAmount, // gas limit is the maximum amount of gas you are willing to spend for a simple transactio it is 21000
                gasPrice: Web3.utils.toWei('20','Gwei') // gas price is the price you are willing to pay per unit of gas
              })

        } catch (e) {
            console.log(e);
            swal('error occured')
        }
    }
    return (
        <div style={{ padding: '1rem' }}>
            <h1>Owner</h1>
            <section style={{ width: '20%', marginBottom: '1rem' }}>
                <label>Number of Accounts You wanna airdrop</label>
                <input type='number' onChange={accNumChanged} />
            </section>
            <section className='flex two'>
                {placeholders.map((_, index) => {
                    return <div style={{ marginBottom: '1rem' }} key={index}>
                        <input type="text" placeholder='address' onChange={(e) => { addressChanged(e, index) }} required />
                        <input type="text" placeholder='token data' onChange={(e) => { dataChanged(e, index) }} required />
                    </div>
                })}
                <button onClick={submit}>Submit</button>
            </section>
        </div>
    );
}


export default OwnerScreen;
