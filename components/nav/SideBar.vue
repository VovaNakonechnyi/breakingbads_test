<template>
  <div>
    <v-navigation-drawer v-model="drawerState" fixed app>
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  props: {
    drawer: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      drawerState: this.drawer,
      items: [
        {
          icon: 'mdi-home',
          title: 'Main',
          to: '/',
        },
        {
          icon: 'mdi-account-group',
          title: 'Characters',
          to: '/characters',
        },
        {
          icon: 'mdi-briefcase-outline',
          title: 'Occupations',
          to: '/occupations',
        },
        {
          icon: 'mdi-numeric',
          title: 'Seasons',
          to: '/seasons',
        },
      ],
    }
  },
  watch: {
    drawer(val) {
      this.drawerState = val
    },
  },
}
</script>

<style lang="scss" scoped></style>
