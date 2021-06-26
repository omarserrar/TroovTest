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

export default Vue.extend({
  components: { ListeObjet },
  middleware: ['is-auth']
})
</script>

<style>

</style>
