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
              <!-- <span class="time">
                25 mins ago
              </span> -->
            </div>
            <div class="col-2">
              <b-btn v-if="!user.following.includes(username)">Follow</b-btn>
              <b-btn v-else class="btn-success">Following</b-btn>
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
    }
  },
  computed: {
    userlink() {
      return { name: 'users-id', params: { id: this.username } }
    },
    user() {
      return this.$store.state.user
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
