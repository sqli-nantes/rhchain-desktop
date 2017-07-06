# Command-line version of rhchain demo (no docker)

## Install

1. Download tools

```bash

apt-get install -y --no-install-recommends software-properties-common
add-apt-repository -y ppa:ethereum/ethereum
apt-get update
apt-get install -y --no-install-recommends geth solc jq

```

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

```bash
> ./start.sh "$enode"
```

$enode is bootnode public url (enode://pub_key@ip:port?discport:port+1)

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
