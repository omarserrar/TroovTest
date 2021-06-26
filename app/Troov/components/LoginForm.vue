<template>
  <b-form @submit="onSubmit">
    <b-alert v-if="error" show variant="danger">
      {{ error }}
    </b-alert>

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
        min-length="6"
        type="password"
        placeholder="Enter password"
        required
      />
    </b-form-group>

    <b-button type="submit" variant="primary" class="bouton primary" pill>
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
          this.$router.push('/')
        } else if (res.data && res.data.error) {
          this.error = res.data.error
        } else {
          this.error = 'Error'
        }
      } catch (err) {
        this.error = 'Error'
      }
    }
  }
}
</script>
