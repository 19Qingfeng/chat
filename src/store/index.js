import { createStore, createLogger } from 'vuex';
import chat from './chat/index';
const debug = process.env.NODE_ENV !== 'production';
export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    chat,
  },
  strict: debug,
  plugins: debug ? [createLogger()] : '',
});
