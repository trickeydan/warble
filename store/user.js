export const state = () => ({
  signin: true,
  username: 'bob',
  name: 'Bob Bobbins'
})

export const mutations = {
  signin(state, username, name) {
    state.signin = true
    state.username = username
    state.name = name
  },
  signout(state) {
    state.signin = false
  }
}
