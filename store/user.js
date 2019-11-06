export const state = () => ({
  signin: false,
  username: '',
  name: ''
})

export const mutations = {
  signin(state, user) {
    state.signin = true
    state.username = user.username
    state.name = user.name
  },
  signout(state) {
    state.signin = false
    state.username = ''
    state.name = ''
  }
}
