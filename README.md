# Fastify Template Server

[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/gkampitakis/fastify-template-server/graphs/commit-activity)
![Code Coverage](https://img.shields.io/badge/Coverage-100%25-brightgreen)
[![Build Status](https://travis-ci.com/gkampitakis/fastify-template-server.svg?branch=master)](https://travis-ci.com/gkampitakis/fastify-template-server)
[![Fork](https://img.shields.io/github/forks/gkampitakis/fastify-template-server)](https://github.com/gkampitakis/fastify-template-server/fork) 
[![Ask Me Anything !](https://img.shields.io/badge/Ask%20me-anything-1abc9c.svg)](https://twitter.com/g_kampitakis)


## Description 

A template fastify server with basic functionality and structure ready to fork and spin up a server.

## Contents

This repository is ready for start developing. You can find `controllers` folders where you can register routes and start creating your api. 

Inside this repo you can find `spec` test files. In `package.json` it is specified `100%` coverage you can tweak this number to meet your needs.

In the root folder there is also two Dockerfiles, one for development `Dockerfile.dev` and the `Dockerfile` for production.

Finally you can find to env files, `.env.prd` and `.env.dev`. Depending on the environment you start your server you pull the appropriate env values.

## Usage

### Locally

In order to run this server locally you need to install dependencies with `npm install` 
and then `npm run start`.

### Docker

Build Image:
```bash
docker build . -t fastify-template
# or the dev image
docker build . -f Dockerfile.dev -t fastify-template
```

#### Run Development Image

You can run development Docker and develop your code in two ways

```bash
docker run -p <host-port>:<server-port> --name fastify-template fastify-template
# or with live reload support
docker run -p <host-port>:<server-port> --name fastify-template -v /app/node_modules -v ${PWD}:/app fastify-template
```

### Run Production Image

```bash
docker run -p <host-port>:<server-port> --name fastify-template fastify-template
```

## License 

MIT License

<p align="center">
✌️ <a href="https://github.com/gkampitakis/fastify-template-server/issues/new">For any questions or issues</a> ✌️
</p>
