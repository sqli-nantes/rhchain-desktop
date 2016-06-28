var Web3 = require('web3');
var web3 = new Web3();
// var net = require('net');

export function create(ipcFilePath){
	return web3;
	// web3.setProvider(new Web3.providers.IpcProvider(ipcFilePath,net));

	// web3._extend({
	// 	property: 'miner',
	// 	methods: [
	// 		new web3._extend.Method({
	// 			name: 'start',
	// 			call: 'miner_start',
	// 			params: 1,
	// 			inputFormatter: [toIntVal],
	// 			outputFormatter: toBoolVal
	// 		}),

	// 		new web3._extend.Method({
	// 			name: 'stop',
	// 			call: 'miner_stop',
	// 			params: 1,
	// 			inputFormatter: [toIntVal],
	// 			outputFormatter: toBoolVal
	// 		}),

	// 		new web3._extend.Method({
	// 			name: 'setEtherbase',
	// 			call: 'miner_setEtherbase',
	// 			params: 1,
	// 			inputFormatter: [toStringVal],
	// 			outputFormatter: toBoolVal
	// 		})
	// 	]
	// })

	// function toStringVal(val) {
	// 	return String(val);
	// }

	// function toIntVal(val) {
	// 	return parseInt(val);
	// }

	// function toBoolVal(val) {
	// 	if (String(val) == 'true') {
	// 		return true;
	// 	} else {
	// 		return false;
	// 	}
	// }


	// return web3;
}
