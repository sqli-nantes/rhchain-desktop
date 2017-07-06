#!/bin/bash

echo "*****CLEAN*****"

source config.sh

if [ $1 -eq 'all' ]; then
    rm -rf $HOME/.ethash
    rm -rf $HOME/.npm
fi;

rm -rf $GETH_DATA_PATH/geth 
rm -rf $GETH_DATA_PATH/keystore 
rm -rf $GETH_DATA_PATH/tmp
rm -rf $TMP_INIT_LOG

rm -rf $NODE_DATA_PATH/node_modules
rm npm-debug.log

cp $CONTRACT_JS.old $CONTRACT_JS
cp $ETHEREUM_CONFIG_FILE_PATH.old $ETHEREUM_CONFIG_FILE_PATH
rm $CONTRACT_JS.old $ETHEREUM_CONFIG_FILE_PATH.old