<template>
  <v-container>
    <v-app>
      <v-app-bar app>
        <router-link to="/" style="text-decoration: none"><v-btn plain>Home</v-btn></router-link>
        <router-link to="/converter" style="text-decoration: none"><v-btn plain>Mp3 Converter</v-btn></router-link>
      </v-app-bar>
      <v-main class="mt-10">
        <v-container>
          <router-view></router-view>
        </v-container>

      </v-main>
    </v-app>
  </v-container>

</template>

<script>

// import SearchBox from "@/components/search-box";
export default {
  name: 'App',

  components: {
    // SearchBox
  },

  data: () => ({
    //
  }),
};
</script>
