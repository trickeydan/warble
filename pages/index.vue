<template>
  <div class="container main">
    <div class="row">
      <div class="col-md-9">
        <h1>Feed</h1>
        <div v-if="loading" class="loading">
          Loading tweets...
        </div>
        <div v-if="error" class="error">Error: {{ error }}</div>
        <Tweet v-for:="tweet in tweets" name:="tweet.name"
        username:="tweet.username" content:="tweet.content" />
      </div>
      <div class="col-md-3">
        <h2>Trending Topics</h2>
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
      tweets: [],
      error: null
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
      this.tweets = []
      this.loading = true

      this.$axios
        .get('getTweets?username=bob')
        .then((response) => {
          this.loading = false
          this.tweets = response
        })
        .catch((response) => {
          this.loading = false
          this.error = response.toString()
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.main {
  margin: auto;
  padding: 2em;
}
</style>
