# CK Env (check env)

Check and ensure environment variables.

## Abilities

- Check existence
- Validate value
- Set default value

## Features

- No dependencies
- Simple and easy to use
- Extensible for validation
- Throw error instead of killing the app
- Not assuming the place where the config comes from

## Installation

```
npm install ck-env
```

## Usage

```
const checkEnv = require('ck-env')

checkEnv({
  'ENV_1': true, // this env is required
  'ENV_2': 'default value', // default value will be assigned to this env if it is not set
  'ENV_3': validator // this env is required and the value must pass the given validator

  // default value will be assigned to this env if it is not set
  // the env value, no matter how it is set, would be validated by the given validator
  'ENV_4': ['default value', validator]
})

// validator is a function which receives the env value and tells if it is valid
function validator(value) {
  reutrn ['A', 'B', 'C'].includes(value)
}
```

## License

MIT