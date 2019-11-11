<template>
  <div class="container main">
    <div class="row">
      <div class="col-md-12">
        <h1>My Followers</h1>
        <div v-if="loading" class="alert alert-info">
          Loading followers...
        </div>
        <div v-if="error" class="alert alert-danger">Error: {{ error }}</div>
        <span v-if="followers && followers.length > 0">
          You are being followed by:
        </span>
        <span v-if="followers && followers.length == 0">
          Nobody is following you :(
        </span>
        <Tweet
          v-for="follower in followers"
          :key="follower.id"
          :name="follower.name"
          :username="follower.username"
          content=""
        />
      </div>
    </div>
  </div>
</template>

<script>
import Tweet from '~/components/Tweet.vue'

export default {
  components: {
    Tweet
  },
  head() {
    return {
      title: 'Warble',
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: 'description',
          name: 'description',
          content: 'Warble - Yet another Twitter'
        }
      ]
    }
  },
  data() {
    return {
      loading: false,
      followers: [],
      error: null
    }
  },
  computed: {
    user() {
      return this.$store.state.user
    }
  },
  watch: {
    // call again the method if the route changes
    $route: 'fetchData'
  },
  created() {
    // fetch the data when the view is created and the data is
    // already being observed
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.error = null
      this.followers = []
      this.loading = true

      this.$axios
        .get('getFollowers?username=' + this.user.username)
        .then((response) => {
          const rawFollowers = response.data

          rawFollowers.forEach((follower) => {
            this.$axios.get('getUser?username=' + follower).then((response) => {
              const followerData = {
                username: follower,
                name: response.data.name
              }
              this.followers.push(followerData)
            })
          })

          this.loading = false
        })
        .catch((response) => {
          this.error = response.toString()
        })
    }
  },
  middleware: 'authenticated'
}
</script>

<style lang="scss" scoped>
.main {
  margin: auto;
  padding: 2em;
}
</style>
