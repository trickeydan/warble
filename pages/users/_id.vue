<template>
  <div class="container main">
    <div class="row">
      <div class="col-md-9">
        <div class="names">
          <span class="name">{{ name }}</span>
          <span class="username">@{{ username }}</span>
        </div>
        <Tweet name="Bob Bobbin" username="bob" content="Yeet" />
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
  validate({ params }) {
    // Look up user in DB here
    return true
  },
  computed: {
    name() {
      return 'Bob Bobbin'
    },
    username() {
      return 'bob'
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
