<template>
  <div id="app">
    <game-table></game-table>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import GameTable from './components/GameTable.vue'

export default {
  name: 'App',
  components: {
    HelloWorld,
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
.block1 {
	float: left;
	width: 100px;
	height: 25vh;
	background-color: red;
}

.block2 {
	float: left;
	width: 100px;
	height: 50vh;
	background-color: blue;
	margin: 0 10px;;
}

.block3 {
	float: left;
	width: 100px;
	height: 100vh;
	background-color: green;
}
</style>
