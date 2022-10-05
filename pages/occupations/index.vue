<template>
  <v-row justify="center" align="center">
    <Loader v-if="!characters.length" />
    <v-col v-else>
      <v-row>
        <v-col cols="12"><h1 class="text-center">Occupations</h1></v-col>
        <v-col cols="12">
          <Carousel
            :data="uniqueOccupations"
            :show-arrows-on-hover="true"
            :hide-delimiter-bg="true"
            :items-per-slide="20"
            :items-in-row="4"
          />
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions } from 'vuex'
import Carousel from '@/components/shared/Carousel.vue'
import Loader from '@/components/shared/Loader.vue'
import { descriptionDestruction } from '@/helpers/characters'
import { capitalizeEachWord } from '@/helpers/shared'
export default {
  components: { Loader, Carousel },
  data: () => ({
    characters: [],
    uniqueOccupations: [],
  }),
  computed: {},
  async mounted() {
    this.characters = await this.fetchCharacters()
    this.uniqueOccupations = this.uniqueRelatedCharactersOccupations()
  },
  methods: {
    descriptionDestruction,
    capitalizeEachWord,
    ...mapActions('characters', ['fetchCharacters']),
    uniqueRelatedCharactersOccupations() {
      const charactersOccupations = this.characters.map((item) => ({
        occupations: item.occupation,
        name: item.name,
      }))
      const uniqueOccupations = Array.from(
        new Set(
          this.characters
            .map((item) => item.occupation.map((str) => str.toLowerCase()))
            .flat(Infinity)
        ).map((item) => {
          return charactersOccupations.reduce(
            (accum, cur) => {
              if (cur.occupations.find((str) => str.toLowerCase() === item)) {
                accum[item].push(cur.name)
              }
              return accum
            },
            {
              [item]: [],
            }
          )
        })
      )
      return this.uniqueOccupationsToUpperCaseAndStrings(uniqueOccupations)
    },
    uniqueOccupationsToUpperCaseAndStrings(arr = []) {
      return arr.map((item) => {
        const res = {}
        for (const key in item) {
          res[this.capitalizeEachWord(key)] = item[key].join(', ')
        }
        return res
      })
    },
    // paginated(paginated) {
    //   this.paginatedCards = paginated
    // },
  },
}
</script>
<style lang="scss" scoped></style>
