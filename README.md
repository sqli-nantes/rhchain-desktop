# Installation

## from sources (latest version)

```bash
git clone https://gitlab-toulouse.sqli.com/blockchain-nantes/RHChain.git

cd RHChain/

docker build -t rhchain -f docker/Dockerfile .

```

## from dockerhub 

```bash
docker pull sqlinantes/rhchain-desktop
```

# Run

:warning: Use ```sqlinantes/rhchain-desktop``` instead of ```rhchain``` if you downloaded image from dockerhub

## As admin

```bash
docker run -ti --rm -p 3000:3000 -p 30303:30303 -p 3001:3001 -p 8000:8000 rhchain
```


## As user

```bash
docker run -ti --rm -p 3000:3000 -p 30303:30303 -p 3001:3001  -p 8000:8000 -e BOOTNODE="ADMIN_IP" rhchain
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


## DEMO

1. Download image 
    
    ```bash
    docker pull sqlinantes/rhchain-desktop
    ```

2. Launch containers

    Demo requires 2 miners (go-ethereum private network issue). You have to run 2 containers (1 as admin and 1 as collaborator).

    * ADMIN

    ```bash
    docker run -ti --rm -p 3000:3000 -p 30303:30303 -p 3001:3001 -p 8000:8000  sqlinantes/rhchain-desktop
    ```

    * COLLABORATOR
    In another terminal

    ```bash
    docker run -ti --rm -p 4000:3000 -p 40303:30303 -p 4001:3001 -p 9000:8000 -e BOOTNODE="172.17.0.2" sqlinantes/rhchain-desktop
    ```

3. Download rhchain-mobile

    git clone https://github.com/sqli-nantes/rhchain-android.git

4. Get collaborator enode

    in collaborator container type :
    ```
    admin.nodeInfo.id
    ```

5. Inject it into rhchain-mobile

    replace in file ```rhchain-mobile/app/src/main/java/nantes_sqli/rhchain/blockchain/GethConfigConstants.java ```
    the value of ```ENODE_NODE2```

6. Launch the app in an android emulator
7. **[ MOBILE ]** clic on ```créer un compte```
8. **[ MOBILE ]** register then ```OK```
9. **[ DESKTOP-ADMIN ]** connect with the password *admin*
10. **[ DESKTOP-ADMIN ]** clic on the top-right user icon 
11. **[ DESKTOP-ADMIN ]** ```crediter le compte``` then go back to the survey page
12. **[ MOBILE ]** connect with your password set in **8.**
13. **[ MOBILE AND DESKTOP-COLLAB ]** send your survey
14. **[ DESKTOP-ADMIN ]** close the survey with visibility
15. **[ MOBILE AND DESKTOP-COLLAB ]** See the results


