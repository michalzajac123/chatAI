<template>
  <div
    @click="selectConversation"
    class="block p-2 hover:bg-gray-700 rounded-md truncate cursor-pointer"
    :class="{ 'bg-gray-700': isActive }"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import {
  currentConversationId,
  setCurrentConversation,
} from "../../utils/conversationState";

// Przyjmujemy ID konwersacji jako prop
const props = defineProps<{
  conversationId: string | number;
}>();

// Sprawdzamy czy ten element jest aktywny
const isActive = computed(
  () => currentConversationId.value === props.conversationId
);

// Funkcja wybierająca konwersację po kliknięciu
const selectConversation = () => {
  setCurrentConversation(props.conversationId);
};
</script>
