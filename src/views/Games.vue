<template>
  <v-app>
    <v-container>
      <router-view></router-view>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: "Games",
  components: {},
  data() {
    return {};
  },
  methods: {},
  mounted() {
    document.dispatchEvent(new Event("render-event"));
    this.$store.commit("setActivedPage", "/games");
    document.title = "Games";
  },
  computed: {},
};
</script>
