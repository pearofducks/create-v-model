import { computed } from 'vue'

const createEmitter = (emit, modelName) => v => emit(`update:${modelName}`, v)
const getModifierName = modelName => modelName === 'modelValue' ? 'modelModifiers' : `${modelName}Modifiers`
const getOnUpdateName = modelName => `onUpdate:${modelName}`
const emptyObjectFactory = () => ({})

export const createModelFactory = ({ modelName = 'modelValue', modifier } = {}) => {
  return ({ props, emit } = {}) => {
    const setter = emit ? createEmitter(emit, modelName) : props[getOnUpdateName(modelName)]
    const modifierName = getModifierName(modelName)

    return computed({
      get: () => props[modelName],
      set: v => setter(modifier ? modifier(v, props[modifierName]) : v)
    })
  }
}

export const createModel = ({ props, emit, modelName = 'modelValue', modifier } = {}) => createModelFactory({ modelName, modifier })({ props, emit })

export const modelProps = ({ modelName = 'modelValue', modelType = null, modelDefault, modifierDefault = emptyObjectFactory } = {}) => ({
  [modelName]: {
    type: modelType,
    default: modelDefault
  },
  [getModifierName(modelName)]: {
    type: Object,
    default: modifierDefault
  },
  [getOnUpdateName(modelName)]: Function
})
