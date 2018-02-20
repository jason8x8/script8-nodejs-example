# Script8 Node.js Quick Start Guide

This guide will walk you through deploying a Node.js for Script8 service development

## Dowload ngrok

go to https://ngrok.com/download to download ngrok

## Usage

```console
$ git clone https://github.com/jason8x8/script8-nodejs-example.git
$ cd script8-nodejs-example
$ npm install --save 
$ node server.js
$ ./ngrok http 5000

Login to Script8 developer console, and copy the https URL shown on ngrok to 
the voiceWebHookHttpURL of a script8 developer account and, LoggerURL to /logger, 
and set http method to either GET or POST. 

Once the settings are done, you may dial the DID on the script8 account, and 
the xml/cpxml-helloworld.xml will be pulled to execute on Script8 service  platform.

```

## Additional Resources

