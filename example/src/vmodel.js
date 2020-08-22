import { computed } from 'vue'

export const createModel = (props) => computed({
  get: () => props.modelValue,
  set: v => props['onUpdate:modelValue'](v)
})

export const createModifierModel = modifier => props => computed({
  get: () => props.modelValue,
  set: v => props['onUpdate:modelValue'](modifier(v, props.modelModifiers))
})

export const modelProps = (opts = {}) => ({
  modelValue: opts.modelType || null,
  modelModifiers: {
    type: Object,
    default: opts.modelModifierDefault || (() => ({}))
  },
  'onUpdate:modelValue': Function,
})
