<template>
  <div>
    <v-card class="my-4" :width="width" outlined>
      <div>
        <slot name="img"></slot>
      </div>
      <v-card-title class="orange--text">
        <slot name="title"></slot>
      </v-card-title>
      <v-card-subtitle> <slot name="subTitle"></slot> </v-card-subtitle>
      <v-card-subtitle class="py-0">
        <slot name="moreInfo"></slot>
      </v-card-subtitle>

      <v-card-actions>
        <v-btn icon @click="show = !show">
          <v-icon>
            <slot name="icon"></slot>
          </v-icon>
        </v-btn>

        <v-spacer></v-spacer>

        <slot name="btn"></slot>
        <slot name="link"></slot>
      </v-card-actions>

      <v-expand-transition>
        <div v-show="show">
          <v-divider></v-divider>

          <v-card-text>
            <slot name="description"></slot>
          </v-card-text>
        </div>
      </v-expand-transition>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    width: {
      type: String,
      default: '100%',
    },
  },
  data: () => ({
    show: false,
  }),
}
</script>

<style lang="scss" scoped></style>
