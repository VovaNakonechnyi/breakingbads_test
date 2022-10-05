import api from '@/api'

const namespaced = true

const state = () => ({
  quotes: [],
  quotesError: null,
})

const getters = {}

const mutations = {
  setQuotes(state, payload) {
    state.quotes = payload
  },
  setQuotesError(state, payload) {
    state.quotesError = payload
  },
}

const actions = {
  async fetchQuotes({ commit }) {
    try {
      return await api.quotes.apiFetchQuotes().then(({ data = [] }) => {
        commit('setQuotes', data)
        return data
      })
    } catch (err) {
      commit('setQuotesError', err.message || err)
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
