<template>
  <v-row justify="center" align="center">
    <Loader v-if="!character.name" />
    <v-col v-else>
      <v-card class="my-4 px-4" color="basil" flat>
        <v-row justify="space-around">
          <v-col cols="12" md="6" xl="4">
            <Cards>
              <template #img
                ><v-img :src="character.img" height="500px" contain></v-img>
              </template>
              <template #title>{{ character.name }}</template>
              <template #subTitle> {{ character.nickname }}</template>
              <template #icon> {{ 'mdi-account' }} </template>
              <template #btn>
                <FavouriteBtn :character="character" />
              </template>
              <template #description>
                <v-row
                  v-for="(value, key, idx) in descriptionDestruction(character)"
                  :key="idx"
                >
                  <v-col>
                    <span>{{ key }}: {{ value }}</span>
                  </v-col>
                </v-row>
              </template>
            </Cards>
          </v-col>
          <v-col cols="12" md="6" xl="4">
            <v-card class="overflow-y-auto my-4" height="35rem">
              <TimeLine
                :list="appearAtWithResponsibleList"
                :birthday="character.birthday"
                :status="character.status"
              />
            </v-card>
          </v-col>
        </v-row>
        <div v-if="appearAtList.length" class="my-5">
          <v-row>
            <v-col class="text-center"><h1>Appears At</h1></v-col>
          </v-row>
          <v-row>
            <v-col
              v-for="episode in paginatedAppearAtList"
              :key="episode.episode_id"
              lg="3"
              md="6"
              cols="12"
            >
              <Cards>
                <template #title>
                  <nuxt-link
                    tag="div"
                    :to="`/seasons/episode/${episode.episode_id}`"
                    >{{ episode.title }}</nuxt-link
                  >
                </template>
                <template #subTitle>
                  {{ episode.air_date }}
                </template>
                <template #icon> {{ 'mdi-dots-horizontal' }} </template>
                <template #description>
                  <span>Episode: {{ episode.episode }}</span>
                  <br />
                  <span>Season: {{ episode.season }}</span>
                </template>
              </Cards>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <Pagination
                :items-per-page="8"
                :data="appearAtList"
                @paginated="paginated"
              />
            </v-col>
          </v-row>
        </div>
        <div v-if="responsibleList.length" class="my-5">
          <v-row>
            <v-col class="text-center"><h1>Responsible for deathes</h1></v-col>
          </v-row>
          <v-row>
            <v-col
              v-for="death in paginatedResponsibleList"
              :key="death.death_id"
              lg="3"
              md="6"
              cols="12"
            >
              <Cards>
                <template #title>{{ death.death }}</template>
                <template #subTitle>{{ death.cause }}</template>
                <template #icon> {{ 'mdi-dots-horizontal' }} </template>
                <template #description>
                  <span>Last words: {{ death.last_words }}</span>
                  <br />
                  <span>Episode: {{ death.episode }}</span>
                  <br />
                  <span>Season: {{ death.season }}</span>
                </template>
              </Cards>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <Pagination
                :items-per-page="4"
                :data="responsibleList"
                @paginated="paginatedResponsible"
              />
            </v-col>
          </v-row>
        </div>
        <div v-if="quotesList.length" class="my-5">
          <v-row>
            <v-col class="text-center"><h1>Quotes</h1></v-col>
          </v-row>
          <v-row>
            <v-col
              v-for="quote in paginatedQuotesList"
              :key="quote.quote_id"
              lg="4"
              md="6"
              cols="12"
            >
              <h1 class="orange--text text-center">"{{ quote.quote }}"</h1>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <Pagination
                :items-per-page="3"
                :data="quotesList"
                @paginated="paginatedQuotes"
              />
            </v-col>
          </v-row>
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import FavouriteBtn from '@/components/shared/FavouriteBtn.vue'
import TimeLine from '@/components/main/TimeLine.vue'
import Pagination from '@/components/shared/Pagination.vue'
import Loader from '@/components/shared/Loader.vue'
import Cards from '@/components/shared/Cards.vue'
import { descriptionDestruction, addToFavourite } from '@/helpers/characters'
export default {
  components: { Cards, Pagination, Loader, TimeLine, FavouriteBtn },
  data: () => ({
    character: {},
    quotesList: [],
    responsibleList: [],
    appearAtList: [],
    paginatedQuotesList: [],
    paginatedResponsibleList: [],
    paginatedAppearAtList: [],
  }),
  computed: {
    ...mapState('episodes', ['seasons']),
    ...mapState('deathes', ['deathes']),
    appearAtWithResponsibleList() {
      if (this.appearAtList.length && this.responsibleList.length) {
        return this.appearAtList.map((episode) => {
          const sameEpisode = this.sameEpisode(episode)
          const isDeath = this.responsibleList.find(
            (death) =>
              parseInt(episode.episode) === death.episode &&
              parseInt(episode.season) === death.season
          )
          if (sameEpisode.length) {
            return {
              ...episode,
              deathes: sameEpisode.map((item) => [item.death, item.cause]),
            }
          }
          return {
            ...episode,
            death: isDeath?.death,
            cause: isDeath?.cause,
          }
        })
      }
      return this.appearAtList
    },
  },
  async mounted() {
    this.character = await this.fetchCharacterByName(
      this.$route.params.character
    ).then((data) => {
      return data[0]
    })
    this.quotes(await this.fetchQuotes())
    if (!this.deathes.length) {
      await this.fetchDeathes()
    }
    if (!this.seasons.length) {
      await this.fetchEpisodes()
    }
    this.responsible(this.deathes)
    this.appearsAt(this.seasons)
  },
  methods: {
    descriptionDestruction,
    ...mapActions('characters', ['fetchCharacterByName']),
    ...mapActions('episodes', ['fetchEpisodes']),
    ...mapActions('deathes', ['fetchDeathes']),
    ...mapActions('qoutes', ['fetchQuotes']),
    addToFavourite,
    quotes(quotes = []) {
      this.quotesList = quotes.filter(
        (item) => item.author === this.character.name
      )
    },
    responsible(deathes = []) {
      this.responsibleList = deathes.filter(
        (item) => item.responsible === this.character.name
      )
    },
    appearsAt(seasons = []) {
      this.appearAtList = seasons.filter((item) =>
        item.characters.includes(this.character.name)
      )
    },
    paginated(paginated) {
      this.paginatedAppearAtList = paginated
    },
    paginatedResponsible(paginated) {
      this.paginatedResponsibleList = paginated
    },
    paginatedQuotes(paginated) {
      this.paginatedQuotesList = paginated
    },
    sameEpisode(episode = {}) {
      let sameEpisode = this.responsibleList.filter(
        (item) =>
          parseInt(episode.episode) === item.episode &&
          parseInt(episode.season) === item.season
      )
      const isSameEpisodeLengthMoreThanOne = sameEpisode.length > 1
      if (isSameEpisodeLengthMoreThanOne) {
        sameEpisode = sameEpisode.map((item) => ({
          death: item.death,
          cause: item.cause,
        }))
        return sameEpisode
      }
      return []
    },
  },
}
</script>

<style lang="scss" scoped></style>
