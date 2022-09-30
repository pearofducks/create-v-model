import { computed } from 'vue'

/**
 * @typedef {import('vue').WritableComputedRef} ModelComputed - Ref containing v-model
 */

const createEmitter = (emit, modelName) => v => emit(`update:${modelName}`, v)
const getModifierName = modelName => modelName === 'modelValue' ? 'modelModifiers' : `${modelName}Modifiers`
const getOnUpdateName = modelName => `onUpdate:${modelName}`
/**
 * @type {() => ({})} emptyObjectFactory
 */
const emptyObjectFactory = () => ({})


/**
 * Creates a factory of createModel functions
 * @arg {object} args
 * @arg {string} [args.modelName = 'modelValue'] - the NAME of the model in v-model:NAME
 * @arg {function} [args.modifier]
 * @returns {function({ props: object, emit?: function }): ModelComputed}
 */
export function createModelFactory({ modelName = 'modelValue', modifier } = {}) {
  return ({ props, emit }) => {
    const setter = emit ? createEmitter(emit, modelName) : props[getOnUpdateName(modelName)]
    const modifierName = getModifierName(modelName)

    return computed({
      get: () => props[modelName],
      set: v => setter(modifier ? modifier(v, props[modifierName]) : v)
    })
  }
}

/**
 * Create a Ref that will get/set the v-model
 * @arg {object} args
 * @arg {object} args.props - the Reactive props object from setup
 * @arg {function} [args.emit] - the emit function from setup
 * @arg {string} [args.modelName = 'modelValue'] - the NAME of the model in v-model:NAME
 * @arg {function} [args.modifier] - a modifier function to be called on each set call
 * @returns {ModelComputed}
 */
export function createModel({ props, emit, modelName = 'modelValue', modifier }) {
  return createModelFactory({ modelName, modifier })({ props, emit })
}

/**
 * Get the props needed to define a v-model
 * @arg {object} args
 * @arg {string} [args.modelName = 'modelValue'] - the NAME of the model in v-model:NAME
 * @arg {any} [args.modelType = null] - the type the model should receive
 * @arg {any} [args.modelDefault] - the default for the model (usually if not set)
 * @arg {any} [args.modifierDefault = emptyObjectFactory] - the default for the modelModifiers value
 * @returns {object} - props specification
 */
export function modelProps({ modelName = 'modelValue', modelType = null, modelDefault, modifierDefault = emptyObjectFactory } = {}) {
  return {
    [modelName]: {
      type: modelType,
      default: modelDefault
    },
    [getModifierName(modelName)]: {
      type: Object,
      default: modifierDefault
    },
    [getOnUpdateName(modelName)]: Function
  }
}

/**
 * @arg {object} args
 * @arg {string} [args.modelName = 'modelValue'] - the NAME of the model in v-model:NAME
 * @returns {Array<string>} - emits specification
 */
export function modelEmits({ modelName = 'modelValue' } = {}) {
  return [`update:${modelName}`]
}
