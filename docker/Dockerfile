#----------------------------
#-------- SRC IMAGE ---------
#----------------------------

FROM nodesource/trusty:6.3.0

#----------------------------
#-------- VARIABLES ---------
#----------------------------

ENV ROOT /home

ENV GETH_DATA_PATH $ROOT/geth
ENV NODE_DATA_PATH $ROOT/node

ENV ETHEREUM_CONFIG_FILE_PATH $NODE_DATA_PATH/ethereum.json
ENV GETH_STATIC_NODE_FILE_PATH $GETH_DATA_PATH/static-nodes.json
ENV CONTRACT_SOURCES $GETH_DATA_PATH/contract.sol
ENV CONTRACT_JS $GETH_DATA_PATH/contract.js

ENV TMP_INIT_LOG $GETH_DATA_PATH/init.tmp.log

ENV DEBIAN_FRONTEND noninteractive

ENV BOOTNODE_TCP_PORT 30301
ENV BOOTNODE_UDP_PORT 30302 
ENV GETH_TCP_PORT 30303
ENV GETH_UDP_PORT 30304
ENV NETWORK_ID 100
ENV RPC_ADDRESS 0.0.0.0
ENV RPC_PORT 3001
ENV NODE_PORT 3000
ENV NODE_BACK_PORT 8000
ENV ETHEREUM_NETWOR_ID 100

COPY docker/startup.sh $ROOT
COPY geth/contract.js geth/contract.sol geth/genesis.json geth/initialization.js geth/mine.js $GETH_DATA_PATH/
COPY node/*.js node/.* node/*.json $NODE_DATA_PATH/
COPY node/app $NODE_DATA_PATH/app
COPY node/server $NODE_DATA_PATH/server

RUN apt-get update 																	&& \
	apt-get upgrade -y																&& \
	apt-get dist-upgrade -y 														&& \
	apt-get install -y --no-install-recommends software-properties-common 			&& \
	add-apt-repository -y ppa:ethereum/ethereum 									&& \
	apt-get update 																	&& \
	apt-get install -y --no-install-recommends geth bootnode solc jq 				&& \
	bootnode --genkey=$GETH_DATA_PATH/boot.key										&& \
	bootnode -nodekey $GETH_DATA_PATH/boot.key -writeaddress > $GETH_DATA_PATH/pub.key 						&& \			
	mkdir $GETH_DATA_PATH/tmp 														&& \
	#cd en attente de bug fix solc
	cd  $GETH_DATA_PATH 															&& \
	solc --bin -o $GETH_DATA_PATH/tmp contract.sol 									&& \
	solc --abi -o $GETH_DATA_PATH/tmp contract.sol 									&& \
	cd / 																			&& \
	sed -i -e "s/CONTRACT_SOURCE_ABI/$(cat $GETH_DATA_PATH/tmp/RHChain.abi)/" $CONTRACT_JS 					&& \
	sed -i -e "s/CONTRACT_SOURCE_BIN/0x$(sed 's:/:\\/:g' $GETH_DATA_PATH/tmp/RHChain.bin)/" $CONTRACT_JS 	&& \
	geth --datadir $GETH_DATA_PATH --nodiscover --ipcdisable init $GETH_DATA_PATH/genesis.json 				&& \
	geth --datadir $GETH_DATA_PATH --jspath $GETH_DATA_PATH --nodiscover --ipcdisable js $GETH_DATA_PATH/initialization.js > $TMP_INIT_LOG && \
	sed -i -- 's#"CONTRACT_ABI"#'$( cat $GETH_DATA_PATH/tmp/RHChain.abi)'#g' $ETHEREUM_CONFIG_FILE_PATH && \
	sed -i -- 's#CONTRACT_ADDRESS#'$(grep -oP "(?<=CONTRACT_ADDRESS:).*" $TMP_INIT_LOG)'#g' $ETHEREUM_CONFIG_FILE_PATH && \
	sed -i -- 's#ACCOUNT_ADDRESS#'$(grep -oP "(?<=ADMIN_ADDRESS:).*" $TMP_INIT_LOG)'#g' $ETHEREUM_CONFIG_FILE_PATH && \
	echo "[\""$(grep -oP "(?<=ENODE:).*" $TMP_INIT_LOG)"\"]" > $GETH_STATIC_NODE_FILE_PATH && \
	rm $TMP_INIT_LOG $CONTRACT_JS $CONTRACT_SOURCES 								&& \
  	chmod +x $ROOT/startup.sh														&& \
	npm install --prefix $NODE_DATA_PATH 											

EXPOSE $GETH_TCP_PORT
EXPOSE $GETH_UDP_PORT
EXPOSE $NODE_PORT
EXPOSE $NODE_BACK_PORT
EXPOSE $RPC_PORT
EXPOSE $BOOTNODE_TCP_PORT
EXPOSE $BOOTNODE_UDP_PORT


RUN echo "###############" && \
	echo "BOOTNODE : "$(cat $GETH_DATA_PATH/pub.key) && \
	echo "CONTRACT : "$(cat $ETHEREUM_CONFIG_FILE_PATH)

CMD $ROOT/startup.sh $GETH_DATA_PATH $GETH_TCP_PORT $NODE_DATA_PATH $GETH_STATIC_NODE_FILE_PATH $NETWORK_ID $RPC_ADDRESS $RPC_PORT $GETH_STATIC_NODE_FILE_PATH $BOOTNODE_TCP_PORT $BOOTNODE_UDP_PORT
