<template>
  <div class="h-screen flex flex-col bg-gray-800 text-white">
    <div class="flex flex-1 overflow-hidden">
      <SideBar />
      <div class="flex-1 flex flex-col">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import SideBar from "./components/SideBarComponents/SideBar.vue";
</script>
<style scoped></style>
