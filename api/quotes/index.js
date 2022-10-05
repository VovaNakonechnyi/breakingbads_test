export default (axios) => ({
  apiFetchQuotes() {
    return axios.get('quotes')
  },
})
