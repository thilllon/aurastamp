#!/bin/bash

# rm -rf .next out yarn-error.log
# rm -rf public/sw.js* public/workbox*
# rm -rf storybook-static
# rm -rf cypress/downloads cypress/screenshots cypress/videos
# rm -rf node_modules

yarn rimraf .next out yarn-error.log
yarn rimraf public/sw.js* public/workbox*
yarn rimraf storybook-static
yarn rimraf cypress/downloads cypress/screenshots cypress/videos
# yarn rimraf node_modules

