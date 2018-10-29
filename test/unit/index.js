/* eslint-env node, mocha */
import assert from 'assert'
import net from 'net'
import portMe from '../../src/index'

describe('PortMe', () => {
  describe('on invalid invocation', () => {
    it('should throw a TypeError if only two arguments are supplied and the first argument is not an object', () => {
      try {
        portMe(1555, () => {})
        assert.fail('Expected portMe(1555, () => {}) to throw an error')
      } catch (err) {
        assert(err instanceof TypeError)
        assert.equal(err.message, 'When invoked with only 2 arguments, PortMe expects the first argument to be an object')
      }
    })

    it('should throw a SyntaxError if five arguments are supplied', () => {
      try {
        portMe(1555, 2000, () => {}, 5, 'hello there')
        assert.fail('Expected portMe(1555, 2000, () => {}, 5, \'hello there\') to throw an error')
      } catch (err) {
        assert(err instanceof SyntaxError)
        assert.equal(err.message, 'PortMe has been invoked incorrectly')
      }
    })
  })

  describe('should return a promise resolving an available port', () => {
    it('if no arguments are supplied', () => {
      return portMe()
        .then(port => {
          assert(port >= portMe.DEFAULT_MIN, `Expected the port to be equal or greater than ${portMe.DEFAULT_MIN}, got ${port}`)
          assert(port <= portMe.DEFAULT_MAX, `Expected the port to be equal or less than ${portMe.DEFAULT_MAX}, got ${port}`)
        })
    })

    it('if a single non-function argument is supplied', () => {
      const minPort = 1555

      return portMe(minPort)
        .then(port => {
          assert(port >= minPort, `Expected port to be equal or greater than ${minPort}, got ${port}`)
        })
    })

    it('if a single object is supplied', () => {
      const opts = {}

      return portMe(opts)
        .then(port => {
          assert(port >= portMe.DEFAULT_MIN, `Expected the port to be equal or greater than ${portMe.DEFAULT_MIN}, got ${port}`)
          assert(port <= portMe.DEFAULT_MAX, `Expected the port to be equal or less than ${portMe.DEFAULT_MAX}, got ${port}`)
        })
    })

    it('if a single object is supplied', () => {
      const opts = {
        min: 10000,
        max: 11000
      }

      return portMe(opts)
        .then(port => {
          assert(port >= opts.min, `Expected port to be equal or greater than ${opts.min}, got ${port}`)
          assert(port <= opts.max, `Expected port to be equal or less than ${opts.max}, got ${port}`)
        })
    })

    it('if only two arguments are supplied and the second argument is not a function', () => {
      const minPort = 1555
      return portMe({ min: 1555 }, new Date())
        .then(port => {
          assert(port >= minPort, `Expected port to be equal or greater than ${minPort}, got ${port}`)
        })
    })
  })

  describe('should return an available port using callbacks', () => {
    it('when only specifying a callback', done => {
      portMe((err, port) => {
        assert.ifError(err)

        assert(port >= portMe.DEFAULT_MIN, 'Expected port to be larger or equal to the min specified')
        assert(port <= portMe.DEFAULT_MAX, 'Expected port to be smaller or equal to the max specified')
        done()
      })
    })

    it('when using a blank opts argument', done => {
      portMe({ }, (err, port) => {
        assert.ifError(err)

        assert(port >= portMe.DEFAULT_MIN, 'Expected port to be larger or equal to the min specified')
        assert(port <= portMe.DEFAULT_MAX, 'Expected port to be smaller or equal to the max specified')
        done()
      })
    })

    it('when using an opts argument', done => {
      const min = 1555
      const max = 2000
      portMe({ min, max }, (err, port) => {
        assert.ifError(err)

        assert(port >= min, 'Expected port to be larger or equal to the min specified')
        assert(port <= max, 'Expected port to be smaller or equal to the max specified')
        done()
      })
    })

    it('when using min and max arguments', done => {
      const min = 1555
      const max = 2000
      portMe(min, max, (err, port) => {
        assert.ifError(err)

        assert(port >= min, 'Expected port to be larger or equal to the min specified')
        assert(port <= max, 'Expected port to be smaller or equal to the max specified')
        done()
      })
    })
  })

  describe('should reject with an error', () => {
    it('if a port cant be found', () => {
      const port = 10000
      const opts = {
        min: port,
        max: port
      }

      const promise = (resolve, reject) => {
        const server = net.createServer()
        server.listen(port, 'localhost', () => {
          resolve(server)
        })
        server.on('error', err => {
          reject(err)
        })
      }

      return new Promise(promise)
        .then(server => {
          return portMe(opts)
            .then(port => {
              server.close()
              throw new Error('Expected an error to be throw, but wasn\'t')
            }, err => {
              server.close()
              assert(err.message, 'asdf')
            })
        })
    })
  })

  describe('should throw an error', () => {
    it('when no available port is found', done => {
      const min = 1555
      const max = 2000
      portMe(min, max, (err, port) => {
        assert.ifError(err)

        const server = net.createServer()
        server.listen(port, 'localhost', () => {
          portMe(port, port, (err, port) => {
            server.close()

            assert(err instanceof Error, 'Expected err to be an instanceof Error')
            assert.equal(err.message, 'PortMe could not find an available port')
            done()
          })
        })
        server.on('error', err => done(err))
      })
    })
  })
})
