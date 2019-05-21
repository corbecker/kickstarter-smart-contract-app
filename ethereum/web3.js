import Web3 from 'web3';

let web3;

if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined'){
  //in browser & has metamask
  web3 = new Web3(window.web3.currentProvider);
} else {
  // not on browser or no metamask
  const provider = new Web3.providers.HttpProvider(
    'https://rinkeby.infura.io/855f3d0ec061407ca8b317fa013c5ae6'
  );
  web3 = new Web3(provider);
}

export default web3;