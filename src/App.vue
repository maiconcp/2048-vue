<template>
  <div id="app">
    <game-table></game-table>
  </div>
</template>

<script>
import GameTable from './components/GameTable.vue'

export default {
  name: 'App',
  components: {
    GameTable
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100%;
  height: 100%;
}
html, body {
  height: 100%;
}
body{ 
	margin: 0;
	padding: 0;
}
</style>
