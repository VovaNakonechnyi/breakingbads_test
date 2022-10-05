import axios from 'axios'
import Episodes from '@/api/episodes/index'
import Characters from '@/api/characters/index'
import Deathes from '@/api/deathes/index'
import Quotes from '@/api/quotes/index'
import Omdb from '@/api/omdb/index'
import Weather from '@/api/weather/index'
axios.defaults.baseURL = process.env.VUE_APP_apiUrl
export default {
  episodes: Episodes(axios),
  characters: Characters(axios),
  deathes: Deathes(axios),
  quotes: Quotes(axios),
  omdb: Omdb(axios),
  weather: Weather(axios),
}
