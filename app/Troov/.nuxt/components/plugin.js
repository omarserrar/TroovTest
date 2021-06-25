import Vue from 'vue'
import { wrapFunctional } from './utils'

const components = {
  InscriptionForm: () => import('../../components/InscriptionForm.vue' /* webpackChunkName: "components/inscription-form" */).then(c => wrapFunctional(c.default || c)),
  LoginForm: () => import('../../components/LoginForm.vue' /* webpackChunkName: "components/login-form" */).then(c => wrapFunctional(c.default || c)),
  Logo: () => import('../../components/Logo.vue' /* webpackChunkName: "components/logo" */).then(c => wrapFunctional(c.default || c)),
  Logout: () => import('../../components/Logout.vue' /* webpackChunkName: "components/logout" */).then(c => wrapFunctional(c.default || c))
}

for (const name in components) {
  Vue.component(name, components[name])
  Vue.component('Lazy' + name, components[name])
}
