<template>
  <div class="container">
    <div>
      <liste-objet></liste-objet>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ListeObjet from '../components/ListeObjet.vue';
import Logout from '../components/Logout.vue'

export default Vue.extend({
  components: { Logout, ListeObjet },
  middleware: ['auth']
})
</script>

<style>

</style>
