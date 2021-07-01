<template>
  <div>
    <v-toolbar elevation="0">
      <v-btn v-if="!loading" @click="doPunch" text outlined width="100">
        打卡
      </v-btn>
      <v-card-title>{{ state }}</v-card-title>
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="items"
      :items-per-page="5"
      class="elevation-1"
      :loading="loading"
      loading-text="Loading... Please wait"
    ></v-data-table>
  </div>
</template>

<script>
import { doPunchFirebase, readPunch } from "@/api/punch/punch.js";

export default {
  name: "Punch",
  props: [],
  components: {},
  data() {
    return {
      state: "",
      user: null,
      loading: true,
      headers: [
        {
          text: "Date",
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "In", value: "in" },
        { text: "Out", value: "out" },
      ],
      items: [],
    };
  },
  methods: {
    async doPunch() {
      let data = await doPunchFirebase();
      if (data == -1) return;
      else {
        this.doRead();
      }
    },
    async doRead() {
      let data = await readPunch(this.user.uid);
      this.ensertData(data);
      this.loading = false;
    },
    ensertData(data) {
      if (!data) return;

      this.items = [];
      Object.keys(data).forEach((element) => {
        this.items.push({
          name: element,
          in: data[element].in,
          out: data[element].out,
        });
      });
    },
    checkState() {
      let today = new Date();
      let dd = String(today.getDate()).padStart(2, "0");
      let mm = String(today.getMonth() + 1).padStart(2, "0");
      let yyyy = today.getFullYear();
      today = mm + "" + dd + "" + yyyy;

      this.items.forEach((el) => {
        if (el.name == today && el.out == "n/a") {
          this.state = "上班中";
        }
      });
    },
  },
  computed: {},
  watch: {},
  async mounted() {
    this.user = await this.$store.state.user;
    await this.doRead();
    await this.checkState();
  },
};
</script>
