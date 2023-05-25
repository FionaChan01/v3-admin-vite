<template>
  <div>
    <el-main>
      <h2>ℹ️ 信息发布</h2>
      <editor :init="init" :api-key="apiKey" v-model="content" />
      <el-button type="info" @click="upload">Submit</el-button>
    </el-main>
  </div>
</template>

<script lang="ts">
import { ref } from "vue"
import axios from "axios"
import { defineComponent } from "vue"
import Editor from "@/components/editor/index"
import { submit } from "@/api/information"
import { getToken } from "@/utils/cache/cookies"
const apiKey = "1kf68b8jnzsbtaxh2p1ek44moofujp4q78k51lx9x9svgq4c"
const content = ref('<h2 style="text-align: center;">在此编辑内容...</h2>')
const prompt = ref("给这篇文章一个标题，文章用｜间隔，文章是HTML格式的")
const response = ref("")

export default defineComponent({
  data() {
    return {
      API_KEY: "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"
    }
  },
  components: {
    Editor
  },
  created() {
    this.generateText()
  },
  methods: {
    async generateText() {
      const res = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          message: [{ role: "user", content: prompt.value + content.value }]
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer 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`
          }
        }
      )
      response.value = res.data.choices[0].text.trim()
      console.log(response.value)
    }
  },
  setup() {
    const init = {
      plugins: "image | fullscreen | charmap | emoticons | insertdatetime | wordcount | code",
      toolbar: "image | fullscreen | charmap | emoticons | insertdatetime | wordcount | code",
      images_upload_url: "http://localhost:8080/information/uploadImage", // 请替换为处理图片上传的后端URL
      init_instance_callback: (editor) => {
        editor.on("change", () => {
          content.value = editor.getContent()
        })
      }
    }
    const upload = () => {
      const data = {
        token: getToken(),
        content: content.value
      }
      submit(data).then((res) => {
        console.log(res)
      })
    }

    return {
      apiKey,
      content,
      init,
      upload
    }
  }
})
</script>

<style>
button {
  background-color: #4caf50; /* Green */
  border: none;
  color: white;
  margin: auto;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
}
</style>
