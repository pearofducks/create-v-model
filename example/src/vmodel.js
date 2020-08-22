import { computed } from 'vue'

export const createModel = (props) => computed({
  get: () => props.modelValue,
  set: v => props['onUpdate:modelValue'](v)
})

export const createModifierModel = (modifier) => (props) => computed({
  get: () => props.modelValue,
  set: v => props['onUpdate:modelValue'](modifier(v, props.modelModifiers))
})

export const createNamedModel = (modelName) => (props) => computed({
  get: () => props[modelName],
  set: v => props[`onUpdate:${modelName}`](v)
})

export const createNamedModifierModel = (modelName, modifier) => (props) => computed({
  get: () => props[modelName],
  set: v => props[`onUpdate:${modelName}`](modifier(v, props.modelModifiers))
})

export const modelProps = (opts = {}) => ({
  modelValue: opts.modelType || null,
  modelModifiers: {
    type: Object,
    default: opts.modelModifierDefault || (() => ({}))
  },
  'onUpdate:modelValue': Function,
})

export const namedModelProps = (modelName, opts = {}) => ({
  [modelName]: opts.modelType || null,
  [`${modelName}Modifiers`]: {
    type: Object,
    default: opts.modelModifierDefault || (() => ({}))
  },
  [`onUpdate:${modelName}`]: Function,
})
