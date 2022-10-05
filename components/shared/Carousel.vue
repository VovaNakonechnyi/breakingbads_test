<template>
  <div>
    <v-carousel
      v-model="model"
      :height="height"
      :cycle="cycle"
      :show-arrows="showArrows"
      :show-arrows-on-hover="showArrowsOnHover"
      :hide-delimiter-background="hideDelimiterBg"
      :hide-delimiters="hideDelimiters"
    >
      <v-carousel-item v-for="(arr, idx) in resultArray" :key="idx">
        <InfoBlock
          :title="title"
          :body="body"
          :arr-data="arr"
          :md="itemsInRow"
        />
      </v-carousel-item>
    </v-carousel>
  </div>
</template>

<script>
import InfoBlock from '@/components/shared/InfoBlock.vue'
import { slicedArray } from '@/helpers/shared'
export default {
  components: { InfoBlock },
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    title: {
      type: String,
      default: '',
    },
    body: {
      type: String,
      default: 'amber--text text-accent-3',
    },
    itemsPerSlide: {
      type: Number,
      default: 1,
    },
    itemsInRow: {
      type: Number,
      default: 3,
    },
    height: {
      type: String,
      default: '100%',
    },
    cycle: {
      type: Boolean,
      default: false,
    },
    showArrows: {
      type: Boolean,
      default: false,
    },
    showArrowsOnHover: {
      type: Boolean,
      default: false,
    },
    hideDelimiterBg: {
      type: Boolean,
      default: false,
    },
    hideDelimiters: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    model: 0,
  }),
  computed: {
    resultArray() {
      if (this.data.length) {
        return this.slicedArray(this.data, this.itemsPerSlide)
      }
      return []
    },
  },
  methods: {
    slicedArray,
  },
}
</script>

<style lang="scss" scoped></style>
