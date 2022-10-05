<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="6">
      <SearchInput />
    </v-col>
    <v-col cols="12" md="6">
      <Poster />
    </v-col>
  </v-row>
</template>

<script>
import Poster from '@/components/main/Poster.vue'
import SearchInput from '@/components/main/SearchInput.vue'
export default {
  name: 'IndexPage',
  components: { SearchInput, Poster },
}
</script>
<style lang="scss" scoped></style>
