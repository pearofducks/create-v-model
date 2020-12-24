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
    modelName: string = 'modelValue',
    modelType: any = null,
    modifierDefault: any = (() => ({})) // but you probably want an object factory here of some form
  })
}
```

**modelName**: the name of the model; leave this as the default for plain `v-model`, and otherwise give it the `NAME` in `v-model:NAME`
**modelType**: an optional type to specify the model should be
**modifierDefault**: an optional alternative default for the _modelModifiers_ prop (or equivalent for named models)

### createModel

Creates a new `computed` that can be used as a standard `ref` and will reflect changes on v-model

```js
setup: (props, { emit }) => ({
  model: createModel({
    props,
    emit?, // see below for info about emit being optional
    modelName: string = 'modelValue',
    modifier?: function
  })
})
```

**props**: the props from setup - this is required
**emit**: if emit is provided, then Vue's built-in modifiers (`trim` and `number`) will be enabled - and events will be emitted for updates instead of directly calling the relevant `onUpdate` function directly
**modelName**: the name of the model; leave this as the default for plain `v-model`, and otherwise give it the `NAME` in `v-model:NAME`
**modifier**: a function of the form below, this will be called whenever the model would call `set`
  - `(value: typeof modelType, modelModifiersObject: object) => typeof modelType`


### createModelFactory

Creates a higher-order function, can be useful for hooks and other utilities - otherwise effectively the same as `createModel`

```js
setup: (props, { emit }) => ({
  model: createModelFactory({ modelName, modifier })({ props, emit })
})
```
