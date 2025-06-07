<template>
  <HeaderView />
  <div class="flex ">
    <SideBar />
    <router-view></router-view>
  </div>
</template>
<script setup lang="ts">
import HeaderView from "./components/HeaderView.vue";
import SideBar from "./components/SideBar.vue";
</script>
<style scoped>
.content-container {
  
}
</style>
