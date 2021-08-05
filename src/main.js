const { createApp } = require('vue');
import Vue from 'vue';
import App from './App.vue';
import Vue3TouchEvents from 'vue3-touch-events';

var vue = createApp(App);
vue.use(Vue3TouchEvents);
vue.mount('#app');
