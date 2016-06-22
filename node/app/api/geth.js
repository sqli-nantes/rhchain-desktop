var Web3 = require('web3');
var net = require('net');
var BigNumber = require('bignumber.js')
BigNumber.config({ERRORS: false});

var fs = require('fs');

import ethereumConfig from '../../ethereum.json';
import * as homeActions from '../actions/homeActions';
import * as administratorActions from '../actions/administratorActions';
import * as collaboratorActions from '../actions/collaboratorActions';


function extractMessage(errorObject){return errorObject.message.split(':')[1];};

/* Convert from number of voters to percentage */
function formatResults(results){
    var ret = [];
    for(var i=0;i<results.length;i++){

        var question = results[i];
        var answers = [];
        var sum = 0;

        /* compute the number of voters for the question i */
        for(let j=0;j<question.length;j++){
            sum+= new BigNumber(question[j]).toNumber();
        }

        /* for each answer of question i compute the percentage */
        for(let j=0;j<question.length;j++){
            var answer = new BigNumber(question[j]).toNumber();
            var answerPercentage = parseFloat(new BigNumber((answer/sum)*100).toFixed(1));
            if( answer > 0 ) answers.push(answerPercentage);
            else answers.push(answer);
        }

        ret.push(answers);
    }
    return ret;
}

function showError(dispatch,errorMsg){
    dispatch(homeActions.showInfo(errorMsg,homeActions.INFO_TYPES.ERROR));
}

function waitMining(txHash, onSuccess , onFail){
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
}

