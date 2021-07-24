[![node-red-contrib](https://img.shields.io/badge/node--red-node--red--contrib--wh2600-aa4444.svg?style=flat-square)](https://flows.nodered.org/node/node-red-contrib-wh2600)
[![npm](https://img.shields.io/npm/v/node-red-contrib-wh2600.svg?style=flat-square)](https://www.npmjs.com/package/node-red-contrib-wh2600)

# node-red-contrib-wh2600

WH2600 weather station nodes for Node-RED.

## Description

This contrib module for [Node-RED](https://nodered.org/) provides a status node to get the current weather data of a WH2600 weather station. The weather station is distributed under different names: FOSHK WH2600, Froggit WH2600 / WH2601 / WH2600 SE, Conrad Renkforce WH2600 and Ambient Weather WS-1400. The weather logger does not provide a native api, so we load and parse the live data page:

- [http://ip-of-weather-station/livedata.html](http://ip-of-weather-station/livedata.html)

## Nodes

### wh2600 status

Node to get the current weather data.

![wh2600 status](.assets/wh2600-status.png)

## Constraint

This module is not associated with any of the weather station manufacturers.
