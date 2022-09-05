import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import VueRouter from 'vue-router'
import Home from "@/components/Home";
import converter from "@/components/converter";

Vue.use(VueRouter)

const router = new VueRouter({
    routes: [
        { path: '/', component: Home },
        { path: '/converter', component: converter },
    ]
});


Vue.config.productionTip = false

Vue.use(vuetify)
new Vue({
  vuetify,
  render: h => h(App),
    router: router
}).$mount('#app')
