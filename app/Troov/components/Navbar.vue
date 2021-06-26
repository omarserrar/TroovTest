<template>
  <div>
    <b-navbar toggleable="lg" type="light" variant="info" id="navbar">
      <b-navbar-brand to="/"><img src="~/assets/logo.png" height="40"/></b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto" v-if="$auth.loggedIn">
          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <em>{{$auth.user.nom}}</em>
            </template>
            <logout></logout>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>
<script>
import Logout from './Logout.vue'
export default{
  components: { Logout },

}
</script>

<style>
#navbar{
    background-color: #ffffff !important;
    border-bottom: #238a78 solid 2px;
}
</style>
