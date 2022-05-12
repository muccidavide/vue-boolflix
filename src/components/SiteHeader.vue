<template>
  <header>
    <div class="container-fluid align-items-center">
      <div class="row h-100">
        <div class="col d-flex align-items-center">
          <LogoSite></LogoSite>
        </div>
        <div class="col d-flex align-items-center justify-content-end">
          <SearchBar></SearchBar>

        </div>
      </div>
    </div>
  </header>
</template>

<script>
import LogoSite from "@/components/LogoSite.vue";
import SearchBar from "@/components/SearchBar.vue";

export default {
  name: "component_name",
  components: {
    LogoSite,
    SearchBar,
  },
  data() {
    return {};
  },
};
</script>


<style lang='scss' scoped>

header {
  background-color: $nf-background-primary;
  height: 100px;

  .container-fluid {
    height: 100%;


  }
}
</style>