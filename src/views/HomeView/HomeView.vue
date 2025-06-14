<template>
  <div class="flex flex-col h-full bg-gray-800">
    <!-- Header -->
    <div class="p-4 border-b border-gray-700">
      <h1 class="text-xl font-semibold">Model GPT-4</h1>
      <p class="text-sm text-gray-400">
        Konwersacja ID: {{ currentConversationId }}
      </p>
    </div>

    <!-- Messages -->
    <div ref="messagesContainer" class="flex-1 p-6 space-y-4 overflow-y-auto">
      <Message
        v-for="(msg, index) in conversation?.messages || []"
        :key="`msg-${index}`"
        :role="msg.role"
        :content="msg.content"
      />
      <div v-if="isLoading" class="flex items-center justify-center p-4">
        <div class="animate-pulse text-gray-400">AI pisze odpowiedź...</div>
      </div>
    </div>
    <InputView @sendMessage="sendMessage" :disabled="isLoading" />
  </div>
</template>
<script lang="ts" setup>
import Message from "./Message.vue";
import InputView from "./InputView.vue";
import { conversationStore } from "../../utils/store";
import { currentConversationId } from "../../utils/conversationState";
import { computed, ref, nextTick, onMounted, watch } from "vue";

const messagesContainer = ref(null);
const isLoading = ref(false);

// use computed to get the current conversation
const conversation = computed(() => {
  return conversationStore.getConversationById(
    currentConversationId.value.toString()
  );
});

// function to scroll to the bottom of the messages container
const scrollToBottom = async () => {
  await nextTick();
  if (messagesContainer.value) {
    const container = messagesContainer.value as HTMLElement;
    container.scrollTop = container.scrollHeight;
  }
};

// Function to send a message
const sendMessage = async (message: string) => {
  if (!message.trim() || isLoading.value) return;

  // Add the user's message to the conversation
  conversationStore.addMessageToConversation(
    currentConversationId.value.toString(),
    {
      role: "user",
      content: message,
    }
  );

  // scroll to the bottom after adding the message
  await scrollToBottom();

  isLoading.value = true;
  await conversationStore.getAiResponse(currentConversationId.value.toString());
  isLoading.value = false;

  await scrollToBottom();
};

watch(currentConversationId, () => {
  nextTick(() => scrollToBottom());
});

onMounted(() => {
  scrollToBottom();
});
</script>

<style scoped></style>
