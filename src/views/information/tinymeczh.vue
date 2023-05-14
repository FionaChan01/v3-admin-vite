<template>
  <div class="container"><tiny-mce ref="tinyMce" :value="richTextValue" :config="{ height: 780 }" /></div>
</template>

<script lang="ts">
import TinyMce from "@/components/TinyMce/Tinymce.vue"
import axios from "axios"
axios.defaults.withCredentials = true
export default {
  name: "Home",
  components: { TinyMce },
  data() {
    return {
      richTextValue: ""
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
}
</style>
