<template>
  <v-row justify="center" align="center">
    <Loader v-if="!characters.length" />
    <v-col v-else>
      <v-row class="my-3" justify="center">
        <v-col cols="6">
          <v-row justify="center" align="center">
            <span>Episode: {{ episode.episode }}</span>
            <h1 class="ma-5">{{ episode.title }}</h1>
            <span>Season: {{ episode.season }}</span>
          </v-row>
        </v-col>
      </v-row>
      <v-card class="px-4 my-6" color="basil" flat>
        <v-row>
          <template v-for="character in paginatedCards">
            <v-col
              v-if="character.name"
              :key="character.char_id"
              lg="4"
              md="6"
              cols="12"
            >
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
                <template #link>
                  <v-btn color="orange lighten-2" text>
                    <nuxt-link
                      tag="div"
                      :to="`/characters/character/${character.name}`"
                      >More {{ character.nickname }}</nuxt-link
                    >
                  </v-btn>
                </template>
                <template #description>
                  <v-row
                    v-for="(value, key, idx) in descriptionDestruction(
                      character
                    )"
                    :key="idx"
                  >
                    <v-col>
                      <span>{{ key }}: {{ value }}</span>
                    </v-col>
                  </v-row>
                </template>
              </Cards>
            </v-col>
          </template>
        </v-row>
        <v-row>
          <v-col>
            <Pagination
              :items-per-page="3"
              :data="filteredChararcters"
              @paginated="paginated"
            />
          </v-col>
        </v-row>
        <v-row align="center">
          <v-col cols="12" class="text-center"
            ><h1>
              Weather at the day of release in Albuquerque :
              {{ episode.air_date }}
            </h1>
          </v-col>
          <Weather
            :location="{ country: 'US', city: 'Albuquerque' }"
            :date="episode.air_date"
            :timezone="'Europe/Kiev'"
          />
        </v-row>
        <template v-if="deathes.length">
          <v-row>
            <v-col class="text-center"><h1>Deathes</h1></v-col>
          </v-row>
          <v-row>
            <v-col
              v-for="death in deathes"
              :key="death.death_id"
              lg="3"
              md="6"
              cols="12"
            >
              <Cards>
                <template #title>{{ death.death }}</template>
                <template #subTitle> {{ death.cause }}</template>
                <template #icon> {{ 'mdi-coffin' }} </template>
                <template #description>
                  <span>Last words: {{ death.last_words }}</span>
                  <br />
                  <span>Responsible: {{ death.responsible }}</span>
                </template>
              </Cards>
            </v-col>
          </v-row>
        </template>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions } from 'vuex'
import FavouriteBtn from '@/components/shared/FavouriteBtn.vue'
import Pagination from '@/components/shared/Pagination.vue'
import Weather from '@/components/shared/Weather.vue'
import Loader from '@/components/shared/Loader.vue'
import Cards from '@/components/shared/Cards.vue'
import { descriptionDestruction } from '@/helpers/characters'
export default {
  components: {
    Pagination,
    Cards,
    Loader,
    Weather,
    FavouriteBtn,
  },
  data: () => ({
    paginatedCards: [],
    characters: [],
    episode: {},
  }),
  computed: {
    filteredChararcters() {
      return this.characters.filter((item) => item.name)
    },
  },
  async mounted() {
    this.episode = await this.fetchEpisodeById(this.$route.params.episode)
    this.deathes = await this.fetchDeathes().then((data) => {
      return data.filter(
        (item) =>
          item.episode === parseInt(this.episode?.episode) &&
          item.season === parseInt(this.episode?.season)
      )
    })
    this.characters = await Promise.all(
      this.episode?.characters?.map(
        async (character) =>
          await this.fetchCharacterByName(character).then((data) => {
            if (data.length) {
              return data[0]
            }
            return {}
          })
      )
    )
  },
  methods: {
    descriptionDestruction,
    ...mapActions('episodes', ['fetchEpisodes', 'fetchEpisodeById']),
    ...mapActions('characters', ['fetchCharacterByName']),
    ...mapActions('deathes', ['fetchDeathes']),
    paginated(paginated) {
      this.paginatedCards = paginated
    },
  },
}
</script>

<style lang="scss" scoped></style>
