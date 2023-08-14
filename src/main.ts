import { createSSRApp } from 'vue';
import { setupPinia } from './store';
import App from './App.vue';
import '@sdb/lodash-mp-polyfill';
import 'uno.css';

export function createApp() {
  const app = createSSRApp(App);
  const pinia = setupPinia(app);
  return { app, pinia };
}
