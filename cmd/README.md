# Command-line version of rhchain demo (no docker)

## Install

1. Download tools

```bash

apt-get install -y --no-install-recommends software-properties-common
add-apt-repository -y ppa:ethereum/ethereum
apt-get update
apt-get install -y --no-install-recommends geth solc jq

```

*Tested with geth 1.7 and solc 0.4.16*

2. Create binaries folder

```bash
mkdir bin
```

3. Copy tools to binaries folder

```bash
cp /usr/bin/geth ./bin
cp /usr/bin/solc ./bin
cp /usr/bin/jq ./bin
```

## Start

1. Start bootnode 

    A bootnode is available in project [bootnode](https://github.com/sqli-nantes/rhchain-bootnode)
    Follow the README.md

2. Start desktop-app

    ```bash
    ./install.sh
    ./start.sh "$enode"
    ```

    *$enode* is bootnode public url *
    ( like *enode://pub_key@ip:port?discport:port+1)*
    :warning: use ':' after 'discport' and not '=' 

3. Start mobile-app

    [Clone it](https://github.com/sqli-nantes/rhchain-android).
    
    Replace these [lines](https://github.com/sqli-nantes/rhchain-android/blob/ethmobile/app/src/main/java/com/sqli/blockchain/rhchain/Constants.java#L22-L25) to fit with the same *enode url* than in previous step.

    Replace this [line](https://github.com/sqli-nantes/rhchain-android/blob/ethmobile/app/src/main/java/com/sqli/blockchain/rhchain/Constants.java#L20) with `contractAddress` field value of file `rhchain-desktop/node/ethereum.json` 

    Run the app.

## Stop 

Close geth with :

```js
> exit
```

kill `npm start` and `npm run` processes from command line :
1. Find process id with :
    * `ps -aux | grep "node"`
    * `ps -aux | grep "node"`
2. Kill them : 
    * `kill -9 $id_npm_start`
    * `kill -9 $id_npm_run`
