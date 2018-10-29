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

### Promises

To use all the defaults:
```js
import portMe from 'port-me'

portMe()
  .then(port => console.log(`port = ${port}`))
  .catch(err => console.log(`error = ${err.message}`))
```

To use with [options](#options):
```js
import portMe from 'port-me'

const opts = {
  min: 1025,
  max: 65535,
  maxAttempts: 50
}

portMe(opts)
  .then(port => console.log(`port = ${port}`))
  .catch(err => console.log(`error = ${err.message}`))
```

### Callbacks

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

To use an [options](#options) object instead:
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

## Options
### min - *number {default: 1025}*

The minimum number to use to find a port. This returned port will be equal or greater than this value.

### max - *number {default: 65535}*

The maximum number to use to find a port. This returned port will be equal or less than this value.

### maxAttempts - *number {default: 50}*

The maximum number of times portMe will attempt to find a port between the specified min and max values

## Caveat
There is a very tiny chance of a race condition if another service starts using the same port number as you in between the time you get the port number and you actually start using it.
