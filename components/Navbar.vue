<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand to="/">Warble</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/tweet">Write Tweet</b-nav-item>
          <b-nav-item v-if="user.signin" to="/followers"
            >My Followers</b-nav-item
          >
          <b-nav-item v-if="user.signin" to="/following"
            >My Followings</b-nav-item
          >
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
          <b-nav-item v-else :to="{ name: 'login' }">Log In</b-nav-item>
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
      this.message = 'sent'
      this.$store.commit('user/signout')
      this.$nuxt.$router.replace({ path: '/' })
    }
  }
}
</script>
