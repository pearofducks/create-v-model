<template>
  <h1>{{ msg }}</h1>
  <input v-model="model">
  <input v-model="llamaModel">
</template>

<script>
import { ref } from 'vue'
import { createModel, modelProps, modelEmits } from '/@createVModel/index.js'

export default {
  name: 'HelloWorld',
  emits: modelEmits(),
  props: {
    msg: String,
    ...modelProps(),
    ...modelProps({ modelName: 'llama' })
  },
  setup(props, { emit }) {
    const count = ref(0)
    const model = createModel({ props, emit })
    const llamaModel = createModel({ props, emit, modelName: 'llama' })

    return { count, model, llamaModel }
  }
}
</script>
