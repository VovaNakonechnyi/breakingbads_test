import { Store } from 'vuex'
import episodes from '@/store/episodes/index'
import characters from '@/store/characters/index'
import deathes from '@/store/deathes/index'
import omdb from '@/store/omdb/index'
import quotes from '@/store/qoutes/index'
import weather from '@/store/weather/index'
export const createStore = () => {
  Store({
    modules: {
      episodes,
      characters,
      deathes,
      omdb,
      quotes,
      weather,
    },
  })
}
