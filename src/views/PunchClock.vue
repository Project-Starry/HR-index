<template>
  <v-app class="PunchClock">
    <v-container>
      <punchClock />
    </v-container>
  </v-app>
</template>

<script>
import punchClock from "@/components/punchClock/index.vue";
export default {
  name: "home",
  components: { punchClock },
  data() {
    return {};
  },
  methods: {
    handleClick(val) {
      this.$store.dispatch("dispatchSelectGame", val);
    },
  },
  mounted() {
    document.dispatchEvent(new Event("render-event"));
    this.$store.commit("setActivedPage", "/");
    document.title = "Home";
  },
  computed: {
    getGames() {
      return this.$store.state.games;
    },
  },
};
</script>

<style>
.about-title {
  position: relative;
  font-size: 45px;
}
.about-title-mirror {
  position: relative;
  top: -30px;
  opacity: 0.1;
  font-size: 45px;
}
</style>
