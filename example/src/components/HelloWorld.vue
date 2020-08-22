<template>
  <h1>{{ msg }}</h1>
  <button @click="count++">count is: {{ count }}</button>
  <p>Edit <code>components/HelloWorld.vue</code> to test hot module replacement.</p>
  <input v-model="model">
  <input v-model="llamaModel">
</template>

<script>
import { ref } from 'vue'
import { createModel, createNamedModel, namedModelProps, modelProps } from 'create-v-model'

export default {
  name: 'HelloWorld',
  props: {
    msg: String,
    ...modelProps(),
    ...namedModelProps('llama')()
  },
  setup(props, { attrs }) {
    const count = ref(0)
    const model = createModel(props)
    const llamaModel = createNamedModel('llama')(props)

    return { count, model, llamaModel }
  }
}
</script>
