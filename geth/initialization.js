ADMIN_PASSWORD = "admin";
GAS = 2000000;

/* Create admin account */
personal.newAccount(ADMIN_PASSWORD);

/* Get some ether */
miner.start();
admin.sleepBlocks(1);
miner.stop();

/* Get contract source code and labels */
loadScript('contract.js');
//sources = getContractSource(); //remplacé par ABI + compiled

questions = getContractQuestions();
proposals = getContractProposals();


/* Compute sha3 for questions and proposals */
	/** SAME LOOP BECAUSE EQUAL NUMBER **/
for( i=0;i<questions.length;i++){
	questions[i] = web3.sha3(questions[i]);
	proposals[i] = web3.sha3(proposals[i]);
}


/* Compile contract */
 // compiled = eth.compile.solidity(sources).RHChain;
compiled = getContractCompiled();
compiled = "0x"+compiled; 	// Add 0x to compiled code with solc to put into a transaction

abi	= getContractAbi();

/* Unlock account for deployment */
personal.unlockAccount(eth.coinbase,ADMIN_PASSWORD);

/* Instantiate contract */
rhchain = eth.contract(abi).new(questions,proposals,{from: eth.coinbase, data: compiled, gas: GAS},function(err,res){

	/** Save contract address **/
	if( res.address != undefined  ) {console.log("CONTRACT_ADDRESS:"+res.address);}

});

/* Deploy contract */
miner.start();
admin.sleepBlocks(3);
miner.stop();

/* Save infos */

	/** Save admin address **/
console.log("ADMIN_ADDRESS:"+eth.coinbase);

	/** Save enode **/
console.log("ENODE:"+admin.nodeInfo.enode);
