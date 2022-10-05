import api from '@/api'
import { getLatAndLng } from '@/helpers/shared'
const namespaced = true

const state = () => ({
  weather: [],
  weatherError: null,
})

const getters = {}

const mutations = {
  setWeatherError(state, payload) {
    state.weatherError = payload
  },
}

const actions = {
  async fetchWeather({ commit }, { location = {}, date = '', timezone = '' }) {
    const city = getLatAndLng(location)[0]
    const data = {
      lat: city.lat,
      lag: city.lng,
      timestamp: this.$moment.tz(date, timezone).unix(),
    }
    try {
      return await api.weather.apiFetchWeather(data).then(({ data = {} }) => {
        const { currently = {} } = data
        return currently
      })
    } catch (err) {
      commit('setWeatherError', err.message || err)
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
