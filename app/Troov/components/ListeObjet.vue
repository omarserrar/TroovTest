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
          <h3>Vous allez supprimer {{ selectedObjet.nom }}</h3>
        </div>
        <b-button class="mt-3" variant="outline-danger" block @click="confirmeSuppression">
          Confirmer
        </b-button>
        <b-button class="mt-2" variant="outline-warning" block @click="hideModal">
          Annuler
        </b-button>
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
      objets: [],
      selectedObjet: ''
    }
  },
  async fetch () {
    const res = await this.$axios.get('/api/objet/list', {})
    if (res && res.data && res.data.objets) {
      this.objets = res.data.objets
    }
  },
  methods: {
    async ajouterObjet (event) {
      event.preventDefault()
      console.log('Add')
      if (this.newObjetName && this.newObjetName.trim().length !== 0) {
        console.log('Add 2 ')
        const objet = { nom: this.newObjetName }
        const res = await this.$axios.post('/api/objet/add', { objet })
        console.log(res)
        if (res && res.data && res.data.objet) {
          this.objets.push(res.data.objet)
        }
      }
    },
    supprimerObjet (obj) {
      this.selectedObjet = obj
      this.showModal()
    },
    async confirmeSuppression () {
      const res = await this.$axios.post('/api/objet/delete', { objet: this.selectedObjet })
      if (res && res.data && res.data.success) {
          this.objets = this.objets.filter(function (e) { return e !== this.selectedObjet }.bind(this))
      }
      this.hideModal()
    },
    async modifierObjet (obj, event) {
      const res = await this.$axios.post('/api/objet/edit', { objet:{ _id: obj._id, nom: event.newName}})
      if (res && res.data && res.data.objet) {
          obj.nom = res.data.objet.nom
      }
    },
    showModal () {
      this.$refs['my-modal'].show()
    },
    hideModal () {
      this.$refs['my-modal'].hide()
    }
  }
}
</script>
