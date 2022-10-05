<template>
  <div>
    <v-btn color="orange lighten-2" text @click="toFavourite(character)">
      <v-icon>
        {{ addedCharacter ? 'mdi-cards-heart' : 'mdi-cards-heart-outline' }}
      </v-icon>
    </v-btn>
  </div>
</template>

<script>
import { addToFavourite, removeFromFavourite } from '@/helpers/characters'
export default {
  props: {
    character: {
      type: Object,
      default: () => ({}),
    },
  },
  data: () => ({
    addedCharacter: false,
  }),
  mounted() {
    const favourites = JSON.parse(localStorage.getItem('favourites'))
    this.addedCharacter = !!favourites.find(
      (item) => item.char_id === this.character.char_id
    )
  },
  methods: {
    addToFavourite,
    removeFromFavourite,
    toFavourite(currentCharacter) {
      let characters = []
      if (this.addedCharacter) {
        characters = this.removeFromFavourite(currentCharacter.char_id)
      } else {
        characters = this.addToFavourite(currentCharacter)
      }
      this.$emit('characters-array', characters)
      this.addedCharacter = !this.addedCharacter
    },
  },
}
</script>

<style></style>
