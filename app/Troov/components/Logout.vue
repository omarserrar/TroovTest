<template>
  <div id="logout">
    <b-dropdown-item @click="logout()" ><span id="logout"> Déconnexion</span></b-dropdown-item>
  </div>
</template>

<script>
import LoginForm from '../components/LoginForm.vue'
  export default {
    methods: {
      logout(){
        this.$auth.logout()
      }
    }
  }
</script>
<style>
#logout{
  color: red
}
</style>
