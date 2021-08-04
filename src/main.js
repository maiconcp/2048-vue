const { createApp } = require('vue');
import App from './App.vue';

var vue = createApp(App);
vue.mount('#app');

import Vue from 'vue';
window.Vue = Vue;
