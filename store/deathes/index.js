import api from '@/api'

const namespaced = true

const state = () => ({
  deathes: [],
  deathesError: null,
})

const getters = {}

const mutations = {
  setDeathes(state, payload) {
    state.deathes = payload
  },
  setDeathesError(state, payload) {
    state.deathesError = payload
  },
}

const actions = {
  async fetchDeathes({ commit }) {
    try {
      return await api.deathes.apiFetchDeathes().then(({ data = [] }) => {
        commit('setDeathes', data)
        return data
      })
    } catch (err) {
      commit('setDeathesError', err.message || err)
    }
  },
  async fetchDeathByName({ commit }, payload) {
    try {
      return await api.deathes
        .apiFetchDeathByName(payload)
        .then(({ data = [] }) => {
          return data
        })
    } catch (err) {
      commit('setDeathesError', err.message || err)
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
