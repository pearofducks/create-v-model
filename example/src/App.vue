<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Hello Vue 3.0 + Vite" v-model="normal" v-model:llama="llama" />
  <p><pre><code>normal:{{ normal }}</code></pre></p>
  <p><pre><code>llama:{{ llama }}</code></pre></p>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import { ref } from 'vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  setup() {
    return {
      normal: ref(''),
      llama: ref('')
    }
  }
}
</script>
