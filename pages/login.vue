<template>
  <div class="container main">
    <div class="row">
      <div class="col-md-9">
        <h1>Login</h1>
        <div class="form-group">
          <label for="username">Username</label>
          <input
            id="username"
            type="text"
            class="form-control"
            aria-describedby="usernameHelp"
            placeholder="Enter username"
          />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            id="password"
            type="password"
            class="form-control"
            placeholder="Password"
          />
        </div>
        <button class="btn btn-primary" @click="signin">Login</button>
      </div>
      <div class="col-md-3">
        <h2>Trending Topics</h2>
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
  methods: {
    signin() {
      this.$store.commit('user/signin', {
        name: 'Bob Bobbins',
        username: 'bob'
      })
      this.$nuxt.$router.replace({ path: '/' })
    }
  }
}
</script>
