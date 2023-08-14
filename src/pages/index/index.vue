<template>
  <view class="absolute top-0 right-0 bottom-0 left-0 flex justify-center items-center">
    <button @click="decrement">减少</button>
    <text>{{ counterStore.counter }}</text>
    <button @click="increment">增加</button>
  </view>
</template>

<script setup lang="ts">
import { useCounterStore } from '@/store/modules/counter';
import { debounce } from 'lodash-es';

const counterStore = useCounterStore();
const decrement = debounce(counterStore.decrement, 500, { leading: true, trailing: false });
const increment = debounce(counterStore.increment, 500, { leading: true, trailing: false });
</script>
