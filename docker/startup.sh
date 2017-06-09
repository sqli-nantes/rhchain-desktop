#!/bin/bash

if [ ${BOOTNODE} ];then
	sed -i -- 's#\[::\]#'$BOOTNODE'#g' $GETH_STATIC_NODE_FILE_PATH
	rm -rf $GETH_DATA_PATH/geth/nodekey
	echo "-------> NOT ADMIN MODE <--------"
else
	rm $GETH_STATIC_NODE_FILE_PATH
	bootnode -nodekey $GETH_DATA_PATH/boot.key -verbosity 9 -v5 & #-addr ':'$BOOTNODE_TCP_PORT &
	echo "BOOTNODE PUB : "$(cat $GETH_DATA_PATH/pub.key)
	echo "-------> ADMIN MODE <--------"
fi

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
		--bootnodes="enode://"$(cat $GETH_DATA_PATH/pub.key)"@10.33.44.51:"$BOOTNODE_TCP_PORT"?discport:"$BOOTNODE_UDP_PORT \
		console



