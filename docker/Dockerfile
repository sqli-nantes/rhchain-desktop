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

ENV GETH_PORT 30303
ENV NETWORK_ID 100
ENV RPC_ADDRESS 0.0.0.0
ENV RPC_PORT 3001
ENV NODE_PORT 3000
ENV ETHEREUM_NETWOR_ID 100

COPY docker/startup.sh $ROOT
COPY geth/contract.js geth/contract.sol geth/genesis.json geth/initialization.js $GETH_DATA_PATH/
COPY node/*.js node/.* node/*.json $NODE_DATA_PATH/ 
COPY node/app $NODE_DATA_PATH/app

RUN apt-get update && \
	apt-get upgrade -y && \
	apt-get dist-upgrade -y && \
	apt-get install -y --no-install-recommends software-properties-common && \ 
	add-apt-repository -y ppa:ethereum/ethereum && \
	apt-get update && \
	apt-get install -y --no-install-recommends geth solc jq && \
	sed -i ':a;N;$!ba;s/\n/ /g' $CONTRACT_SOURCES && \
	sed -i -e "s/CONTRACT_SOURCE_CODE/$(sed 's:/:\\/:g' $CONTRACT_SOURCES)/" $CONTRACT_JS && \
	geth --datadir $GETH_DATA_PATH --networkid $NETWORK_ID --nodiscover --ipcdisable init $GETH_DATA_PATH/genesis.json && \
	geth --datadir $GETH_DATA_PATH --networkid $NETWORK_ID --jspath $GETH_DATA_PATH --nodiscover --ipcdisable js $GETH_DATA_PATH/initialization.js > $TMP_INIT_LOG && \
	npm install --prefix $NODE_DATA_PATH && \
	sed -i -- 's#"CONTRACT_ABI"#'$( grep -Po '(?<=(\-\-\>)).*(?=\<\-\-)' $TMP_INIT_LOG )'#g' $ETHEREUM_CONFIG_FILE_PATH && \
	sed -i -- 's#CONTRACT_ADDRESS#'$(grep -oP "(?<=CONTRACT_ADDRESS:).*" $TMP_INIT_LOG)'#g' $ETHEREUM_CONFIG_FILE_PATH && \
	sed -i -- 's#ACCOUNT_ADDRESS#'$(grep -oP "(?<=ADMIN_ADDRESS:).*" $TMP_INIT_LOG)'#g' $ETHEREUM_CONFIG_FILE_PATH && \
	echo "[\""$(grep -oP "(?<=ENODE:).*" $TMP_INIT_LOG)"\"]" > $GETH_STATIC_NODE_FILE_PATH && \
	rm $TMP_INIT_LOG $CONTRACT_JS $CONTRACT_SOURCES && \
	chmod +x $ROOT/startup.sh 

EXPOSE $GETH_PORT
EXPOSE $NODE_PORT
EXPOSE $RPC_PORT

CMD $ROOT/startup.sh $BOOTNODE $GETH_DATA_PATH $GETH_PORT $NODE_DATA_PATH $GETH_STATIC_NODE_FILE_PATH $NETWORK_ID $RPC_ADDRESS $RPC_PORT $GETH_STATIC_NODE_FILE_PATH

