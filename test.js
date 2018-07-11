const nanoid = require('nanoid')

const check = require('./index')

describe('check', () => {
  describe('required env', () => {
    it('should pass if required env is set', () => {
      const [key] = setRandomEnv()
      check({
        [key]: true
      })
    })

    it('should fail if required env is not set', () => {
      expect.assertions(1)
      const key = nanoid()
      try {
        check({
          [key]: true
        })
      } catch (err) {
        expect(err.message).toBe(`Env ${key} is required but not set`)
      }
    })
  })

  describe('default value', () => {
    it('should use given value if env is set', () => {
      const [key, value] = setRandomEnv()
      check({
        [key]: value
      })
    })

    it('should use default value if env is not set', () => {
      const key = nanoid()
      const defaultValue = 'Hello World'
      check({
        [key]: defaultValue
      })
      expect(process.env[key]).toBe(defaultValue)
    })
  })

  describe('validator', () => {
    const validator = (value) => value === 'Bob'

    it('should pass if the env pass the validation', () => {
      const [key] = setRandomEnv('Bob')
      check({
        [key]: validator
      })
    })

    it('should fail if the env is not set', () => {
      expect.assertions(1)
      const key = nanoid()
      try {
        check({
          [key]: validator
        })
      } catch (e) {
        expect(e.message).toBe(`Env ${key} is required but not set`)
      }
    })

    it('should fail if the env does not pass the validation', () => {
      expect.assertions(1)
      const [key] = setRandomEnv()
      try {
        check({
          [key]: validator
        })
      } catch (e) {
        expect(e.message).toBe(`Env ${key} is invalid`)
      }
    })
  })

  describe('default value and validator', () => {
    const validator = (value) => value === 'Bob'

    it('should pass if env is set with valid value', () => {
      const [key] = setRandomEnv('Bob')
      check({
        [key]: ['Alice', validator]
      })
    })

    it('should pass if env is not set but the default value is valid', () => {
      const key = nanoid()
      check({
        [key]: ['Bob', validator]
      })
    })

    it('should fail if env is set with invalid value', () => {
      expect.assertions(1)
      const [key] = setRandomEnv()
      try {
        check({
          [key]: ['Alice', validator]
        })
      } catch (e) {
        expect(e.message).toBe(`Env ${key} is invalid`)
      }
    })

    it('should fail if env is not set and the default value is invalid', () => {
      expect.assertions(1)
      const key = nanoid()
      try {
        check({
          [key]: ['Alice', validator]
        })
      } catch (e) {
        expect(e.message).toBe(`Env ${key} is invalid`)
      }
    })
  })
})

function setRandomEnv (value) {
  const envKey = nanoid()
  const envValue = value !== undefined ? value : nanoid()
  process.env[envKey] = envValue
  return [envKey, envValue]
}
