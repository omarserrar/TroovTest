import { wrapFunctional } from './utils'

export { default as InscriptionForm } from '../../components/InscriptionForm.vue'
export { default as LoginForm } from '../../components/LoginForm.vue'
export { default as Logo } from '../../components/Logo.vue'
export { default as Logout } from '../../components/Logout.vue'

export const LazyInscriptionForm = import('../../components/InscriptionForm.vue' /* webpackChunkName: "components/inscription-form" */).then(c => wrapFunctional(c.default || c))
export const LazyLoginForm = import('../../components/LoginForm.vue' /* webpackChunkName: "components/login-form" */).then(c => wrapFunctional(c.default || c))
export const LazyLogo = import('../../components/Logo.vue' /* webpackChunkName: "components/logo" */).then(c => wrapFunctional(c.default || c))
export const LazyLogout = import('../../components/Logout.vue' /* webpackChunkName: "components/logout" */).then(c => wrapFunctional(c.default || c))
