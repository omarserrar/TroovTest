<template>
  <div class="list">
    <b-form inline class="row formulaire" @submit="ajouterObjet">
      <label for="object-name" class="titre">Ajouter un objet: </label>
      <b-form-input
        id="object-name"
        v-model="newObjetName"
        minlength="3"
        maxlength="255"
        placeholder="Nom de l'objet"
      />

      <b-button type="submit" variant="primary" pill class="bouton primary">
        Ajouter
      </b-button>
    </b-form>

    <span class="titre">Liste des objets <b-badge variant="light">{{ objets.length }}</b-badge></span>
    <b-list-group v-if="objets.length && objets.length > 0">
      <b-list-group-item v-for="obj in objets">
        <objet :id="obj.id" :nom="obj.nom" @supprimer="supprimerObjet(obj)" @modifier="modifierObjet(obj, $event)" />
      </b-list-group-item>
    </b-list-group>
    <div v-else align="center">
      <img src="~/assets/no-data.png" fluid style="width: 70%"><br>
      <span> Aucun objet trouvé </span>
    </div>
    <div>
      <b-modal ref="my-modal" hide-footer title="Attention">
        <div class="d-block text-center">
          <h3>Vous allez supprimer {{ selectedObjet.nom }}</h3>
        </div>
        <hr>
        <b-row align-h="around">
          <b-col cols="4">
            <b-button class="mt-3" @click="hideModal">
              Annuler
            </b-button>
          </b-col>
          <b-col cols="4">
            <b-button class="mt-3" variant="outline-danger" @click="confirmeSuppression">
              Confirmer
            </b-button>
          </b-col>
        </b-row>
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
      if (this.newObjetName && this.newObjetName.trim().length !== 0) {
        const objet = { nom: this.newObjetName }
        const res = await this.$axios.post('/api/objet/add', { objet })
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
      const res = await this.$axios.delete('/api/objet/' + this.selectedObjet._id + '/delete', { objet: this.selectedObjet })
      if (res && res.data && res.data.success) {
        this.objets = this.objets.filter(function (e) { return e !== this.selectedObjet }.bind(this))
      }
      this.hideModal()
    },
    async modifierObjet (obj, event) {
      const res = await this.$axios.put('/api/objet/edit', { objet: { _id: obj._id, nom: event.newName } })
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
<style>
.formulaire{
  border-bottom: black solid 2px;
}
.list{
  padding: 0px 30px 30px 30px;
  background: #fdfdfd;
  margin-top: 12px;
  border: #228674 solid 1px;
  border-radius: 9px;
}
.titre{
  padding-top: 12px;
  color: #014d8e;
  padding-bottom: 12px;
  font-size: 20pt;
}
</style>
