<template>
  <div @click="open">
    <slot />
  </div>
</template>

<script>
import { Uppload, en, Local, Preview } from "uppload";
import "uppload/dist/uppload.css";
import "uppload/dist/themes/light.css";

export default {
  name: "UpploadVue",
  props: {
    uploader: Function
  },
  data: () => ({
  }),
  created() {
    if (!this.uppload) {
      this.uppload = new Uppload({
        lang: en,
        uploader: this.uploader
      });
      this.uppload.use([new Local(), new Preview()]);
      this.uppload.on("upload", url => this.$emit("input", url))
    }
  },
  methods: {
    open() {
      this.uppload.open();
    }
  }
}
</script>

<style scoped>

</style>
