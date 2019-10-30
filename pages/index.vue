<template>
  <div class="container main">
    <div class="row">
      <div class="col-md-9">
        <h1>Feed</h1>
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
  }
}
</script>

<style lang="scss" scoped>
.main {
  margin: auto;
  padding: 2em;
}
</style>
