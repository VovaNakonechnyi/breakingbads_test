<template>
  <div>
    <v-col class="px-0">
      <v-row v-if="maxRate <= 10" justify="end" align="center" class="mx-0">
        <span class="green--text text--darken-1"> {{ rate.Source }} </span>:
        <v-rating
          v-if="!$vuetify.breakpoint.xs"
          class="mx-2"
          :value="currentRate"
          color="amber"
          dense
          half-increments
          readonly
          :length="maxRate"
          size="20"
        ></v-rating>

        <div class="grey--text ms-4">{{ currentRate }}/{{ maxRate }}</div>
      </v-row>
      <v-row v-else justify="end" align="center" class="mx-0">
        <span class="green--text text--darken-1">{{ rate.Source }}</span> :
        <span class="grey--text ms-4">{{ rate.Value }}</span>
      </v-row>
    </v-col>
  </div>
</template>

<script>
export default {
  props: {
    rate: {
      type: Object,
      default: () => ({}),
    },
  },
  data: () => ({
    currentRate: null,
    maxRate: null,
  }),
  created() {
    this.formattedRate(this.rate?.Value)
  },
  methods: {
    formattedRate(rate = '') {
      const rateArr = rate.split('/')
      this.currentRate = parseFloat(rateArr[0])
      this.maxRate = parseFloat(rateArr[1])
    },
  },
}
</script>

<style lang="scss" scoped></style>
