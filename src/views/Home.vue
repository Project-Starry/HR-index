<template>
  <v-app class="home">
    <v-container>
      <v-row>
        <h1 class="about-title text-left">
          No Game, No Life <br />
          <h1 class="about-title-mirror text-left">No Game, No Life</h1>
        </h1>
        <!-- <v-carousel
          v-if="getGames"
          class="quinary"
          :delimiter-icon="icons[0].icon"
          hide-delimiter-background
          cycle
          show-arrows-on-hover
          continuous
          height="100%"
        >
          <v-carousel-item
            v-for="(item, i) in getGames"
            :key="i"
            v-on:click.native="handleClick(item)"
            :to="'/games/game'"
            ><v-row justify="center">
              <v-col cols="12"> </v-col>
              <v-col cols="12" lg="8">
                <v-img
                  :src="item.imgURL"
                  max-width="1000"
                  min-height="300"
                  max-height="500"
                >
                </v-img>
              </v-col>
            </v-row>
          </v-carousel-item>
        </v-carousel> -->
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: "home",
  components: {},
  data() {
    return {
      selectIcon: "mdi-delta",
      icons: [
        { icon: "mdi-delta" },
        { icon: "mdi-checkbox-blank-outline" },
        { icon: "mdi-circle-outline" },
        { icon: "mdi-close" },
        "mdi-gamepad",
      ],
    };
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
