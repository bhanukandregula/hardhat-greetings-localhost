import logo from './logo.svg';
import './App.css';

import { useState } from 'react';
import { ethers } from 'ethers';
import Greeter from './artifacts/contracts/Greeter.sol/Greeter.json';
import { Provider } from '@ethersproject/abstract-provider';

// This is where we deployed our contract
// we can get this from CLI once the contract is deployed
const greeterAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

// Application idea: User will give a form input, and that overrides the default value we have and it overides the blockchain

function App() {
  const [greeting, setGreetingValue] = useState('')

  // This function will connect to wallet of the user in Metamask and fetch the user account details.
  async function requestAccount(){
    // This will bring list of accounts from Metamask
    // This will  prompt user to connect to one of their metamask accounts to connect
    // browser pop up
    await  window.ethereum.request({ method: 'eth_requestAccounts' });
  }

  async function fetchGreeting(){
    if(typeof window.ethereum !== 'undefined'){
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      // console.log('This is my Provider: ', provider);
      const contract = new ethers.Contract(greeterAddress, Greeter.abi, provider)
      // console.log('This is my contract: ', contract);
      try{
      const data = await contract.greet()
      console.log('data: ', data)
      }catch(error){
        console.log('Error: ', error)
      }
    }

  }

  async function setGreeting() {
    // Just to make sure if we type a greeting
    // so we don't send an empty string to the contract
    if(!greeting) return
    if(typeof window.ethereum !== 'undefined'){
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(greeterAddress, Greeter.abi, signer);
      const transaction = await contract.setGreeting(greeting);
      setGreetingValue('');
      await transaction.wait();
      fetchGreeting();
    }
  }


  return (
    <div className="App">
      <header className="App-header">

        <button onClick={fetchGreeting}>Fetch Greeting</button>
        <button onClick={setGreeting}>Set Greeting</button>

        <input onChange={e => setGreetingValue(e.target.value)} 
        placeholder='Set greetings here'
        value={greeting}>
        </input>

      </header>
    </div>
  );
}

export default App;
