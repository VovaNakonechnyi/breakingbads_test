<template>
  <v-row justify="center" align="center">
    <Loader v-if="!characters.length" />
    <v-col v-else>
      <TopFive />
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
              :items-per-page="9"
              :data="characters"
              @paginated="paginated"
            />
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions } from 'vuex'
import TopFive from '@/components/characters/TopFive.vue'
import FavouriteBtn from '@/components/shared/FavouriteBtn.vue'
import Cards from '@/components/shared/Cards.vue'
import Pagination from '@/components/shared/Pagination.vue'
import Loader from '@/components/shared/Loader.vue'
import { descriptionDestruction } from '@/helpers/characters'
export default {
  components: { Pagination, Cards, Loader, FavouriteBtn, TopFive },
  data: () => ({
    characters: [],
    paginatedCards: [],
  }),
  computed: {
    isAddedToFavourite() {
      const favourites = JSON.parse(localStorage.getItem('favourites'))
      return (id) => {
        if (favourites.length) {
          return !!favourites.find((character) => character.char_id === id)
        }
        return false
      }
    },
  },
  async mounted() {
    this.characters = await this.fetchCharacters()
  },
  methods: {
    descriptionDestruction,
    ...mapActions('characters', ['fetchCharacters']),
    paginated(paginated) {
      this.paginatedCards = paginated
    },
  },
}
</script>
<style lang="scss" scoped></style>
