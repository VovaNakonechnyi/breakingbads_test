import api from '@/api'
import { filterBySeasons } from '@/helpers/episodes'

const namespaced = true

const state = () => ({
  seasons: [],
  filteredSeasons: [],
  episodesError: null,
})

const getters = {}

const mutations = {
  setSeasons(state, payload) {
    state.seasons = payload
  },
  setFilteredSeasons(state, payload) {
    state.filteredSeasons = payload
  },
  setEpisodesError(state, payload) {
    state.episodesError = payload
  },
}

const actions = {
  async fetchEpisodes({ commit }) {
    try {
      return await api.episodes.apiFetchEpisodes().then(({ data = [] }) => {
        commit('setSeasons', data)
        commit('setFilteredSeasons', filterBySeasons(data))
        return data
      })
    } catch (err) {
      commit('setEpisodesError', err.message || err)
    }
  },
  async fetchEpisodeById({ commit }, id) {
    try {
      return await api.episodes
        .apiFetchEpisodeById(id)
        .then(({ data = [] }) => {
          const [episode = {}] = data
          return episode
        })
    } catch (err) {
      commit('setEpisodesError', err.message || err)
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
