export default (axios) => ({
  apiFetchEpisodes() {
    return axios.get('episodes')
  },
  apiFetchEpisodeById(id) {
    return axios.get(`episodes/${id}`)
  },
})
