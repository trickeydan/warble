<template>
  <div class="container main">
    <div class="row">
      <div class="col-md-12">
        <h1>Login</h1>
        <div v-if:="error">
          {{ error }}
        </div>
        <div class="form-group">
          <label for="username">Username</label>
          <input
            id="username"
            v-model="username"
            type="text"
            class="form-control"
            aria-describedby="usernameHelp"
            placeholder="Enter username"
          />
        </div>
        <!-- <div class="form-group">
          <label for="password">Password</label>
          <input
            id="password"
            type="password"
            class="form-control"
            placeholder="Password"
          />
        </div> -->
        <button class="btn btn-primary" @click="signin">Login</button>
        <button class="btn btn-secondary" to="/signup">
          No account? Signup
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: 'Login',
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: 'description',
          name: 'description',
          content: 'Login to Warble'
        }
      ]
    }
  },
  data() {
    return {
      username: '',
      error: null
    }
  },
  methods: {
    signin() {
      this.$axios
        .$get('getUser?username=' + this.username)
        .then((response) => {
          // Check response contains data

          this.$axios
            .get('getFollowing?username=' + response.username)
            .then((responseFollowing) => {
              this.$store.commit('user/signin', {
                username: response.username,
                name: response.name,
                following: responseFollowing.data
              })
              this.$nuxt.$router.replace({ path: '/' })
            })
            .catch((response) => {
              this.error = response.toString()
            })
        })
        .catch((response) => {
          this.error = response.toString()
        })
    }
  },
  middleware: 'guest'
}
</script>
