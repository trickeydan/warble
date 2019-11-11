<template>
  <div class="card">
    <div class="card-body">
      <div class="row">
        <div class="col-2">
          <!-- Customise per user. -->
          <img :src="require(`../static/bob.jpg`)" />
        </div>
        <div class="col-10">
          <div class="row">
            <div class="col-10">
              <nuxt-link class="link name" :to="userlink">
                {{ name }}
              </nuxt-link>
              <nuxt-link class="link" :to="userlink">
                @{{ username }}
              </nuxt-link>
              <span v-if="datetime > 0" class="time">
                {{ $moment(dateObject).fromNow() }}
              </span>
            </div>
            <div class="col-2">
              <b-btn v-if="following" class="btn-success">Following</b-btn>
              <b-btn v-else @click="postFollow">Follow</b-btn>
            </div>
          </div>
          <hr />
          {{ content }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    content: {
      type: String,
      default: 'Tweet Content'
    },
    name: {
      type: String,
      default: 'Name'
    },
    username: {
      type: String,
      default: 'username'
    },
    datetime: {
      type: Number,
      default: 0
    }
  },
  computed: {
    userlink() {
      return { name: 'users-id', params: { id: this.username } }
    },
    user() {
      return this.$store.state.user
    },
    following() {
      const isUser = this.user.username === this.username
      let isFollowing = false
      for (let i = 0; i < this.user.following.length; i++) {
        if (this.username === this.user.following[i]) {
          isFollowing = true
        }
      }
      return isUser || isFollowing
    },
    dateObject() {
      return new Date(this.datetime * 1)
    }
  },
  methods: {
    postFollow() {
      if (this.$store.state.user.signin) {
        this.$axios
          .post('createFollow', {
            username: this.user.username,
            follows: this.username
          })
          .then((response) => {
            this.$store.commit('user/updateFollowing', response.data)
          })
          .catch((response) => {})
      } else {
        this.$nuxt.$router.replace({ path: '/login' })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.card {
  margin: 0.5em 0;

  .link {
    color: #000;
  }

  .name {
    font-size: 1.5em;
    font-weight: bold;
  }

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
  }
}
</style>
