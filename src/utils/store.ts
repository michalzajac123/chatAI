import { ref } from "vue";
export interface Conversation {
  conversationId: string;
  conversationName: string;
  messages: {
    role: string;
    content: string;
  }[];
}

// Klucze dla localStorage
const STORAGE_KEYS = {
  CONVERSATIONS: "chatAI_conversations",
  CURRENT_CONVERSATION: "chatAI_currentConversation",
};

// Reaktywny stan magazynu
const conversationsRef = ref<Conversation[]>([]);

// Funkcje obsługujące localStorage
export const conversationStore = {
  // Inicjalizacja magazynu
  init() {
    const storedData = localStorage.getItem(STORAGE_KEYS.CONVERSATIONS);
    conversationsRef.value = storedData ? JSON.parse(storedData) : [];
    return conversationsRef;
  },

  // Pobierz wszystkie konwersacje
  getConversations(): Conversation[] {
    if (conversationsRef.value.length === 0) {
      this.init();
    }
    return conversationsRef.value;
  },

  // Zapisz wszystkie konwersacje
  saveConversations(conversations: Conversation[]): void {
    localStorage.setItem(
      STORAGE_KEYS.CONVERSATIONS,
      JSON.stringify(conversations)
    );
    // Aktualizuj reaktywną referencję
    conversationsRef.value = conversations;
  },

  // Dodaj nową konwersację
  addConversation(conversation: Conversation): void {
    const conversations = this.getConversations();
    conversations.push(conversation);
    this.saveConversations(conversations);
  },

  // Pobierz konwersację po ID
  getConversationById(conversationId: string): Conversation | undefined {
    const conversations = this.getConversations();
    return conversations.find(
      (conversation) => conversation.conversationId === conversationId
    );
  },

  // Dodaj wiadomość do konwersacji
  addMessageToConversation(
    conversationId: string,
    message: { role: string; content: string }
  ): void {
    const conversations = this.getConversations();
    const conversation = conversations.find(
      (c) => c.conversationId === conversationId
    );

    if (conversation) {
      conversation.messages.push(message);
      this.saveConversations(conversations);
    } else {
      // Jeśli konwersacja nie istnieje, utwórz nową
      const newConversation: Conversation = {
        conversationId: conversationId,
        conversationName: `Nowa rozmowa ${conversationId}`,
        messages: [message],
      };
      this.addConversation(newConversation);
    }
  },

  // Symulacja odpowiedzi asystenta (opcjonalnie)
  async getAiResponse(conversationId: string): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.addMessageToConversation(conversationId, {
          role: "ai",
          content:
            "To jest automatyczna odpowiedź asystenta na Twoją wiadomość.",
        });
        resolve();
      }, 1000);
    });
  },

  initializeStoreIfEmpty(): void {
    if (conversationsRef.value.length === 0) {
      const storedData = localStorage.getItem(STORAGE_KEYS.CONVERSATIONS);
      if (!storedData) {
        this.saveConversations([]);
      } else {
        conversationsRef.value = JSON.parse(storedData);
      }
    }
  },
};

// Inicjalizacja magazynu przy importowaniu
conversationStore.initializeStoreIfEmpty();
