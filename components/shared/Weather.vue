<template>
  <v-row
    v-if="weatherData && weatherData.summary"
    class="my-2"
    justify="center"
  >
    <v-col cols="6">
      <v-row>
        <v-col>
          <v-row align="center">
            <span class="mx-2">Summary:</span>
            <h2 class="mx-2">{{ weatherData.summary }}</h2>
          </v-row>
          <v-row align="center">
            <span class="mx-2">Temperature:</span>
            <h2 class="mx-2">{{ weatherData.temperature }}</h2>
            c*
          </v-row>
          <v-row align="center">
            <span class="mx-2">Feels like:</span>
            <h2 class="mx-2">{{ weatherData.apparentTemperature }}</h2>
            c*
          </v-row>
          <v-row align="center">
            <span class="mx-2">UV index:</span>
            <h2 class="mx-2">
              {{ weatherData.uvIndex }}
            </h2>
          </v-row>
        </v-col>
        <v-col>
          <v-row align="center">
            <span class="mx-2">Humidity:</span>
            <h2 class="mx-2">{{ weatherData.humidity }}</h2>
            %
          </v-row>
          <v-row align="center">
            <span class="mx-2">Wind Speed:</span>
            <h2 class="mx-2">{{ weatherData.windSpeed }}</h2>
            m/s
          </v-row>
          <v-row align="center">
            <span class="mx-2">Feels like:</span>
            <h2 class="mx-2">{{ weatherData.pressure }}</h2>
            hPa
          </v-row>
          <v-row align="center">
            <span class="mx-2">Visibility</span>
            <h2 class="mx-2">
              {{ weatherData.visibility }}
            </h2>
            km
          </v-row>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
  <v-row v-else>
    <v-col class="text-center"><h1>-</h1></v-col>
  </v-row>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  props: {
    location: {
      type: Object,
      default: () => ({}),
    },
    date: {
      type: String || Number,
      default: '',
    },
    timezone: {
      type: String,
      default: '',
    },
  },
  data: () => ({
    weatherData: {},
  }),
  async mounted() {
    this.weatherData = await this.fetchWeather({
      location: this.location,
      date: this.date,
      timezone: this.timezone,
    })
  },
  methods: {
    ...mapActions('weather', ['fetchWeather']),
  },
}
</script>
<style lang="scss" scoped></style>
