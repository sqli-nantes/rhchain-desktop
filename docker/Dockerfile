FROM nodesource/trusty:5.11.0

ENV GETH_DATA_PATH /home/geth
ENV NODE_DATA_PATH /home/node

ENV GETH_STATIC_NODE_FILE_PATH $GETH_DATA_PATH/static-nodes.json
ENV IPC_FILE_PATH $NODE_DATA_PATH/ethereum.ipc 
ENV ETHEREUM_CONFIG_FILE_PATH $NODE_DATA_PATH/ethereum.json

ENV TMP_INIT_LOG $GETH_DATA_PATH/init.tmp.log
ENV TMP_CONTRACT_INFO $GETH_DATA_PATH/abi.json

ENV DEBIAN_FRONTEND noninteractive

ENV GETH_PORT 30303


COPY geth/contract.js geth/genesis.json geth/initialization.js geth/static-nodes.json $GETH_DATA_PATH/
COPY node/app $NODE_DATA_PATH/
COPY node/*.js node/.* node/*.json $NODE_DATA_PATH/ 
COPY docker/startup.sh /home/


RUN apt-get update && \
   apt-get upgrade -y && \
   apt-get dist-upgrade -y && \
   apt-get install -y software-properties-common && \
   add-apt-repository -y ppa:ethereum/ethereum && \
   add-apt-repository -y ppa:ethereum/ethereum-dev && \
   apt-get update && \
   apt-get install -y geth solc jq


RUN geth --datadir . --networkid "100" init $GETH_DATA_PATH/genesis.json
RUN geth --datadir . --networkid "100" --jspath "." js $GETH_DATA_PATH/initialization.js > $TMP_INIT_LOG

RUN sed -i -- 's#GETH_DATA_PATH#'$GETH_DATA_PATH'#g' $ETHEREUM_CONFIG_FILE_PATH
RUN sed -i -- 's#IPC_FILE_PATH#'$IPC_FILE_PATH'#g' $ETHEREUM_CONFIG_FILE_PATH
RUN sed -i -- 's#"CONTRACT_ABI"#'$( cat $TMP_CONTRACT_INFO | jq -c .abiDefinition )'#g' $ETHEREUM_CONFIG_FILE_PATH
RUN sed -i -- 's#CONTRACT_ADDRESS#'$(grep -oP "(?<=###{CONTRACT_ADDRESS:).*(?=}###)" $TMP_INIT_LOG)'#g' ETHEREUM_CONFIG_FILE_PATH
RUN sed -i -- 's#ACCOUNT_ADDRESS#'$(grep -oP "(?<=###{ADMIN_ADDRESS:).*(?=}###)" $TMP_INIT_LOG)'#g' ETHEREUM_CONFIG_FILE_PATH

RUN sed -i -- 's#ID#'$(grep -oP "(?<=###{ENODE:).*(?=}###)" $TMP_INIT_LOG)'#g' $GETH_STATIC_NODE_FILE_PATH
RUN sed -i -- 's#PORT#'$GETH_PORT'#g' $GETH_STATIC_NODE_FILE_PATH

CMD /home/startup.sh $IP $GETH_DATA_PATH $GETH_PORT $NODE_DATA_PATH