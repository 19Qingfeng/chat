import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import useElementPlus from './plugin/element-plus';
import './assets/scss/index.scss';
import lazyPlugin from 'vue3-lazy';

const app = createApp(App);

useElementPlus(app);

app.use(lazyPlugin, {
  loading: require('./assets/img/chat/default.jpg'),
  error: require('./assets/img/chat/default.jpg'),
});
app
  .use(store)
  .use(router)
  .mount('#app');
