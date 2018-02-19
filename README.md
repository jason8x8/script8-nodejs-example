# Script8 Node.js Quick Start Guide

This guide will walk you through deploying a Node.js application on [Deis Workflow][].

## Dowload ngrok

go to https://ngrok.com/download to download ngrok

## Usage

```console
$ git clone https://github.com/jason8x8/script8-nodejs-example.git
$ cd script8-nodejs-example
$ npm install --save 
$ node server.js
$ ./ngrok http 5000

Copy the https URL shown on ngrok, configure Script8 developer account set it as voiceWebHookHttpURL, and http method GET or POST
```

## Additional Resources

