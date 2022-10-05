<template>
  <div>
    <v-timeline>
      <v-timeline-item>{{ birthday }}</v-timeline-item>
      <v-timeline-item
        v-for="episode in list"
        :key="episode.episode_id"
        :color="episode.death || episode.deathes ? 'red' : 'blue'"
        class="text-right"
      >
        <v-card class="elevation-2">
          <v-card-title class="text-h6 pb-0">
            {{ episode.title }}
          </v-card-title>
          <v-card-text class="text-left py-1">
            Episode: {{ episode.episode }}
          </v-card-text>
          <v-card-text class="text-left py-1">
            Season: {{ episode.season }}
          </v-card-text>
          <template v-if="episode.deathes">
            <div v-for="(death, idx) in episode.deathes" :key="idx">
              <v-card-text class="py-1"> Killed: {{ death[0] }} </v-card-text>
              <v-card-text class="py-1">
                {{ death[1] }}
              </v-card-text>
            </div>
          </template>
          <template v-else>
            <v-card-text v-if="episode.death" class="py-1">
              Killed: {{ episode.death }}
            </v-card-text>
            <v-card-text v-if="episode.cause" class="py-1">
              {{ episode.cause }}
            </v-card-text>
          </template>
        </v-card>
      </v-timeline-item>
      <v-timeline-item>{{ status }}</v-timeline-item>
    </v-timeline>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    birthday: {
      type: String,
      default: '-',
    },
    status: {
      type: String,
      default: '-',
    },
  },
}
</script>

<style lang="scss" scoped></style>
