<template>
  <div>
    <navbar />
    <div div class="container">
      <div>
        <liste-objet />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ListeObjet from '../components/ListeObjet.vue'
import Logout from '../components/Logout.vue'

export default Vue.extend({
  components: { Logout, ListeObjet },
  middleware: ['auth']
})
</script>

<style>

</style>
