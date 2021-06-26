<template>
  <span class="d-flex justify-content-between align-items-center" v-if="!edit">
    <span>{{ nom }}</span>
    <span>

      <b-button @click="activerModification" variant="primary" class="bouton primary" pill>Modifier</b-button>
      <b-button @click="supprimer" variant="danger" class="bouton danger" pill>Supprimer</b-button>
    </span>
  </span>
  <b-form inline v-else class="d-flex justify-content-between align-items-center" @submit="enregistrerModification">
        <b-form-input
          id="inline-form-input-name"
          v-model="newName"
          minlength="3"
          maxlength="255"
          class="mb-2 mr-sm-2 mb-sm-0"
        />
    <span>
      <b-button variant="primary" type="submit" class="bouton primary" pill>Enregistrer</b-button>
      <b-button variant="danger" @click="annulerModification" class="bouton danger" pill>Annuler</b-button>
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
    },
    enregistrerModification(e){
      e.preventDefault()
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
