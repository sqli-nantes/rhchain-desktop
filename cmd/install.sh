#!/bin/bash

echo "*****INSTALL*****"

source config.sh

mkdir $GETH_DATA_PATH/tmp
#cd en attente de bug fix solc
cd  $GETH_DATA_PATH 										
$SOLC --bin -o $GETH_DATA_PATH/tmp contract.sol 									
$SOLC --abi -o $GETH_DATA_PATH/tmp contract.sol
cd $HOME 	
cp $CONTRACT_JS $CONTRACT_JS.old					
sed -i -e "s/CONTRACT_SOURCE_ABI/$(cat $GETH_DATA_PATH/tmp/RHChain.abi)/" $CONTRACT_JS 					
sed -i -e "s/CONTRACT_SOURCE_BIN/0x$(sed 's:/:\\/:g' $GETH_DATA_PATH/tmp/RHChain.bin)/" $CONTRACT_JS 	
$GETH --datadir $GETH_DATA_PATH --nodiscover --ipcdisable init $GETH_DATA_PATH/genesis.json 				
$GETH --datadir $GETH_DATA_PATH --jspath $GETH_DATA_PATH --nodiscover --ipcdisable js $GETH_DATA_PATH/initialization.js > $TMP_INIT_LOG 
cp $ETHEREUM_CONFIG_FILE_PATH $ETHEREUM_CONFIG_FILE_PATH.old 
sed -i -- 's#"CONTRACT_ABI"#'$( cat $GETH_DATA_PATH/tmp/RHChain.abi)'#g' $ETHEREUM_CONFIG_FILE_PATH 
sed -i -- 's#CONTRACT_ADDRESS#'$(grep -oP "(?<=CONTRACT_ADDRESS:).*" $TMP_INIT_LOG)'#g' $ETHEREUM_CONFIG_FILE_PATH 
sed -i -- 's#ACCOUNT_ADDRESS#'$(grep -oP "(?<=ADMIN_ADDRESS:).*" $TMP_INIT_LOG)'#g' $ETHEREUM_CONFIG_FILE_PATH 								
													
npm install --prefix $NODE_DATA_PATH 
