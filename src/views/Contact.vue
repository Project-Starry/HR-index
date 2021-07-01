<template>
  <div class="contact" id="Contact">
    <contactForm />
  </div>
</template>

<script>
import contactForm from "@/components/forms/contact.vue";
export default {
  name: "Contact",
  components: { contactForm },
  methods: {},
  mounted() {
    document.dispatchEvent(new Event("render-event"));
    this.$store.commit("setActivedPage", "/contact");
    document.title = "Contact";
    this.$vuetify.goTo("#Contact");
  },
};
</script>
