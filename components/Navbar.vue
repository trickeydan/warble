<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="/">Warble</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="#">Create</b-nav-item>
          <b-nav-item href="#">Browse</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown v-if="user.signin" right>
            <!-- Using 'button-content' slot -->
            <template v-slot:button-content>
              <em>{{ user.name }}</em>
            </template>
            <b-dropdown-item
              :to="{ name: 'users-id', params: { id: user.username } }"
              >Profile</b-dropdown-item
            >
            <b-dropdown-item @click="signout">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item v-else href="#">Log In</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.state.user
    }
  },
  methods: {
    signout() {
      this.$store.commit('user/signout')
    }
  }
}
</script>
