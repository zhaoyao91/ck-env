function check (config) {
  for (let key in config) {
    if (!config.hasOwnProperty(key)) continue
    const value = config[key]
    checkItem(key, value)
  }
}

module.exports = check

function checkItem (key, value) {
  if (value === false) return
  else if (value === true) checkRequiredItem(key, value)
  else if (typeof value === 'string') checkDefaultValue(key, value)
  else if (typeof value === 'function') checkValidator(key, value)
  else if (Array.isArray(value) && typeof value[0] === 'string' && typeof value[1] === 'function') checkDefaultValueAndValidator(key, value)
  else throw new TypeError(`Invalid config for env '${key}'`)
}

function checkRequiredItem (key, value) {
  if (process.env[key] === undefined) throw new Error(`Env ${key} is required but not set`)
}

function checkDefaultValue (key, value) {
  if (process.env[key] === undefined) process.env[key] = value
}

function checkValidator (key, value) {
  checkRequiredItem(key, value)
  const valid = value(process.env[key])
  if (!valid) throw new Error(`Env ${key} is invalid`)
}

function checkDefaultValueAndValidator (key, value) {
  checkDefaultValue(key, value[0])
  checkValidator(key, value[1])
}
