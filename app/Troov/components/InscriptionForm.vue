/* eslint-disable no-console */
<template>
  <b-form @submit="onSubmit">
    <b-alert show variant="danger" v-if="error">{{ error }}</b-alert>
    <b-form-group
      id="nom-group"
      label="Nom:"
      label-for="nom"
    >
      <b-form-input
        id="nom"
        v-model="form.nom"
        type="text"
        minLength="3"
        placeholder="Entrez votre nom: "
        required
      />
    </b-form-group>

    <b-form-group
      id="email-group"
      label="Email:"
      label-for="email"
    >
      <b-form-input
        id="email"
        v-model="form.email"
        type="email"
        placeholder="Entrez votre email"
        required
      />
    </b-form-group>

    <b-form-group id="password-group" label="Mot de passe:" label-for="password">
      <b-form-input
        id="password"
        v-model="form.password"
        type="password"
        minLength="6"
        placeholder="Entrez votre mot de passe"
        required
      />
    </b-form-group>

    <b-button type="submit" variant="primary" class="bouton primary" pill>
      S'inscrire
    </b-button>
  </b-form>
</template>
<script>
export default {
  data () {
    return {
      form: {
        email: '',
        password: '',
        nom: ''
      },
      error: ''
    }
  },
  methods: {
    async onSubmit (event) {
      event.preventDefault()
      try {
        let inscription = await this.$axios.post('/api/auth/signup', { form: this.form })
        inscription = inscription.data
        if (inscription && inscription.success) {
          const res = await this.$auth.loginWith('local', { data: { form: this.form } })
          if (this.$auth.user) {
            console.log('Success ', this.$auth.user)
            this.$router.push('/')
          } else if (res.data && res.data.error) {
            this.error = res.data.error
          } else {
            console.log('Error')
          }
        }
        else if(inscription && inscription.error){
          this.error = inscription.error
        }
        else{
          this.error = "Une erreur s'est produite"
        }
      }
      catch (err) {
        console.log(err)
      }
    }
  }
}
</script>
