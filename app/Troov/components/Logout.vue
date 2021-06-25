<template>
  <div>
    <button @click="logout()">Déconnexion</button>
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
