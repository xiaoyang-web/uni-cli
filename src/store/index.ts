import type { App } from 'vue';
import { createPinia } from 'pinia';
import piniaPersist from '@sdb/pinia-uniapp-persist';

export const pinia = createPinia();
// 使用数据持久化插件
pinia.use(piniaPersist);

export function setupPinia(app: App<Element>) {
  app.use(pinia);
  return pinia;
}
