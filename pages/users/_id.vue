<template>
  <div class="container main">
    <div class="row">
      <div class="col-md-12">
        <div class="names">
          <span class="name">{{ name }}</span>
          <span class="username">@{{ username }}</span>
        </div>
        <div v-if="loading" class="loading">
          Loading tweets...
        </div>
        <div v-if="error" class="error">Error: {{ error }}</div>
        <Tweet
          v-for="tweet in tweets"
          :key="tweet.id"
          :name="name"
          :username="username"
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
  data() {
    return {
      loading: false,
      tweets: [],
      name: 'Loading',
      username: 'Loading',
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
        .get('getUser?username=' + this.$route.params.id)
        .then((response) => {
          this.username = response.data.username
          this.name = response.data.name

          this.$axios
            .get('getTweets?username=' + this.$route.params.id)
            .then((response) => {
              this.tweets = response.data
              this.loading = false
            })
            .catch((response) => {
              this.error = response.toString()
            })
        })
        .catch((response) => {
          this.error = 'Unable to load user.'
          this.name = 'User Not Found'
          this.username = 'notfound'
          this.loading = false
        })
    }
  },
  head() {
    return {
      title: this.name,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.name + ' on Warble'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.names {
  margin: 1em 0;
  .name {
    font-size: 2em;
    font-weight: bold;
    margin-right: 0.3em;
  }
  .username {
    font-size: 1.5em;
  }
}
</style>
