<template>
  <div class="container">
    <div class="auth">
      <div class="titre">{{titre}}</div>
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
      buttonText: 'Vous n\'avez pas encore de compte ? Créer le maintenant',
      titre: 'Connexion'
    }
  },
  methods: {
    showHideLoginForm () {
      this.login = !this.login
      if (this.login) {
        this.buttonText = this.buttonLogin;
        this.titre = "Connexion"
      } else {
        this.buttonText = this.buttonSignup;
        this.titre = "Inscription"
      }
    }
  }

}
</script>
<style>
.auth{
  padding: 0px 30px 30px 30px;
  background: #fdfdfd;
  margin-top: 12px;
  border: #228674 solid 1px;
  border-radius: 9px;
}
.titre{
  padding-top: 12px;
  color: #014d8e;
  padding-bottom: 12px;
  font-size: 20pt;
}
</style>
