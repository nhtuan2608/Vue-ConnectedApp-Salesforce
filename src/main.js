import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import { getCookie } from './js/common';

Vue.config.productionTip = false;
var cookie = window.document.cookie;
cookie = cookie.split(';');

Vue.use(vuetify);
var tokenValue = getCookie(cookie, 'sf_token');
console.log('tokenValue: ' + tokenValue);

var portServer = getCookie(cookie, 'port');
console.log('portServer: ' + portServer);

localStorage.setItem("portServer", portServer);  
// var token = cookie.find(x => x.split('=')[0] == 'sf_token');
// var tokenValue = token.split('=')[1];

if(tokenValue != null || tokenValue != undefined) {
  new Vue({
    vuetify,
    render: h => h(App)
  }).$mount('#app')
}

console.log(process.env)
