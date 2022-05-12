<template>
  <div id="app">
    <SiteHeader></SiteHeader>
    <!-- /Header -->
    <MainSite></MainSite>

    <!-- /Main Component -->
  </div>
</template>

<script>
import SiteHeader from "@/components/SiteHeader.vue";
import MainSite from "@/components/MainSite.vue";

export default {
  name: "App",
  components: {
    SiteHeader,
    MainSite,
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/style.scss";


</style>
