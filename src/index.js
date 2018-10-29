import net from 'net'
import randomInt from 'random-int'

export default function getPort () {
  let min = getPort.DEFAULT_MIN
  let max = getPort.DEFAULT_MAX
  let cb
  let maxAttempts = getPort.DEFAULT_MAX_ATTEMPTS

  switch (arguments.length) {
    case 1:
      if (typeof arguments[0] === 'object') {
        min = arguments[0].min || min
        max = arguments[0].max || max
        maxAttempts = arguments[0].maxAttempts || maxAttempts
      }
      cb = arguments[0]
      break
    case 2:
      if (typeof arguments[0] !== 'object') {
        throw new TypeError('When invoked with only 2 arguments, PortMe expects the first argument to be an object')
      }

      min = arguments[0].min || min
      max = arguments[0].max || max
      maxAttempts = arguments[0].maxAttempts || maxAttempts
      cb = arguments[1]
      break
    case 3:
      min = arguments[0]
      max = arguments[1]
      cb = arguments[2]
      break
    case 4:
      min = arguments[0]
      max = arguments[1]
      cb = arguments[2]
      maxAttempts = arguments[3]
      break
    default:
      throw new SyntaxError('PortMe has been invoked incorrectly')
  }

  const port = randomInt(min, max)

  const server = net.createServer()
  server.listen(port, 'localhost', () => {
    server.once('close', () => cb(null, port))
    server.close()
  })
  server.on('error', () => {
    if (--maxAttempts) {
      return getPort(min, max, cb, maxAttempts)
    }

    cb(new Error('PortMe could not find an available port'))
  })

  if (typeof cb !== 'function') {
    return new Promise((resolve, reject) => {
      cb = err => {
        if (err) {
          return reject(err)
        }

        resolve(port)
      }
    })
  }
}

getPort.DEFAULT_MIN = 1024
getPort.DEFAULT_MAX = 65535
getPort.DEFAULT_MAX_ATTEMPTS = 50
