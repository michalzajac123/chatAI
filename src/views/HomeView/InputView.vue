<template>
  <div class="p-4 border-t border-gray-700">
    <div class="bg-gray-700 rounded-lg flex items-center p-2">
      <input
        v-model="messageValue"
        type="text"
        placeholder="Wyślij wiadomość..."
        class="flex-1 bg-transparent text-white placeholder-gray-400 focus:outline-none px-2"
        @keyup.enter="sendMessageAndClear"
        :disabled="disabled"
      />
      <button
        @click="sendMessageAndClear"
        class="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md ml-2"
        :disabled="disabled"
        :class="{ 'opacity-50 cursor-not-allowed': disabled }"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"
          />
        </svg>
      </button>
    </div>
    <p class="text-xs text-gray-500 text-center mt-2">
      Model może popełniać błędy. Rozważ sprawdzenie ważnych informacji.
    </p>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";

// get props and emit
const props = defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
});

const messageValue = ref<string>("");
const emit = defineEmits<{
  (e: "sendMessage", message: string): void;
}>();

const sendMessageAndClear = () => {
  if (messageValue.value.trim() && !props.disabled) {
    emit("sendMessage", messageValue.value);
    messageValue.value = ""; //Clear the input after sending
  }
};
</script>
