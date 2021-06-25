/* eslint-disable no-console */
<template>
  <b-form @submit="onSubmit">
    {{ error }}
    <b-form-group
      id="email-group"
      label="Email address:"
      label-for="email"
    >
      <b-form-input
        id="email"
        v-model="form.email"
        type="email"
        placeholder="Enter email"
        required
      />
    </b-form-group>

    <b-form-group id="password-group" label="Password:" label-for="password">
      <b-form-input
        id="password"
        v-model="form.password"
        type="password"
        placeholder="Enter password"
        required
      />
    </b-form-group>

    <b-button type="submit" variant="primary">
      Connexion
    </b-button>
  </b-form>
</template>
<script>
export default {
  data () {
    return {
      form: {
        email: 'omarserrar2@gmail.com',
        password: '123456'
      },
      error: ''
    }
  },
  methods: {
    async onSubmit (event) {
      event.preventDefault()
      try {
        const res = await this.$auth.loginWith('local', { data: { form: this.form } })
        if (this.$auth.user) {
          console.log('Success ', this.$auth.user)
          this.$router.push('/')
        } else if (res.data && res.data.error) {
          this.error = res.data.error
        } else {
          console.log('Error')
        }
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>
