<template>
  <v-app class="calendar" id="Calendar">
    <v-container>
      <calendar />
      <post v-if="getAuth && getAdmin" />
    </v-container>
  </v-app>
</template>

<script>
import post from "@/components/calendar/postNewEvent.vue";
import calendar from "@/components/calendar/index.vue";

export default {
  name: "Calendar",
  components: {
    post,
    calendar,
  },
  data() {
    return {
      auth: null,
    };
  },
  methods: {},
  mounted() {
    document.dispatchEvent(new Event("render-event"));
    this.$store.commit("setActivedPage", "/calendar");
    document.title = "Calendar";
    this.$vuetify.goTo("#Calendar");
  },
  computed: {
    getAuth() {
      return this.$store.state.user;
    },
    getAdmin() {
      return this.$store.state.isAdmin;
    },
  },
};
</script>
