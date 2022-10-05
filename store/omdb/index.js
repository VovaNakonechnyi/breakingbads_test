import api from '@/api'

const namespaced = true

const state = () => ({
  poster: [],
  posterError: null,
})

const getters = {}

const mutations = {
  setPosterError(state, payload) {
    state.posterError = payload
  },
}

const actions = {
  async fetchPoster({ commit }) {
    try {
      return await api.omdb.apiFetchPoster().then(({ data = {} }) => data)
    } catch (err) {
      commit('setPosterError', err.message || err)
    }
  },
}
export default {
  namespaced,
  state,
  getters,
  mutations,
  actions,
}
