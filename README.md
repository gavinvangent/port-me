[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![Build Status](https://travis-ci.org/gavinvangent/port-me.svg?branch=master)](https://travis-ci.org/gavinvangent/port-me)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/1fc5f6e4b75c4e858abc8b3594afc750)](https://app.codacy.com/app/gavinvangent/port-me?utm_source=github.com&utm_medium=referral&utm_content=gavinvangent/port-me&utm_campaign=Badge_Grade_Dashboard)
[![Codacy Badge](https://api.codacy.com/project/badge/Coverage/1fc5f6e4b75c4e858abc8b3594afc750)](https://www.codacy.com/app/gavinvangent/port-me?utm_source=github.com&utm_medium=referral&utm_content=gavinvangent/port-me&utm_campaign=Badge_Coverage)
[![GitHub issues](https://img.shields.io/github/issues/gavinvangent/port-me.svg)](https://github.com/gavinvangent/port-me/issues)
[![GitHub stars](https://img.shields.io/github/stars/gavinvangent/port-me.svg)](https://github.com/gavinvangent/port-me/stargazers)
![npm](https://img.shields.io/npm/dw/port-me.svg)


# port-me
A nodejs library to get an available port

## Installation

```sh
npm install port-me
```

## How to use

To use all the defaults:
```js
import portMe from 'port-me'
portMe((err, port) => {
  console.log('port', port)
})
```

To specify min and max port:
```js
import portMe from 'port-me'

const min = 5000
const max = 5050

portMe(min, max, (err, port) => {
  console.log('port', port)
})
```

To specify a max attempt count:
```js
import portMe from 'port-me'

const min = 5000
const max = 5050
const maxAttempts = 5

portMe(min, max, (err, port) => {
  console.log('port', port)
}, maxAttempts)
```

To use an options object instead:
```js
import portMe from 'port-me'

const opts = {
  min: 5000,
  max: 5050,
  matAttempts: 5
}

portMe(opts, (err, port) => {
  console.log('port', port)
})
```

## Defaults
- Min port = 1024
- Max port = 65535
- Max attempts = 50

## Caveat
There is a very tiny chance of a race condition if another service starts using the same port number as you in between the time you get the port number and you actually start using it.

## In the pipeline
- Promises