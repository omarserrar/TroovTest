<template>
  <div id="app">
    <div v-if="login">
      <login-form />
    </div>
    <div v-else>
      <inscription-form />
    </div>
    <button @click="showHideLoginForm()">
      {{ buttonText }}
    </button>
  </div>
</template>
<script>
import InscriptionForm from '../components/InscriptionForm.vue'
import LoginForm from '../components/LoginForm.vue'
export default {
  components: { LoginForm, InscriptionForm },
  middleware: ['not-auth'],
  data () {
    return {
      login: true,
      buttonLogin: 'Vous n\'avez pas encore de compte ? Créer le maintenant',
      buttonSignup: 'Vous avez déja un compte ? Connectez-vous',
      buttonText: 'Vous n\'avez pas encore de compte ? Créer le maintenant'
    }
  },
  methods: {
    showHideLoginForm () {
      this.login = !this.login
      if (this.login) { this.buttonText = this.buttonLogin } else { this.buttonText = this.buttonSignup }
    }
  }

}
</script>
