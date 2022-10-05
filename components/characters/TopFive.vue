<template>
  <v-card class="px-4 my-6" color="basil" flat>
    <v-row>
      <v-col class="text-center"><h1>Top 5 characters</h1></v-col>
    </v-row>
    <v-row>
      <v-col
        v-for="(char, idx) in topFive"
        :key="char.death_id"
        cols="12"
        sm="4"
      >
        <v-row>
          <v-col class="text-center">
            <span :class="`text-h${idx + 1}`">{{ idx + 1 }}</span>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12"
            >Name:
            <h2>{{ char.responsible }}</h2></v-col
          >
          <v-col cols="12">Deathes: {{ char.number_of_deaths }}</v-col>
          <v-col cols="12"
            >Killed:
            <h3>{{ char.deathes }}</h3>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data: () => ({
    topFive: [],
  }),
  computed: {
    ...mapState('deathes', ['deathes']),
  },
  async mounted() {
    if (!this.deathes.length) await this.fetchDeathes()
    this.getTopFive()
    this.whoDied()
  },
  methods: {
    ...mapActions('deathes', ['fetchDeathes']),
    getTopFive() {
      const deathesCopy = [...this.deathes]
      this.topFive = deathesCopy
        .sort((a, b) => b.number_of_deaths - a.number_of_deaths)
        .slice(0, 5)
    },
    whoDied() {
      const deathesCopy = [...this.deathes]
      this.topFive = this.topFive.map((item) => {
        const killer = deathesCopy.filter((death) => {
          return death.responsible === item.responsible
        })
        return {
          ...item,
          deathes: killer.map((item) => item.death).join(', '),
        }
      })
    },
  },
}
</script>

<style></style>
