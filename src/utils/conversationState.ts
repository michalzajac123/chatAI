import { ref } from "vue";

export const currentConversationId = ref<string | number>("1");

export function setCurrentConversation(id: string | number) {
  currentConversationId.value = id;
}
