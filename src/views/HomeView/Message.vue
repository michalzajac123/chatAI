<template>
  <!-- AI -->
  <div v-if="props.role == 'ai'" class="ai-message flex justify-start">
    <div class="bg-gray-700 text-white p-3 rounded-lg max-w-xs lg:max-w-md">
      {{ props.content }}
    </div>
  </div>
  <!-- User -->
  <div v-else class="user-message flex justify-end">
    <div class="bg-blue-600 text-white p-3 rounded-lg max-w-xs lg:max-w-md">
      {{ props.content }}
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  role: string;
  content: string;
}>();
</script>
