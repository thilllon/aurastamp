#!/bin/bash

if [ $# -gt 1 ]; then
  echo "Error: too many arguments"
  echo "Usage: ./test.sh [--help|-h]"
  exit 1
fi

if [ "$1" = "--help" ] || [ "$1" = "-h" ]; then
  echo "Usage: ./test.sh [--help|-h]"
  echo "  --help|-h: show this help"
  exit 0
fi 


