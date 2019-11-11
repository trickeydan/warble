<template>
  <div class="container main">
    <div class="row">
      <div class="col-md-12">
        <h1>Write Tweet</h1>
        <p v-if="error" class="alert alert-danger">{{ error }}</p>
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
        <div class="form-group">
          <label for="file">Image / Video</label>
          <input
            id="file"
            type="file"
            class="form-control"
            aria-describedby="fileHelp"
            placeholder="Upload image / video"
            @change="processFile"
          />
        </div>
        <button class="btn btn-primary" @click="postTweet">Tweet!</button>
        <div class="preview">
          <h2>Preview</h2>
          <Tweet
            :name="user.name"
            :username="user.username"
            :content="message"
            :datetime="new Date().getTime()"
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
      error: '',
      fileData: false
    }
  },
  computed: {
    user() {
      return this.$store.state.user
    }
  },
  methods: {
    postTweet() {
      const reader = new FileReader()
      if (this.fileData) {
        // Convert the file to base64 text
        reader.readAsDataURL(this.fileData)
      }

      this.$axios
        .post('createTweet', {
          username: this.user.username,
          message: this.message,
          fileData: reader.result,
          fileName: this.fileData.name
        })
        .then((response) => {
          this.$nuxt.$router.replace({
            name: 'users-id',
            params: { id: this.user.username }
          })
        })
        .catch((response) => {
          this.error = response.toString()
        })
    },
    processFile(e) {
      this.fileData = e.target.files[0]
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
