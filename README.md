# Installation

## from sources (latest version)

```bash
git clone https://gitlab-toulouse.sqli.com/blockchain-nantes/RHChain.git

cd RHChain/

docker build -t rhchain -f docker/Dockerfile .

```

## from dockerhub (old version)

```bash
docker pull gunicolas/rhchain
```

# Run

:warning: Use ```gunicolas/rhchain``` if you downloaded image from dockerhub

## As admin

```bash
docker run -ti --rm -p 3000:3000 -p 30303:30303 -p 3001:3001 rhchain
```


## As user

```bash
docker run -ti --rm -p 3000:3000 -p 30303:30303 -p 3001:3001 -e BOOTNODE="ADMIN_IP" rhchain
```

Replace *ADMIN_IP* by ip of the machine running the admin container

## Local 

If you want to run the demo on a single machine, modify port mapping between host and container to prevent conflicts, for example : 

```bash
docker run -ti --rm -p 3010:3000 -p 30313:30303 -p 3011:3001 -e BOOTNODE="ADMIN_CONTAINER_IP" rhchain
```

Replace *ADMIN_CONTAINER_IP* by ip of the container running as admin.

### Find Admin container IP

You can find the ip using :
```bash
docker ps
```
locate admin **CONTAINER ID** (first column in the response).

Then :
```bash
docker inspect CONTAINER_ID | grep IPAddress
```


