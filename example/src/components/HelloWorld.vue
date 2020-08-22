<template>
  <h1>{{ msg }}</h1>
  <button @click="count++">count is: {{ count }}</button>
  <p>Edit <code>components/HelloWorld.vue</code> to test hot module replacement.</p>
  <input v-model="model">
</template>

<script>
import { ref } from 'vue'
import { createModel, modelProps } from '../vmodel.js'

export default {
  name: 'HelloWorld',
  props: {
    msg: String,
    ...modelProps()
  },
  setup(props) {
    const count = ref(0)
    const model = createModel(props)

    return { count, model }
  }
}
</script>
