import type { App } from 'vue';
import { createPinia } from 'pinia';
import persistedState from './plugin/persistedState';

export const pinia = createPinia();
// 使用数据持久化插件
pinia.use(persistedState);

export function setupStore(app: App<Element>) {
  app.use(pinia);
}
