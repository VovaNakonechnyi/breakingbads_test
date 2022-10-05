<template>
  <v-row class="my-4">
    <v-col
      v-for="(obj, index) in arrData"
      :key="index"
      :cols="6"
      :sm="4"
      :md="12 / md"
    >
      <template v-for="(val, key, idx) in obj">
        <div :key="idx" class="my-4 text-center text-subtitle-1">
          <span :class="title">{{ key }}:</span>
          <h3 :class="body">{{ val }}</h3>
        </div>
      </template>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    arrData: {
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
    md: {
      type: Number,
      default: 3,
    },
  },
}
</script>

<style lang="scss" scoped></style>
