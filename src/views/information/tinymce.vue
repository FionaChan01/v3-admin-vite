<template>
  <div>
    <h2>IFrame Editor</h2>
    <editor :init="init" :api-key="apiKey" :initialValue="content" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import Editor from "@/components/editor/index"
const apiKey = "1kf68b8jnzsbtaxh2p1ek44moofujp4q78k51lx9x9svgq4c"
const content = `
<h2 style="text-align: center;">
  TinyMCE provides a <span style="text-decoration: underline;">full-featured</span> rich text editing experience, and a featherweight download.
</h2>
<p style="text-align: center;">
  <strong><span style="font-size: 14pt;"><span style="color: #7e8c8d; font-weight: 600;">No matter what you're building, TinyMCE has got you covered.</span></span></strong>
</p>`
export default defineComponent({
  components: {
    Editor
  },
  setup() {
    const init = {
      plugins: "image",
      toolbar: "image",
      images_upload_url: "http://localhost:8080/information/uploadImage" // 请替换为处理图片上传的后端URL
    }

    return {
      apiKey,
      content,
      init
    }
  }
})
</script>
