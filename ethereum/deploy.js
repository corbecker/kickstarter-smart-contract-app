const dotenv = require('dotenv').config();
const path = require('path');
const fs = require('fs');
const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const mnemonic = process.env.mnemonic;
const compiledFactory = require('./build/Campaignfactory.json');

const provider = new HDWalletProvider(mnemonic, 'https://rinkeby.infura.io/855f3d0ec061407ca8b317fa013c5ae6');
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({ data: `0x${compiledFactory.bytecode}`})
    .send( { from: accounts[0] })
  
    console.log('Contract deployed to: ', result.options.address);

};
deploy();