<template>
  <div class="container main">
    <div class="row">
      <div class="col-md-12">
        <h1>Write Tweet</h1>
        <p v-if="error">{{ error }}</p>
        <div class="form-group">
          <label for="message">Write your message</label>
          <textarea
            id="message"
            v-model="message"
            class="form-control"
            aria-describedby="messageHelp"
            placeholder="Enter message"
          />
        </div>
        <button class="btn btn-primary" @click="postTweet">Tweet!</button>
        <div class="preview">
          <h2>Preview</h2>
          <Tweet
            :name="user.name"
            :username="user.username"
            :content="message"
          />
        </div>
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
      message: '',
      error: ''
    }
  },
  computed: {
    user() {
      return this.$store.state.user
    }
  },
  methods: {
    postTweet() {
      this.$axios
        .post('createTweet', {
          username: this.user.username,
          message: this.message
        })
        .then((response) => {
          console.log(response.data)
          this.$nuxt.$router.replace({
            name: 'users-id',
            params: { id: this.user.username }
          })
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

.preview {
  margin-top: 5em;
}
</style>
