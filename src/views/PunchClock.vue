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
  name: "PunchClock",
  components: { punchClock },
  data() {
    return {};
  },
  methods: {},
  mounted() {
    document.dispatchEvent(new Event("render-event"));
    document.title = "PunchClock";
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
