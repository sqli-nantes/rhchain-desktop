#!/bin/bash

Xvfb -ac -screen scrn 1280x2000x24 :99 &

npm start
