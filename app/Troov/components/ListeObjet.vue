<template>
  <div>
    <b-form inline @submit="ajouterObjet">
      <label class="sr-only" for="object-name">Ajouter un objet: </label>
      <b-form-input
        id="object-name"
        v-model="newObjetName"
        class="mb-2 mr-sm-2 mb-sm-0"
        placeholder="Nom de l'objet"
      />

      <b-button type="submit" variant="primary">
        Ajouter
      </b-button>
    </b-form>
    <b-list-group>
      <b-list-group-item v-for="obj in objets">
        <objet :id="obj.id" :nom="obj.nom" @supprimer="supprimerObjet(obj)" @modifier="modifierObjet(obj, $event)" />
      </b-list-group-item>
    </b-list-group>
    <div>

      <b-modal ref="my-modal" hide-footer title="Attention">
        <div class="d-block text-center">
          <h3>Vous allez supprimer {{selectedObjet.nom}}</h3>
        </div>
        <b-button class="mt-3" variant="outline-danger" block @click="confirmeSuppression">Confirmer</b-button>
        <b-button class="mt-2" variant="outline-warning" block @click="hideModal">Annuler</b-button>
      </b-modal>
    </div>
  </div>
</template>

<script>
import Objet from './Objet.vue'
export default {
  components: { Objet },
  data () {
    return {
      newObjetName: '',
      objets: [{ id: 1, nom: 'abc' }, { id: 2, nom: 'abcd' }],
      selectedObjet: ''
    }
  },
  methods: {
    ajouterObjet (event) {
      event.preventDefault()
      console.log('Add')
      if (this.newObjetName && this.newObjetName.trim().length !== 0) {
        const objet = { id: this.objets.length + 1, nom: this.newObjetName }
        console.log(objet)
        this.objets.push(objet)
      }
    },
    supprimerObjet (obj) {
      this.selectedObjet = obj
      this.showModal();
    },
    confirmeSuppression(){
      this.objets = this.objets.filter(function(e) { return e !== this.selectedObjet }.bind(this))
      this.hideModal()
    },
    modifierObjet(obj, event){
      obj.nom = event.newName;
    },
    showModal() {
        this.$refs['my-modal'].show()
    },
    hideModal() {
      this.$refs['my-modal'].hide()
    },
  }
}
</script>
