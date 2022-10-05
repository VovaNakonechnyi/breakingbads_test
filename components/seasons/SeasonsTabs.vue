<template>
  <div>
    <Loader v-if="!filteredSeasons.length" />
    <v-card v-else>
      <v-tabs
        v-model="tab"
        background-color="deep-purple accent-5"
        center-active
        fixed-tabs
        @change="$emit('emitSeasonNumber', $event + 1)"
      >
        <v-tab v-for="(item, idx) in filteredSeasons" :key="idx">
          {{ idx + 1 }}
        </v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item v-for="(season, idx) in filteredSeasons" :key="idx">
          <v-card class="mx-4" color="basil" flat>
            <v-row>
              <v-col
                v-for="episode in paginatedSeason"
                :key="episode.episode_id"
                lg="4"
                md="6"
                cols="12"
              >
                <Cards>
                  <template #title>
                    {{ episode.title }}
                  </template>
                  <template #subTitle>
                    {{ episode.air_date }}
                  </template>
                  <template #icon>
                    {{ 'mdi-account-group' }}
                  </template>
                  <template #btn>
                    <v-btn color="orange lighten-2" text>
                      <nuxt-link
                        tag="div"
                        :to="`/seasons/episode/${episode.episode_id}`"
                        >Explore More</nuxt-link
                      >
                    </v-btn>
                  </template>
                  <template #description>
                    <nav>
                      <li
                        v-for="(character, characterIdx) in episode.characters"
                        :key="characterIdx"
                      >
                        <v-btn small text>
                          <nuxt-link
                            tag="div"
                            :to="`/characters/character/${character}`"
                          >
                            {{ character }}</nuxt-link
                          >
                        </v-btn>
                      </li>
                    </nav>
                  </template>
                </Cards>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <Pagination
                  :items-per-page="6"
                  :data="season"
                  @paginated="paginated"
                />
              </v-col>
            </v-row>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import Pagination from '@/components/shared/Pagination.vue'
import Cards from '@/components/shared/Cards.vue'
import Loader from '@/components/shared/Loader.vue'
export default {
  components: {
    Pagination,
    Cards,
    Loader,
  },
  data() {
    return {
      tab: null,
      paginatedSeason: [],
    }
  },
  computed: {
    ...mapState('episodes', ['filteredSeasons']),
  },
  async mounted() {
    await this.fetchEpisodes()
  },
  methods: {
    ...mapActions('episodes', ['fetchEpisodes']),
    paginated(paginated) {
      this.paginatedSeason = paginated
    },
  },
}
</script>

<style lang="scss" scoped></style>
