var Web3 = require('web3');
var net = require('net');
var BigNumer = require('bignumber.js')

import ethereumConfig from '../../ethereum.json';
import * as homeActions from '../actions/home';


function extractMessage(errorObject){
	return errorObject.message.split(':')[1];
};
function extractResultsAndFormat(results){
    return results.map((question)=>{
        var sum = 0;
        question.map((answer)=>{
            sum += new BigNumber(answer).toNumber();
        });
        return question.map((answer)=>{
            return new BigNumber(answer).toNumber()/sum ;
        })

    });

}

const web3 = new Web3(new Web3.providers.IpcProvider(ethereumConfig.file,net));
const contract = web3.eth.contract(ethereumConfig.contractAbi).at(ethereumConfig.contractAddress);
const GAS = 900000;


export default {

	web3,
 	contract,

	submitAnswers(answers, onSuccess, onFail){
		web3.eth.getCoinbase((errCb,coinbase)=>{
		      
			if( errCb ){
				console.log(errCb);
				onFail(extractMessage(errCb));
				return;
			}

			contract.submit.sendTransaction(answers,{from:coinbase,gas:GAS},function(errTx,txHash){

				var filter = web3.eth.filter("latest").watch(function(errWatch,blockHash){

					if( errWatch ){ 
						console.log(errWatch); 
						onFail(extractMessage(errWatch));
						return;
					}

					var transactions = web3.eth.getBlock(blockHash,function(errBlock,block){

						if( errBlock ){
							console.log(errBlock);
							onFail(extractMessage(errBlock));
							return;
						} 

						if( block.transactions.indexOf(txHash) == -1 ) return;

						onSuccess();

						filter.stopWatching();
					});
				});
			})
	    });
	},

	eventSubscription(store){



	    if( ethereumConfig.accountType == "ADMIN" ){
	        contract.newResults((error,ret) => {
	            if( !error ){
                    store.dispatch(homeActions.receiveNewResults(extractResultsAndFormat(ret.args.results)));  
                } 
	            else store.dispatch(homeActions.showInfo(error.message,homeActions.INFO_TYPES.ERROR));
	        });
	    } else{
	        contract.over((error,ret)=>{
	            if( !error ) store.dispatch(homeActions.receiveClosingTime(extractResultsAndFormat(ret.args.results)));
	            else store.dispatch(homeActions.showInfo(error.message,homeActions.INFO_TYPES.ERROR));
	        });
	    }
	}
};

/*

Questions : 
["0xd6d82d1d3657312dc08d2108b09029bb501f8cdab6b6bbe7b9408b13d9ced6e7","0x887d8df6aaf3010c9eefed46e2ad03e7b411e84b7f37edd9af0dab6cc29cf257","0x926ef6616a951b0d880385dd2a65850a0b50eb1edc180310ed22b821172e2b10"]
Réponses : 
["0x910ef7ea438885df31719697a6f71372f16381791e7ba4533dd3df07686e54f6","0x41e2723e115c71a7045d3b1fae971320655b5209b6084bedea3dfd6ff5681efe","0x3bebf25073e42779969fe7d39279c4e0e1af9b3a5d83d30b46af408cad562643"]



contract RHChain {

    address private admin;
    bool[3] private visibilities; /* [q1.visibile,q2.visibile,q3.visibile] 
    mapping( address => bool ) private hasSubmitted;
    mapping( address =>  uint8[3] ) private submissions; /* @ --> [idx q1.answer,idx q2.answer, idx q3.answer] 
    int[3][3] private results; /* [nb vote q1.answer1, nb vote q1.answer2, nb vote q1.answer3 ][...] 
    
    bool public closed = false;
    bytes32[3] public questions; /* questions hash 
    bytes32[3] public answers; /* answers hash 
    
    event newResults(int[3][3] results);
    event over(int[3][3] results); /* returns results with visibility. -1 is : not visible 

    modifier onlyAdmin {
        if( msg.sender != admin ) throw;
        _
    }
    modifier onlyCollab{
        if( msg.sender == admin ) throw;
        _
    }
    modifier onlyOnce{
       if( hasSubmitted[msg.sender] ) throw;
       _
    }
    modifier onlyOpened {
        if( closed ) throw;
        _
    }
    
    function RHChain(bytes32[3] quests, bytes32[3] answ){
        admin = msg.sender;
        questions = quests;
        answers = answ;
    }
    
    function submit(uint8[3] answ) onlyOpened onlyCollab onlyOnce {
        
        if( !isSubmissionValid(answ) ) throw;
        
        submissions[msg.sender] = answ;
        hasSubmitted[msg.sender] = true;
        
        for(uint8 i=0;i<results.length;i++){
            results[i][answ[i]]++;
        }
        
        newResults(results);
    }
    
    function close(bool[3] _visibilities) onlyAdmin onlyOpened {
        visibilities = _visibilities;
        closed = true;
        over(resultsWithVisibilityFilter());
    }
    
    function mySubmission() onlyCollab returns(uint8[3]) {
        if( msg.sender == admin ) throw;
        if( !hasSubmitted[msg.sender] ) throw;
        else return submissions[msg.sender];
    }
    
    function getResults() returns( int[3][3] ){
        if( msg.sender == admin ) return results;
        else if( closed ) return resultsWithVisibilityFilter();
        else throw;
    }
    
    function getVisibilities() onlyAdmin returns( bool[3] )  {
        return visibilities;
    }
    
    function isSubmissionValid(uint8[3] sub) private returns (bool){
        for(uint i=0;i<sub.length;i++){
            if( sub[i]<0 || sub[i] > 2 ) return false;
        }
        return true;
    }
    function resultsWithVisibilityFilter() private returns(int[3][3] ret) {
        ret = results;
        
        for(uint8 i=0;i<results.length;i++){
            if( !visibilities[i] ){
                for( uint8 j=0 ; j<results.length ; j++){
                    ret[i][j] =-1;
                }
        }   }
    }

}

*/