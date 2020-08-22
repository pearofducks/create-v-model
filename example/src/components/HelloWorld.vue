<template>
  <h1>{{ msg }}</h1>
  <button @click="count++">count is: {{ count }}</button>
  <p>Edit <code>components/HelloWorld.vue</code> to test hot module replacement.</p>
  <input v-model="model">
</template>

<script>
import { ref } from 'vue'
import { createModel, createNamedModel, namedModelProps, modelProps } from '../vmodel.js'

export default {
  name: 'HelloWorld',
  props: {
    msg: String,
    ...modelProps(),
    ...namedModelProps('foo')
  },
  setup(props, { attrs }) {
    const count = ref(0)
    const model = createNamedModel('foo')(props)

    return { count, model }
  }
}
</script>
