<template>
  <v-row justify="center" align="center">
    <v-col v-if="!characters.length" cols="12">
      <h1 class="text-center">No one!</h1>
    </v-col>
    <v-col v-else cols="12">
      <v-row>
        <v-col
          v-for="character in characters"
          :key="character.char_id"
          cols="12"
          md="6"
          xl="4"
        >
          <Cards>
            <template #img
              ><v-img :src="character.img" height="500px" contain></v-img>
            </template>
            <template #title>{{ character.name }}</template>
            <template #subTitle> {{ character.nickname }}</template>
            <template #btn>
              <FavouriteBtn
                :character="character"
                @characters-array="updateCharacters"
              />
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
          </Cards>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import Cards from '@/components/shared/Cards.vue'
import FavouriteBtn from '@/components/shared/FavouriteBtn.vue'
import { removeFromFavourite } from '@/helpers/characters'
export default {
  components: { Cards, FavouriteBtn },
  data: () => ({
    characters: [],
    show: false,
  }),
  mounted() {
    if (localStorage.getItem('favourites')) {
      this.characters = JSON.parse(localStorage.getItem('favourites'))
    }
  },
  methods: {
    removeFromFavourite,
    updateCharacters(characters) {
      this.characters = characters
    },
  },
}
</script>

<style></style>
