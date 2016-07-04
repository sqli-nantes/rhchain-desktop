#!/bin/bash

if $IP;then
	sed -i -- 's#\[::\]#'$IP'#g' $GETH_STATIC_NODE_FILE_PATH

# generate another node id
if $IS_ADMIN;then
	rm nodekey 


npm start --prefix $NODE_DATA_PATH &

geth --datadir $GETH_DATA_PATH --networkid $NETWORK_ID --port $GETH_PORT --ipcdisable --rpc --rpcaddr $RPC_ADDRESS --rpcport $RPC_PORT --rpccorsdomain "*" --rpcapi "admin,db,eth,debug,miner,net,shh,txpool,personal,web3"

e9be49ca67fba277187fb1d499d8f8c55186047337db0f3af434036a3e9a9e593b054a67ec4b11734e4350726307e339faaf0d8e03e9859fe1204dbe2d6a32b9