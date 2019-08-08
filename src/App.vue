<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <router-link
          to="/"
          class="home-link"
        >
          HOME
        </router-link>
      </v-toolbar-title>
    </v-app-bar>
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    //
  })
}
</script>

<style scoped lang="stylus">
  .home-link {
    font-weight: lighter;
    text-decoration: none;
  }
</style>
