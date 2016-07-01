#!/bin/bash

sed -i -- 's#\[::\]#'$IP'#g' $GETH_STATIC_NODE_FILE_PATH


npm start --prefix $NODE_DATA_PATH &

geth --datadir $GETH_DATA_PATH --networkid $NETWORK_ID --port $GETH_PORT --ipcdisable --rpc --rpcaddr $RPC_ADDRESS --rpcport $RPC_PORT --rpccorsdomain "*" --rpcapi "admin,db,eth,debug,miner,net,shh,txpool,personal,web3"