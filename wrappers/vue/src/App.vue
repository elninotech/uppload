<template>
  <div id="app">
    <UpploadVue v-model="url">
      <button>Select an image</button>
    </UpploadVue>
    <img alt="" :src="url">
  </div>
</template>

<script>
import UpploadVue from "./components/UpploadVue.vue"

export default {
  name: "app",
  components: {
    UpploadVue
  },
  data: () => {
    return {
      url: "https://images.unsplash.com/photo-1559403835-749f5ef10e7f?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=400&ixid=eyJhcHBfaWQiOjF9&ixlib=rb-1.2.1&q=80&w=400"
    }
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
button {
  font: inherit;
  font-size: 110%;
}
img {
  margin-top: 5rem;
  max-width: 15rem;
}
</style>
