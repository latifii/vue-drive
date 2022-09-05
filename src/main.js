import { createApp } from 'vue';
import App from './App.vue';

import ToastPlugin from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

import icons from './components/icons/all';
import Modal from './components/Modal.vue';

const app = createApp(App);
app.use(ToastPlugin);

// Register all icons
for (const [key, value] of Object.entries(icons)) {
  app.component(key, value);
}
app.component('app-modal', Modal);

app.mount('#app');
