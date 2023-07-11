import { createSSRApp } from 'vue';
import { setupStore } from './store';
import { setupRouter } from './router';
import App from './App.vue';
import 'uno.css';

export function createApp() {
  const app = createSSRApp(App);
  setupRouter(app);
  setupStore(app);
  return { app };
}
