<template>
  <div
    class="bg-gray-900 w-64 flex-shrink-0 h-full flex flex-col p-4 space-y-4"
  >
    <button
      @click="createNewConversation"
      class="w-full bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-between"
    >
      <span>Nowy czat</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
          clip-rule="evenodd"
        />
      </svg>
    </button>

    <!-- Chat History -->
    <div class="side-bar-container flex-grow overflow-y-auto space-y-2 pr-2">
      <SideBarElement
        v-for="element in sideBarElements"
        :key="element.conversationsId"
        :conversationId="element.conversationsId"
      >
        {{ element.conversationsName }}
      </SideBarElement>
    </div>

    <div class="border-t border-gray-700 pt-4 space-y-2">
      <a href="#" class="flex items-center p-2 hover:bg-gray-700 rounded-md">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 mr-2"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
            clip-rule="evenodd"
          />
        </svg>
        <span>Moje konto</span>
      </a>
      <a href="#" class="flex items-center p-2 hover:bg-gray-700 rounded-md">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 mr-2"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
            clip-rule="evenodd"
          />
        </svg>
        <span>Ustawienia</span>
      </a>
    </div>
  </div>
</template>
<script lang="ts" setup>
import SideBarElement from "./SideBarElement.vue";
import { type Conversation, conversationStore } from "../../utils/store";
import { computed, watch } from "vue";
import {
  setCurrentConversation,
} from "../../utils/conversationState";

// Użyj reaktywnej referencji do konwersacji
const conversations = computed(() => conversationStore.getConversations());

const sideBarElements = computed(() => {
  return conversations.value.map((conversation) => ({
    conversationsName: conversation.conversationName,
    conversationsId: conversation.conversationId,
  }));
});

const createNewConversation = () => {
  const newConversationId = (conversations.value.length + 1).toString();
  const newConversation: Conversation = {
    conversationId: newConversationId,
    conversationName: `Nowa rozmowa ${newConversationId}`,
    messages: [],
  };
  conversationStore.addConversation(newConversation);
  setCurrentConversation(newConversationId); // Przełącz na nową konwersację
};

// Jeśli nie ma żadnej konwersacji, utwórz pierwszą
watch(
  conversations,
  (newConversations) => {
    if (newConversations.length === 0) {
      createNewConversation();
    }
  },
  { immediate: true }
);
</script>
<style></style>
