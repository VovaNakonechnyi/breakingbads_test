<template>
  <v-app dark>
    <SideBar :drawer="drawer" />
    <Header @drawerEmit="drawer = !drawer" />
    <v-main>
      <v-container fluid>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import Header from '@/components/nav/Header.vue'
import SideBar from '@/components/nav/SideBar.vue'
export default {
  name: 'DefaultLayout',
  components: { SideBar, Header },
  data() {
    return {
      drawer: false,
      fixed: false,
      items: [],
    }
  },
  mounted() {
    if (!localStorage.getItem('favourites')) {
      localStorage.setItem('favourites', JSON.stringify([]))
    }
  },
}
</script>
