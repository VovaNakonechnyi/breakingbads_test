const omdb = 'http://www.omdbapi.com/'
export default (axios) => ({
  apiFetchPoster() {
    return axios.get(
      `${omdb}?apikey=${process.env.VUE_APP_omdbApiKey}&i=${process.env.VUE_APP_omdbI}`
    )
  },
})
