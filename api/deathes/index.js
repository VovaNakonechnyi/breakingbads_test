export default (axios) => ({
  apiFetchDeathes() {
    return axios.get('deaths')
  },
  apiFetchDeathByName(name) {
    return axios.get(`death?name=${name}`)
  },
})
