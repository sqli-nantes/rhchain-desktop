#!/bin/bash

if [ ${BOOTNODE} ];then
	sed -i -- 's#\[::\]#'$BOOTNODE'#g' $GETH_STATIC_NODE_FILE_PATH
	rm $GETH_DATA_PATH/nodekey 
else
	rm $GETH_STATIC_NODE_FILE_PATH
fi

npm start --prefix $NODE_DATA_PATH &

geth --datadir $GETH_DATA_PATH --networkid $NETWORK_ID --port $GETH_PORT --ipcdisable --rpc --rpcaddr $RPC_ADDRESS --rpcport $RPC_PORT --rpccorsdomain "*" --rpcapi "admin,db,eth,debug,miner,net,shh,txpool,personal,web3"
