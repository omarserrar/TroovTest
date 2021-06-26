<template>
  <div id="logout">
    <b-dropdown-item @click="logout()" ><span id="logout"> Déconnexion</span></b-dropdown-item>
  </div>
</template>

<script>
import LoginForm from '../components/LoginForm.vue'
  export default {
    methods: {
      async logout(){
        await this.$auth.logout()
        this.$router.push('/auth')

      }
    }
  }
</script>
<style>
#logout{
  color: red
}
</style>
