<template>
  <v-row>
    <Loader v-if="!poster.Title" />
    <v-card v-else color="#121212">
      <v-img height="550px" contain :src="poster.Poster"></v-img>

      <v-card-title class="d-flex justify-center my-4"
        ><h1>{{ poster.Title }}</h1></v-card-title
      >
      <v-card-subtitle class="my-2">
        <v-row>
          <v-col>
            <h3>Genre: {{ poster.Genre }}</h3></v-col
          >
          <v-col class="text-right">
            <h3>
              IMDB: {{ poster.imdbRating }} <v-icon>{{ 'mdi-star' }}</v-icon>
            </h3>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <h4>
              Actors:
              <span class="green--text">
                {{ poster.Actors }}
              </span>
            </h4></v-col
          >
          <v-col class="text-right">
            <h4>First released: {{ poster.Released }}</h4>
          </v-col>
        </v-row>
      </v-card-subtitle>
      <v-row>
        <v-col>
          <Carousel
            :data="
              formattedPostersData(
                poster,
                'Rated',
                'Metascore',
                'Year',
                'imdbVotes',
                'totalSeasons',
                'Runtime'
              )
            "
            :cycle="true"
            :show-arrows-on-hover="true"
            :hide-delimiter-bg="true"
            :hide-delimiters="true"
            :items-per-slide="3"
          />
        </v-col>
      </v-row>
      <v-card-text class="my-2">
        <Rating v-for="(rate, idx) in poster.Ratings" :key="idx" :rate="rate" />
        <v-row>
          <v-col>
            <h3 class="green--text">Awards</h3>
            <h4>{{ poster.Awards }}</h4>
          </v-col>
        </v-row>
        <InfoBlock
          :arr-data="
            formattedPostersData(poster, 'Country', 'Language', 'Writer')
          "
        />
      </v-card-text>

      <v-divider class="mx-4"></v-divider>
      <v-card-text>
        <div class="text--primary text-center subtitle-1">
          {{ poster.Plot }}
        </div>
      </v-card-text>
    </v-card>
  </v-row>
</template>

<script>
import { mapActions } from 'vuex'
import Loader from '@/components/shared/Loader.vue'
import InfoBlock from '@/components/shared/InfoBlock.vue'
import Rating from '@/components/main/Rating.vue'
import Carousel from '@/components/shared/Carousel.vue'
import { formattedArrayWithObjects as formattedPostersData } from '@/helpers/shared'
export default {
  name: 'IndexPage',
  components: { Rating, Carousel, InfoBlock, Loader },
  data: () => ({
    poster: {},
    model: 0,
  }),
  async mounted() {
    this.poster = await this.fetchPoster()
  },
  methods: {
    ...mapActions('omdb', ['fetchPoster']),
    formattedPostersData,
  },
}
</script>
<style lang="scss" scoped></style>
