#----------------------------
#-------- SRC IMAGE --------- 
#----------------------------

FROM nodesource/trusty:5.11.0

#----------------------------
#-------- VARIABLES --------- 
#----------------------------
ENV GETH_DATA_PATH /home/geth
ENV NODE_DATA_PATH /home/node

ENV ETHEREUM_CONFIG_FILE_PATH $NODE_DATA_PATH/ethereum.json
ENV GETH_STATIC_NODE_FILE_PATH $GETH_DATA_PATH/static-nodes.json
ENV CONTRACT_SOURCES $GETH_DATA_PATH/contract.sol
ENV CONTRACT_JS $GETH_DATA_PATH/contract.js

ENV TMP_INIT_LOG $GETH_DATA_PATH/init.tmp.log
ENV TMP_CONTRACT_INFO $GETH_DATA_PATH/abi.json

ENV DEBIAN_FRONTEND noninteractive

ENV GETH_PORT 30303
ENV NETWORK_ID 100
ENV RPC_ADDRESS 0.0.0.0
ENV RPC_PORT 3001

#----------------------------
#------- IMPORT FILES ------- 
#----------------------------

COPY geth/contract.js geth/contract.sol geth/genesis.json geth/initialization.js $GETH_DATA_PATH/
COPY node/app $NODE_DATA_PATH/
COPY node/*.js node/.* node/*.json $NODE_DATA_PATH/ 
COPY docker/startup.sh /home/
RUN chmod +x /home/startup.sh

#----------------------------
#------ INSTALL TOOLS ------- 
#----------------------------

RUN apt-get update && \
   apt-get upgrade -y && \
   apt-get dist-upgrade -y && \
   apt-get install -y software-properties-common && \ 
   add-apt-repository -y ppa:ethereum/ethereum && \
   add-apt-repository -y ppa:ethereum/ethereum-dev && \
   apt-get update && \
   apt-get install -y geth solc jq

#----------------------------
#- EXTRACT CONTRACT SOURCES - 
#----------------------------

RUN sed -i ':a;N;$!ba;s/\n/ /g' $CONTRACT_SOURCES
RUN sed -i -e "s/CONTRACT_SOURCE_CODE/$(sed 's:/:\\/:g' $CONTRACT_SOURCES)/" $CONTRACT_JS

#----------------------------
#------ INIT GETH NODE ------ 
#----------------------------

RUN geth --datadir $GETH_DATA_PATH --networkid "100" init $GETH_DATA_PATH/genesis.json
RUN geth --datadir $GETH_DATA_PATH --networkid "100" --jspath $GETH_DATA_PATH js $GETH_DATA_PATH/initialization.js > $TMP_INIT_LOG

#----------------------------
#---- PREPARE GETH PARAMS --- 
#----------------------------

RUN sed -i -- 's#CONTRACT_ABI#'$( cat $TMP_CONTRACT_INFO | jq -c .abiDefinition )'#g' $ETHEREUM_CONFIG_FILE_PATH
RUN sed -i -- 's#CONTRACT_ADDRESS#'$(grep -oP "(?<=CONTRACT_ADDRESS:).*" $TMP_INIT_LOG)'#g' $ETHEREUM_CONFIG_FILE_PATH
RUN sed -i -- 's#ACCOUNT_ADDRESS#'$(grep -oP "(?<=ADMIN_ADDRESS:).*" $TMP_INIT_LOG)'#g' $ETHEREUM_CONFIG_FILE_PATH
RUN echo "[\""$(grep -oP "(?<=ENODE:).*" $TMP_INIT_LOG)"\"]" > $GETH_STATIC_NODE_FILE_PATH

#----------------------------
#------ EXPOSE PORTS -------- 
#----------------------------

EXPOSE 30303
EXPOSE 3000
EXPOSE 3001

#----------------------------
#-------- ENTRYPOINT -------- 
#----------------------------

CMD /home/startup.sh $IP $GETH_DATA_PATH $GETH_PORT $NODE_DATA_PATH $GETH_STATIC_NODE_FILE_PATH $NETWORK_ID $RPC_ADDRESS $RPC_PORT