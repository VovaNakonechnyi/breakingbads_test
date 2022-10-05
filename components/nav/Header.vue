<template>
  <div>
    <v-app-bar fixed app>
      <v-app-bar-nav-icon @click.stop="$emit('drawerEmit')" />
      <v-toolbar-title>Breaking Bad Club</v-toolbar-title>
      <v-spacer></v-spacer>
      <nuxt-link
        tag="a"
        class="orange--text text-decoration-none"
        :to="`/favourites`"
      >
        <v-icon>
          {{ 'mdi-cards-heart' }}
        </v-icon>
      </nuxt-link>
    </v-app-bar>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped></style>
