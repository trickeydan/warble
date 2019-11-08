export const state = () => ({
  signin: false,
  username: '',
  name: '',
  following: []
})

export const mutations = {
  signin(state, user) {
    state.signin = true
    state.username = user.username
    state.name = user.name
    state.following = user.following
  },
  signout(state) {
    state.signin = false
    state.username = ''
    state.name = ''
  }
}
