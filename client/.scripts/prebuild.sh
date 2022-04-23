#!/bin/bash

## .babelrc.js tmp로 변경
TMP_FILE=.babelrc.js.tmp
FILE=.babelrc.js

if [ -f "$FILE" ]; then 
    echo "[PRE BUILD HOOK] Detect \"$FILE\""
    if [ -f "$TMP_FILE" ]; then 
        rm $TMP_FILE
        echo "[PRE BUILD HOOK] Remove \"$TMP_FILE\""
    fi    
    mv $FILE $TMP_FILE
    echo "[PRE BUILD HOOK] Rename \"$FILE\" to \"$TMP_FILE\" to enable SWR"
fi
