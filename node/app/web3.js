var Web3 = require('web3');
var net = require('net');

export const web3 = new Web3(new Web3.providers.IpcProvider('ethereum.ipc',net)); 