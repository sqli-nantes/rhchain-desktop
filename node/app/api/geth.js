var BigNumber = require('bignumber.js')
BigNumber.config({ERRORS: false});
// var fs = require('fs');

import {create} from '../utils/web3IPCExtension';
import ethereumConfig from '../../ethereum.json';

function extractMessage(errorObject){return !errorObject ? null : errorObject.message.split(':')[1];};

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

function waitTxMining(txHash, onSuccess , onFail){
    var filter = web3.eth.filter("latest").watch(function(errWatch,blockHash){

        if( errWatch ){
            console.log(errWatch);
            onFail(extractMessage(errWatch));
            return;
        }

        web3.eth.getBlock(blockHash,function(errBlock,block){

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

export const web3 = create();
export const contract = web3.eth.contract(ethereumConfig.contractAbi).at(ethereumConfig.contractAddress);
export const GAS = 900000;

export function unlockAccount60Sec(address,password,onSuccess,onFail){

     web3.personal.unlockAccount(
        address,
        password,
        60,(errUnlock,unlocked)=>{
            if( !errUnlock && unlocked ){
                isAdmin(onSuccess,onFail);
            }
            else onFail(errUnlock);
        }
    );
}

export function getCoinbase(onSuccess,onFail){
    web3.eth.getCoinbase((errCoinbase,coinbase)=>{
        if( errCoinbase ) onFail(errCoinbase);
        onSuccess(coinbase);
    });
}

export function submitAnswers(answers, onSuccess, onFail){
    getCoinbase(
        (coinbase)=>{
                        unlockAccount60Sec( coinbase,
                                            localStorage.getItem('passwd'),
                                            ()=>contract.submit.sendTransaction(
                                                    answers,
                                                    {from:coinbase,gas:GAS},
                                                    (errTx,txHash)=>{
                                                        waitTxMining(txHash,onSuccess, onFail)
                                                    }),
                                            (errUnlock)=>onFail(extractMessage(errUnlock))
                        );
        },
        onFail);
   
}

export function adminNewResultsSubscription(onSuccess,onFail){
    contract.newResults((error,ret) => {
        if( !error ) onSuccess(formatResults(ret.args.results));
        else onFail(extractMessage(error));
    });
}
export function adminOpenedSubscription(onSuccess,onFail){
    contract.opened((error,ret) => {
        if( !error ) onSuccess();
        else onFail(extractMessage(error));
    });
}
export function adminClosedSubscription(onSuccess,onFail){
    contract.closed((error,ret) => {
        if( !error ) onSuccess();
        else onFail(extractMessage(error));
    });
}

export function collabEventSubscription(onSuccess,onFail){
    contract.over((error,ret)=>{
        if( !error ) onSuccess(formatResults(ret.args.results));
        else onFail(extractMessage(error));
    });
}

// If vote is closed or not
export function getVoteState(onSuccess,onFail){
    getCoinbase(
        (coinbase)=>{
            contract.closed((err,res)=>{
                if( !err ){
                    if( res ){
                        contract.getResults.call(
                            {from:coinbase,gas:GAS},
                            (err,results)=>{
                                if( !err ) onSuccess(formatResults(results[1]));
                                else onFail(extractMessage(err));
                            }
                        )
                    }
                }
                else onFail(extractMessage(err));
            });
        },
        onFail
    );
}

export function getLabels(onSuccess,onFail){

    // question + answer hash
    // question + answer string
}

export function getAdminVisibilities(onSuccess,onFail){
    contract.getVisibilities.call((err,value)=>{
        if( !err ){
            if( value[0] ){
                value[1].map((questionVisibility,index)=>{
                    onSuccess(index,questionVisibility);
                });
            }
        } else onFail(extractMessage(err));
    });
}

export function getAdminResults(onSuccess,onFail){
    contract.getResults.call((err,value)=>{
        if( err ) onFail(extractMessage(err));
        if( value[0] ) onSuccess(formatResults(value[1]));
    });
}

export function getCollabSubmission(onResult,onSuccess,onFail){
    getCoinbase(
        (coinbase)=>{
            contract.mySubmission.call(
                {from:coinbase,gas:GAS},
                (err,value)=>{
                    if( err ){
                      onFail(extractMessage(err));
                      return;
                    }
                    if( value[0] ){
                        value[1].map((questionAnswer,index)=>{
                            onResult(index,questionAnswer);
                        });
                        onSuccess();
                    }
                }
            );
        },
        onFail
    );
}

export function publishVote(visibilities,onSuccess,onFail){

    getCoinbase(
        (coinbase)=>{
                        unlockAccount60Sec( coinbase,
                                            localStorage.getItem('passwd'),
                                            ()=> contract.publish.sendTransaction(
                                                        visibilities,
                                                        {from:coinbase,gas:GAS},
                                                        function(errTx,txHash){
                                                            waitTxMining(txHash, onSuccess, onFail)
                                                        }),
                                            (errUnlock)=>onFail(extractMessage(errUnlock))
                        );
        },
        onFail);
    
}

export function createAccount(password,onSuccess,onFail){

    web3.personal.newAccount(password,function(err,address){
        if( err ){ console.log(err);onFail();return; }

        web3.miner.setEtherbase(address,(errBase, set)=>{

            if( errBase || !set ) onFail();
            else onSuccess();
        });
    })
}

export function mineOneBlock(onSuccess,onFail){

    getCoinbase(
        (coinbase)=>{
            web3.miner.start((errStart,resStart)=>{
                if( !errStart ){
                    var filter = web3.eth.filter("latest").watch(function(errWatch,blockHash){
                        if( !errWatch ){
                            web3.eth.getBlock(blockHash,function(errBlock,block){
                                if( !errBlock ){
                                    if( block.miner == coinbase ){
                                        filter.stopWatching();
                                        web3.miner.stop((errStop,resStop)=>{
                                            if( !errStop ) onSuccess();
                                            else onFail(extractMessage(errStop));
                                        });
                                    }
                                } else onFail(extractMessage(errBlock));
                            });
                        } else onFail(extractMessage(errWatch));
                    });
                } else onFail(extractMessage(errStart));
            });
        },
        onFail
    );
}
export function startMiner(){
    web3.miner.start(()=>{console.log("miner démarré")});
}

export function stopMiner(){
    web3.miner.stop(()=>{console.log("miner arrêté")});
}

export function isAdmin(onSuccess,onFail){
    web3.eth.getAccounts((errAccounts,accounts)=>{
        if( errAccounts || accounts.length == 0 ) onFail(errAccounts)
        getCoinbase(
            (coinbase)=> onSuccess(accounts[0] == coinbase),
            onFail
        );
    });
}

export function checkBalance(onSuccess,onFail){
    getCoinbase(
        (coinbase)=>{
            web3.eth.getBalance(coinbase,(err,res)=>{
                if( err ) onFail(extractMessage(err));
                else onSuccess(parseFloat(new BigNumber(res).toFixed()));
            })
        }
    )
}

export function sendMoneyFromCoinBase(destinataire, onSuccess, onFail){
  console.log("get Coinbase");
  //récuperation du compte principal
  getCoinbase((coinbase)=>{
    // Déblocage du compte
    console.log("unlock du compte")
    unlockAccount60Sec(coinbase, localStorage.getItem('passwd'),
      ()=>{
        // Envoie transactions
        console.log("Envoie de 100 wei from ",coinbase,"to ",destinataire);
        web3.eth.sendTransaction({from:coinbase,to:destinataire,value:web3.toWei(0.1,"ether")},
          function(errTx,txHash){
              waitTxMining(txHash, onSuccess, onFail)
          }
        );

      },
      (errUnlock)=>{onFail(extractMessage(errUnlock))}
    )
  });
}

export function getBalance(account, onSuccess, onFail){
    // getCoinbase(
    //     (coinbase)=>{
            web3.eth.getBalance(account,(err,res)=>{
                if( err )onFail(
                  extractMessage(err));
                else onSuccess(
                  parseFloat(new BigNumber(res).toFixed())
                );
            })
        // }
    // )
}

export function getState(onSuccess,onFail){
    contract.state.call((err,value)=>{
        if( err ) onFail(extractMessage(err));
        if( value !== undefined ) onSuccess(value.toNumber());
    });
}

export function close(onSuccess,onFail){
    getCoinbase(
        (coinbase)=>{
            unlockAccount60Sec( 
                coinbase,
                localStorage.getItem('passwd'),
                ()=> contract.close.sendTransaction(
                    {from:coinbase,gas:GAS},
                    function(errTx,txHash){
                        waitTxMining(txHash, onSuccess, onFail)
                    }
                ),
                (errUnlock)=>onFail(extractMessage(errUnlock))
            );
        },
        onFail);
}

export function open(onSuccess,onFail){
    getCoinbase(
        (coinbase)=>{
            unlockAccount60Sec( 
                coinbase,
                localStorage.getItem('passwd'),
                ()=> contract.open.sendTransaction(
                    {from:coinbase,gas:GAS},
                    function(errTx,txHash){
                        waitTxMining(txHash, onSuccess, onFail)
                    }
                ),
                (errUnlock)=>onFail(extractMessage(errUnlock))
            );
        },
        onFail);
}