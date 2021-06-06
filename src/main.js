import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import errorPage from './pages/404.vue';
import { getCookie } from './js/common';
// const axios = require('axios');
// const baseURL = 'http://localhost:';

Vue.config.productionTip = false;
var cookie = window.document.cookie;
cookie = cookie.split(';');

Vue.use(vuetify);
var tokenValue = getCookie(cookie, 'sf_token');
console.log('tokenValue: ' + tokenValue);

var portServer = getCookie(cookie, 'port');
console.log('portServer: ' + portServer);

// axios.get(baseURL + portServer + '/callback').then(x => {
//   console.log(x);
  if(tokenValue && portServer) {
    localStorage.setItem("portServer", portServer);
    new Vue({
      vuetify,
      render: h => h(App)
    }).$mount('#app')
  } else {
    new Vue({
      vuetify,
      render: h => h(errorPage)
    }).$mount('#app')
  }
// }).catch(function (error) {
//   console.log(JSON.stringify(error));
//   new Vue({
//     vuetify,
//     render: h => h(errorPage)
//   }).$mount('#app')
//   return false;
// });

// var token = cookie.find(x => x.split('=')[0] == 'sf_token');
// var tokenValue = token.split('=')[1];

// if(tokenValue != null  || tokenValue != undefined) {

console.log(process.env)
