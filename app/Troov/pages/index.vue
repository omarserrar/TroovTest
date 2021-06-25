<template>

  <div class="container">
    Welcome {{this.$auth.user.nom}}
    <logout></logout>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Logout from '../components/Logout.vue'

export default Vue.extend({
  components: { Logout },
  middleware: ["auth"]
})
</script>

<style>

</style>
