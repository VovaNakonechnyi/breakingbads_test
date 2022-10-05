<template>
  <v-row>
    <v-col>
      <v-combobox
        v-model="search"
        :items="dataList"
        item-disabled="disabled"
        label="Search: character, quote, episodes, death"
        placeholder="Start to type"
        outlined
        hide-details="auto"
        @input="searchData"
      >
        <template #item="{ item }">
          <v-container>
            <v-col cols="12">
              <v-row v-if="item.episodes">
                <v-col cols="12">
                  <h2>Episodes</h2>
                </v-col>
                <v-col
                  v-for="episode in item.episodes"
                  :key="episode.episode_id"
                  cols="6"
                >
                  <Cards width="'400px'">
                    <template #title>
                      {{ episode.title }}
                    </template>
                    <template #subTitle>
                      {{ episode.air_date }}
                    </template>
                    <template #moreInfo>
                      Episode:{{ episode.episode }}
                      <br />
                      Season:{{ episode.season }}
                    </template>
                  </Cards>
                </v-col>
              </v-row>
              <v-row v-if="item.characters">
                <v-col cols="12">
                  <h2>Characters</h2>
                </v-col>
                <v-col
                  v-for="character in item.characters"
                  :key="character.char_id"
                  cols="6"
                >
                  <Cards :width="'400px'">
                    <template #title>{{ character.name }}</template>
                    <template #subTitle> {{ character.nickname }}</template>
                  </Cards>
                </v-col>
              </v-row>
              <v-row v-if="item.quotes">
                <v-col cols="12">
                  <h2>Quotes</h2>
                </v-col>
                <v-col
                  v-for="quote in item.quotes"
                  :key="quote.quote_id"
                  cols="6"
                >
                  <Cards :width="'400px'">
                    <template #title>{{ quote.author }}</template>
                    <template #subTitle> "{{ quote.quote }}"</template>
                  </Cards>
                </v-col>
              </v-row>
              <v-row v-if="item.deathes">
                <v-col cols="12">
                  <h2>Deathes</h2>
                </v-col>
                <v-col
                  v-for="death in item.deathes"
                  :key="death.death_id"
                  cols="6"
                >
                  <Cards :width="'400px'">
                    <template #title>{{ death.death }}</template>
                    <template #subTitle> "{{ death.cause }}"</template>
                    <template #moreInfo>
                      Last words:
                      <span class="white--text">
                        {{ death.last_words }}
                      </span>
                      <br />
                      Responsible:
                      <span class="white--text">
                        {{ death.responsible }}
                      </span>
                    </template>
                  </Cards>
                </v-col>
              </v-row>
            </v-col>
          </v-container>
        </template>
      </v-combobox>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import Cards from '@/components/shared/Cards.vue'
export default {
  components: { Cards },
  data: () => ({
    episodes: [],
    quotes: [],
    search: null,
    dataList: [],
    dataObject: {},
  }),
  computed: {
    ...mapState('episodes', ['seasons']),
    ...mapState('qoutes', {
      quotesStore: 'quotes',
    }),
  },
  async mounted() {
    if (!this.seasons.length) this.episodes = await this.fetchEpisodes()
    if (!this.quotesStore.length) this.quotes = await this.fetchQuotes()
  },
  methods: {
    ...mapActions('characters', ['fetchCharacterByName']),
    ...mapActions('deathes', ['fetchDeathByName']),
    ...mapActions('episodes', ['fetchEpisodes']),
    ...mapActions('qoutes', ['fetchQuotes']),
    async searchData() {
      this.dataList = []
      this.dataObject = {}
      if (this.search && this.search.length >= 3) {
        this.dataObject.disabled = true
        this.dataList.push(this.checkData(await this.fetchData()))
      }
    },
    async fetchData() {
      const characters = await this.fetchCharacterByName(this.search)
      const deathes = await this.fetchDeathByName(this.search)
      const episodes = this.episodes.filter((item) =>
        item.title.toLowerCase().includes(this.search.toLowerCase())
      )
      const quotes = this.quotes.filter((item) =>
        item.quote.toLowerCase().includes(this.search.toLowerCase())
      )
      return {
        characters,
        deathes,
        episodes,
        quotes,
      }
    },
    checkData({ characters, deathes, episodes, quotes }) {
      if (characters && characters.length) {
        this.dataObject.characters = characters
      }
      if (deathes && deathes.length) {
        this.dataObject.deathes = deathes
      }
      if (deathes && episodes.length) {
        this.dataObject.episodes = episodes
      }
      if (deathes && quotes.length) {
        this.dataObject.quotes = quotes
      }
      return this.dataObject
    },
  },
}
</script>

<style></style>
