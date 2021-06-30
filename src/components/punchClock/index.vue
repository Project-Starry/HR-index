<template>
  <div>
    <v-btn @click="doPunch" text outlined width="100">打卡</v-btn>
    <v-data-table
      :headers="headers"
      :items="items"
      :items-per-page="5"
      class="elevation-1"
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
      let temp = await doPunchFirebase();
      this;
      console.log(temp);
    },
    async doRead() {
      let data = await readPunch();
      Object.keys(data.obj).forEach((element) => {
        this.items.push({
          name: element,
          in: data.obj[element].in,
          out: data.obj[element].out,
        });
      });
    },
  },
  computed: {},
  watch: {},
  async mounted() {
    this.doRead();
  },
};
</script>
