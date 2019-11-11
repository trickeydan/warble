<template>
  <div class="container main">
    <div class="row">
      <div class="col-md-12">
        <h1>My Followings</h1>
        <div v-if="loading" class="alert alert-info">
          Loading followings...
        </div>
        <div v-if="error" class="alert alert-danger">Error: {{ error }}</div>
        <span v-if="followings && followings.length > 0">
          You are following:
        </span>
        <span v-if="followings && followings.length == 0">
          You are not following anybody
        </span>
        <Tweet
          v-for="following in followings"
          :key="following.id"
          :name="following.name"
          :username="following.username"
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
      followings: [],
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
      this.followings = []
      this.loading = true

      this.$axios
        .get('getFollowing?username=' + this.user.username)
        .then((response) => {
          const rawFollowings = response.data

          rawFollowings.forEach((follower) => {
            this.$axios.get('getUser?username=' + follower).then((response) => {
              const followerData = {
                username: follower,
                name: response.data.name
              }
              this.followings.push(followerData)
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
