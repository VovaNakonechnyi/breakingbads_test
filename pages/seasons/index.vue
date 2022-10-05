<template>
  <v-row justify="center" align="center">
    <v-col>
      <v-row justify="center">
        <v-col class="text-center" cols="6">
          <h1>Season {{ seasonNumber }}</h1>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="12" xl="9">
          <SeasonsTabs @emitSeasonNumber="setSeasonNumber" />
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import SeasonsTabs from '@/components/seasons/SeasonsTabs.vue'

export default {
  name: 'Seasons',
  components: {
    SeasonsTabs,
  },
  data: () => ({
    seasonNumber: 1,
  }),
  methods: {
    setSeasonNumber(seasonNumber) {
      this.seasonNumber = seasonNumber
    },
  },
}
</script>

<style lang="scss" scoped></style>
