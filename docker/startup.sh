#!/bin/bash

npm start --prefix $NODE_DATA_PATH &
npm run server --prefix $NODE_DATA_PATH -- --port $NODE_BACK_PORT &


geth 	--datadir $GETH_DATA_PATH \
		--networkid $NETWORK_ID \
		--port $GETH_TCP_PORT \
		--ipcdisable \
		--rpc \
		--rpcaddr $RPC_ADDRESS \
		--rpcport $RPC_PORT \
		--rpccorsdomain "*" \
		--rpcapi "admin,db,eth,debug,miner,net,shh,txpool,personal,web3" \
		--preload $GETH_DATA_PATH/mine.js \
		--v5disc \
		--lightserv 90 \
		--bootnodes=$BOOTNODE \
		console



