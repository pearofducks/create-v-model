# create-v-model

create v-model bindings quickly and easily - without having to remember which props to use

## install

```console
yarn add create-v-model
```

```console
npm install --save create-v-model
```

## use

```js
import { modelProps, createModel } from 'create-v-model'

export default {
  props: {
    ...modelProps()
  },
  setup: (props) => ({
    model: createModel(props)
  })
}
```

## api

### modelProps

Provides all three props used in binding a standard v-model to a component

```js
props: {
  ...modelProps({
    modelType: any,
    modelModifiersDefault: any
  })
}
```

*modelType*:
  - default: null
  - an optional type to specify the model should be

*modelModifiersDefault*:
  - default: {}
  - an optional alternative default for the modelModifiers prop

### createModel

Creates a new `computed` that can be used as a standard `ref` and will reflect changes on v-model

```js
setup: (props) => ({
  model: createModel(props)
})
```

### createModifierModel

Same as `createModel`, but as a higher-order function which takes a `modifier` function and returns a `createModel` function

```js
const myModifier = (val, modifiersObject) => modifiersObject.hello ? 'Hi ' + val : val
const modifiedModelCreator = createModifierModel(myModifier)

export default {
  setup: (props) => ({
    model: modifiedModelCreator(props)
  })
}
```

### namedModelProps

Same as `modelProps`, but as a higher-order function which takes a `name` and returns a `modelProps` function

```js
const createFooProps = namedModelProps('foo')

export default {
  props: {
    ...createFooProps()
  }
}
```

### createNamedModel

Same as `createModel` but as a higher-order function which takes a `name` and returns a `createModel` function

```js
const createFooModel = createNamedModel('foo')

export default {
  setup: (props) => ({
    fooModel: createFooModel()
  })
}
```

### createNamedModifierModel

Same as `createModifierModel` but takes a `name` as the first argument instead of the `modifier` function

```js
const myModifier = (val, modifiersObject) => modifiersObject.hello ? 'Hi ' + val : val
const modifiedFooModelCreator = createNamedModifierModel('foo', myModifier)
```
