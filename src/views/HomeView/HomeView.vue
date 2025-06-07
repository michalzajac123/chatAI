<template>
  <div class="flex flex-col h-full bg-gray-800">
    <!-- Header -->
    <div class="p-4 border-b border-gray-700">
      <h1 class="text-xl font-semibold">Model GPT-4</h1>
    </div>

    <!-- Messages -->
    <div class="flex-1 p-6 space-y-4 overflow-y-auto">
      <UserMessage> Cześć! </UserMessage>
      <AiMessage> Witaj! Jak mogę Ci pomóc? </AiMessage>
    </div>
    <InputView/>
  </div>
</template>
<script lang="ts" setup>
import AiMessage from "./AiMessage.vue";
import UserMessage from "./userMessage.vue";
import InputView from "./InputView.vue"
</script>

<style scoped></style>
