<template>
  <div>
    <v-pagination v-model="page" :length="pagesNumber"></v-pagination>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    itemsPerPage: {
      type: Number,
      default: 2,
    },
  },
  data: () => ({
    page: 1,
  }),
  computed: {
    pagesNumber() {
      return Math.ceil(this.data.length / this.itemsPerPage)
    },
  },
  watch: {
    page() {
      this.pagination()
    },
  },
  mounted() {
    this.pagination()
  },
  methods: {
    pagination() {
      const from = (this.page - 1) * this.itemsPerPage
      const to = from + this.itemsPerPage
      const paginatedData = this.data.slice(from, to)
      this.$emit('paginated', paginatedData)
      return paginatedData
    },
  },
}
</script>

<style lang="scss" scoped></style>
