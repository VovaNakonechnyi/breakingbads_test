export default (axios) => ({
  apiFetchCharacters() {
    return axios.get('characters')
  },
  apiFetchCharacterByName(name) {
    return axios.get(`characters?name=${name}`)
  },
})
