<template>
  <div>
    <login-form></login-form>
  </div>
</template>

<script>
import LoginForm from '../components/LoginForm.vue'
  export default {
  middleware: ["auth"],
  components: { LoginForm },

  }
</script>
