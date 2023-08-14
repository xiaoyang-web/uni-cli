import { storage } from '@/utils/storage';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useCounterStore = defineStore(
  'counter',
  () => {
    const counter = ref(0);
    const increment = () => counter.value++;
    const decrement = () => counter.value--;

    return { counter, increment, decrement };
  },
  {
    persist: {
      enabled: true,
      strategies: [{ storage }]
    }
  }
);
