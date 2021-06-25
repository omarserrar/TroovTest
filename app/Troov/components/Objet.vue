<template>
  <span class="d-flex justify-content-between align-items-center" v-if="!edit">
    <span>{{ nom }}</span>
    <span>
      <a href="#" @click="supprimer">Supprimer</a>
      <a href="#" @click="activerModification">Modifier</a>
    </span>
  </span>
  <b-form inline v-else class="d-flex justify-content-between align-items-center">
        <b-form-input
          id="inline-form-input-name"
          v-model="newName"
          class="mb-2 mr-sm-2 mb-sm-0"
        />
    <span>
      <b-button variant="primary" @click="enregistrerModification">Modifier</b-button>
      <b-button variant="danger" @click="annulerModification">Annuler</b-button>
    </span>
  </b-form>
</template>

<script>
export default {
  props: ['nom', 'id'],
  data () {
    return {
      edit: false,
      newName: ''
    }
  },
  methods: {
    activerModification (event) {
      event.preventDefault()
      this.newName = this.$props.nom
      this.edit = true
    //  this.$emit('modifier', 1)
    },
    enregistrerModification(){
      this.$emit('modifier', {newName: this.newName})
      this.edit = false;
    },
    annulerModification(){
      this.edit = false;
    },
    supprimer (event) {
      event.preventDefault()
      this.$emit('supprimer', 1)
    }
  }
}
</script>