function deleteFolderRecursive(path) {
  if( fs.existsSync(path) ) {
    fs.readdirSync(path).forEach(function(file,index){
      var curPath = path + "/" + file;
      if(fs.lstatSync(curPath).isDirectory()) { // recurse
        deleteFolderRecursive(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
};

function unlockAccount60Sec(onSuccess,onFail){
    web3.personal.unlockAccount(
            ethereumConfig.accountAddress,
            ethereumConfig.accountPassword,
            60,(errUnlock,unlocked)=>{
                if( !errUnlock && unlocked ) onSuccess();
                else onFail();
            });
}

export const web3 = new Web3(new Web3.providers.IpcProvider(ethereumConfig.file,net));
export const contract = web3.eth.contract(ethereumConfig.contractAbi).at(ethereumConfig.contractAddress);
export const GAS = 900000;


export function submitAnswers(answers, onSuccess, onFail){
    unlockAccount60Sec( ()=>contract.submit.sendTransaction(    
                                answers,
                                {from:ethereumConfig.accountAddress,gas:GAS},
                                (errTx,txHash)=>{
                                    waitMining(txHash,onSuccess, onFail)
                                }),
                        ()=>onFail(extractMessage(errUnlock))
    );
}

export function eventSubscription(dispatch){

    if( ethereumConfig.accountType == "ADMIN" ){
        contract.newResults((error,ret) => {
            if( !error ){
                dispatch(homeActions.receiveNewResults(formatResults(ret.args.results))); 
                dispatch(homeActions.showInfo("Nouvelle réponse au sondage",homeActions.INFO_TYPES.SUCCESS));
            }
            else showError(dispatch,error.message);
        });
    } else{
        contract.over((error,ret)=>{
            if( !error ){
                dispatch(homeActions.receiveNewResults(formatResults(ret.args.results)));
                dispatch(homeActions.setOver(true));
            } 
            else showError(dispatch,error.message);
        });
    }
}

export function initializeState(dispatch){
    console.log(web3.miner)
    contract.closed((err,res)=>{
        if( !err ){
            if( res ){
                contract.getResults.call((err,results)=>{
                    if( !err ){
                        dispatch(homeActions.receiveNewResults(formatResults(results[1])));
                        dispatch(homeActions.setOver(res));
                    } else{
                        showError(dispatch,extractMessage(err));
                    }
                }) 
            }             
        } 
        else showError(dispatch,extractMessage(err));
    });

    // question + answer hash
    // question + answer string

    if( ethereumConfig.isAdmin ){
        contract.getVisibilities.call((err,value)=>{
            if( !err && value[0] ){
                value[1].map((questionVisibility,index)=>{
                    dispatch(administratorActions.setVisibility(index,questionVisibility));
                });
            } else { 
               var msg = err ? extractMessage(err) : "Impossible de récupérer une information (accès refusé)";
               showError(dispatch,msg);
            }
        }); 

        contract.getResults.call((err,value)=>{
            if( err ){
              showError(dispatch,extractMessage(err));
              return;  
            } 
            if( value[0] ) dispatch(homeActions.receiveNewResults(formatResults(value[1])));
        });

    } else {
        contract.mySubmission.call((err,value)=>{
            if( err ){
              showError(dispatch,extractMessage(err));
              return;  
            } 
            if( value[0] ){
                value[1].map((questionAnswer,index)=>{
                    dispatch(collaboratorActions.answer(index,questionAnswer));
                });
                dispatch(collaboratorActions.hasVoted());
            }
        });
    }
}

export function closeVote(visibilities,onSuccess,onFail){

    unlockAccount60Sec( ()=> contract.close.sendTransaction(
                                    visibilities,
                                    {from:ethereumConfig.accountAddress,gas:GAS},
                                    function(errTx,txHash){
                                        waitMining(txHash, onSuccess, onFail)
                                    }),
                        ()=>onFail(extractMessage(errUnlock))
  );
}

export function createAccount(password,onSuccess,onFail){

    var toDelete = [
        ethereumConfig.gethDataPath+'nodekey',
        ethereumConfig.gethDataPath+'nodes',
        ethereumConfig.gethDataPath+'keystore'
    ];

    for(var i=0;i<toDelete.length;i++){
        try{
            var stats = fs.statSync(toDelete[i]);
            if( stats.isFile() ) fs.unlinkSync(toDelete[i]);
            else deleteFolderRecursive(toDelete[i]);
        }catch(e){
            console.log("file not exists",e);
        }
    }

    web3.personal.newAccount(password,function(err,address){
        if( err ){ console.log(err);onFail();return; }

        ethereumConfig.accountAddress = address;
        ethereumConfig.accountPassword = password;
        ethereumConfig.isAdmin=false;
        ethereumConfig.isFirstConnection = false;

        fs.writeFile('./ethereum.json',JSON.stringify(ethereumConfig),function(err){
            if( err ) {
                console.log(err);
                onFail();
                return;
            }
            else {
                console.log("fichier mis à jour ",address);
                onSuccess();
                return;
            }
        });
    })

}

/*

Questions : 
["0xd6d82d1d3657312dc08d2108b09029bb501f8cdab6b6bbe7b9408b13d9ced6e7","0x887d8df6aaf3010c9eefed46e2ad03e7b411e84b7f37edd9af0dab6cc29cf257","0x926ef6616a951b0d880385dd2a65850a0b50eb1edc180310ed22b821172e2b10"]
Réponses : 
["0x910ef7ea438885df31719697a6f71372f16381791e7ba4533dd3df07686e54f6","0x41e2723e115c71a7045d3b1fae971320655b5209b6084bedea3dfd6ff5681efe","0x3bebf25073e42779969fe7d39279c4e0e1af9b3a5d83d30b46af408cad562643"]


rhchain = eth.contract(compiled.RHChain.info.abiDefinition).new(["0xd6d82d1d3657312dc08d2108b09029bb501f8cdab6b6bbe7b9408b13d9ced6e7","0x887d8df6aaf3010c9eefed46e2ad03e7b411e84b7f37edd9af0dab6cc29cf257","0x926ef6616a951b0d880385dd2a65850a0b50eb1edc180310ed22b821172e2b10"],["0x910ef7ea438885df31719697a6f71372f16381791e7ba4533dd3df07686e54f6","0x41e2723e115c71a7045d3b1fae971320655b5209b6084bedea3dfd6ff5681efe","0x3bebf25073e42779969fe7d39279c4e0e1af9b3a5d83d30b46af408cad562643"],{from: eth.coinbase, data: compiled.RHChain.code, gas: 2000000})


[{"constant": false, "inputs": [], "name": "getVisibilities", "outputs": [{"name": "", "type": "bool"}, {"name": "", "type": "bool[3]"}], "type": "function"}, {"constant": true, "inputs": [{"name": "", "type": "uint256"}], "name": "answers", "outputs": [{"name": "", "type": "bytes32"}], "type": "function"}, {"constant": true, "inputs": [{"name": "", "type": "uint256"}], "name": "questions", "outputs": [{"name": "", "type": "bytes32"}], "type": "function"}, {"constant": false, "inputs": [], "name": "getResults", "outputs": [{"name": "", "type": "bool"}, {"name": "", "type": "int256[3][3]"}], "type": "function"}, {"constant": true, "inputs": [], "name": "closed", "outputs": [{"name": "", "type": "bool"}], "type": "function"}, {"constant": false, "inputs": [{"name": "_visibilities", "type": "bool[3]"}], "name": "close", "outputs": [{"name": "", "type": "bool"}], "type": "function"}, {"constant": false, "inputs": [], "name": "mySubmission", "outputs": [{"name": "", "type": "bool"}, {"name": "", "type": "uint8[3]"}], "type": "function"}, {"constant": false, "inputs": [{"name": "answ", "type": "uint8[3]"}], "name": "submit", "outputs": [{"name": "", "type": "bool"}], "type": "function"}, {"inputs": [{"name": "quests", "type": "bytes32[3]"}, {"name": "answ", "type": "bytes32[3]"}], "type": "constructor"}, {"anonymous": false, "inputs": [{"indexed": false, "name": "results", "type": "int256[3][3]"}], "name": "newResults", "type": "event"}, {"anonymous": false, "inputs": [{"indexed": false, "name": "results", "type": "int256[3][3]"}], "name": "over", "type": "event"}]


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
    
    function submit(uint8[3] answ) onlyOpened onlyCollab onlyOnce returns(bool){
        
        if( !isSubmissionValid(answ) ) throw;
        
        submissions[msg.sender] = answ;
        hasSubmitted[msg.sender] = true;
        
        for(uint8 i=0;i<results.length;i++){
            results[i][answ[i]]++;
        }
        
        newResults(results);
        return true;
    }
    
    function close(bool[3] _visibilities) onlyAdmin onlyOpened returns(bool){
        visibilities = _visibilities;
        closed = true;
        over(resultsWithVisibilityFilter());
        return true;
    }
    
    function mySubmission() returns(bool,uint8[3]) {
        if( msg.sender == admin ) throw;
        if( !hasSubmitted[msg.sender] ) throw;
        else return (true,submissions[msg.sender]);
    }
    
    function getResults() returns(bool, int[3][3] ){
        if( msg.sender == admin ) return (true,results);
        else if( closed ) return (true,resultsWithVisibilityFilter());
        else throw;
    }
    
    function getVisibilities() onlyAdmin returns(bool, bool[3] )  {
        return (true,visibilities);
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