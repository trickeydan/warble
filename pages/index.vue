<template>
  <div class="container main">
    <div class="row">
      <div class="col-md-12">
        <h1>Feed</h1>
        <div v-if="loading" class="loading">
          Loading tweets...
        </div>
        <div v-if="error" class="error">Error: {{ error }}</div>
        <p v-if="tweets && tweets.length == 0">
          There are no tweets for you to see. Try following someone!
        </p>
        <Tweet
          v-for="tweet in tweets"
          :key="tweet.id"
          :name="tweet.name"
          :username="tweet.username"
          :content="tweet.message"
          :datetime="tweet.datetime"
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
      tweets: [],
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
      this.tweets = []
      this.loading = true

      this.$axios
        .post('getFeed', {
          username: this.user.username
        })
        .then((response) => {
          const rawTweets = response.data

          rawTweets.forEach((tweet) => {
            this.$axios
              .get('getUser?username=' + tweet.username)
              .then((response) => {
                tweet.name = response.data.name
                this.tweets.push(tweet)
              })
          })

          this.loading = false
        })
        .catch((response) => {
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
