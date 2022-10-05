const config = {
  params: {
    units: 'si',
    lang: 'en',
    exclude: 'minutely,hourly,daily,alerts,flags',
  },
  headers: {
    'X-RapidAPI-Key': process.env.VUE_APP_weatherApiKey,
    'X-RapidAPI-Host': 'dark-sky.p.rapidapi.com',
  },
}
export default (axios) => ({
  apiFetchWeather(data = {}) {
    return axios.get(
      `https://dark-sky.p.rapidapi.com/${data.lat},${data.lag},${data.timestamp}`,
      config
    )
  },
})
