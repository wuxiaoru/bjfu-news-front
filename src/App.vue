<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<style>
</style>

<script>
export default {
	name: "app",
	mounted(){
	 window.onbeforeunload = function (e) {
        var storage = window.localStorage;
        storage.clear()
      }
	}
}
 
</script>
