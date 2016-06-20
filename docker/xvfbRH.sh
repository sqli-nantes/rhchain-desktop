#!/bin/bash

export LD_LIBRARY_PATH=/usr/lib/x86_64-linux-gnu/

Xvfb :99 -screen 0 1024x768x16  &> xvfb.log &

npm start --prefix /home/node
