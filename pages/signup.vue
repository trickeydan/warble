<template>
  <div class="container main">
    <div class="row">
      <div class="col-md-12">
        <h1>Signup</h1>
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
        <div class="form-group">
          <label for="name">Name</label>
          <input
            id="name"
            v-model="name"
            type="text"
            class="form-control"
            aria-describedby="nameHelp"
            placeholder="Enter name"
          />
        </div>
        <button class="btn btn-primary" @click="signin">Login</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: 'Signup',
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
      name: '',
      error: null
    }
  },
  methods: {
    signin() {
      this.$axios
        .$post('createUser', {
          username: this.username,
          name: this.name
        })
        .then((response) => {
          // Check response contains data
          this.$store.commit('user/signin', response)
          this.$nuxt.$router.replace({ path: '/' })
        })
        .catch((response) => {
          this.error = response.toString()
        })
    }
  },
  middleware: 'guest'
}
</script>
