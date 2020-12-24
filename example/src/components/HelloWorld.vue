<template>
  <h1>{{ msg }}</h1>
  <input v-model="model">
  <input v-model="llamaModel">
</template>

<script>
import { ref } from 'vue'
import { createModel, modelProps } from '/@createVModel/index.js'

export default {
  name: 'HelloWorld',
  props: {
    msg: String,
    ...modelProps(),
    ...modelProps({ modelName: 'llama' })
  },
  setup(props, { attrs }) {
    const count = ref(0)
    const model = createModel({ props })
    const llamaModel = createModel({ props, modelName: 'llama' })

    return { count, model, llamaModel }
  }
}
</script>
