import { formattedName } from '@/helpers/characters'
import api from '@/api'

const namespaced = true

const state = () => ({
  characterError: null,
})

const getters = {}

const mutations = {
  setCharacterError(state, payload) {
    state.characterError = payload
  },
}

const actions = {
  async fetchCharacters({ commit }) {
    try {
      return await api.characters.apiFetchCharacters().then(({ data = [] }) => {
        return data
      })
    } catch (err) {
      commit('setCharacterError', err.message || err)
    }
  },
  async fetchCharacterByName({ commit }, payload = []) {
    try {
      return await api.characters
        .apiFetchCharacterByName(formattedName(payload))
        .then(({ data = [] }) => {
          return data
        })
    } catch (err) {
      commit('setCharacterError', err.message || err)
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
