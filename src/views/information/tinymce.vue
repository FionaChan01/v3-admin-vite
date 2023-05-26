<template>
  <div>
    <el-main>
      <h2>ℹ️ 信息发布</h2>
      <!-- add a component to show title -->
      <el-textarea v-model="title" :rows="1" placeholder="文章标题" />
      <!-- add a component to select tag -->
      <el-select v-model="tag" placeholder="文章标签">
        <el-option label="学术前沿" value="学术前沿" />
        <el-option label="创新创业" value="创新创业" />
        <el-option label="国际交流" value="国际交流" />
        <el-option label="招聘就业" value="招聘就业" />
        <el-option label="校园生活" value="校园生活" />
      </el-select>
      <editor :init="init" :api-key="apiKey" v-model="content" />
      <el-button type="info" @click="generateTitle">GPT generate title</el-button>
      <el-button type="info" @click="upload">Submit</el-button>
    </el-main>
  </div>
</template>

<script lang="ts">
import { ref } from "vue"
import axios from "axios"
import { defineComponent } from "vue"
import Editor from "@/components/editor/index"
import { submit, gpt } from "@/api/information"
import { getToken } from "@/utils/cache/cookies"

const apiKey = "1kf68b8jnzsbtaxh2p1ek44moofujp4q78k51lx9x9svgq4c"
const content = ref('<h2 style="text-align: center;">在此编辑内容...</h2>')
const prompt = ref("给这篇文章一个标题，文章用｜间隔，文章是HTML格式的")
const response = ref("")

export default defineComponent({
  data() {
    return {
      API_KEY: "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",
      title: "",
      tag: ""
    }
  },
  components: {
    Editor
  },
  created() {},
  methods: {
    generateTitle() {
      const prompts = {
        userPrompt: "<article>" + this.content + "</article>",
        systemPrompt:
          "给这篇文章一个标题，文章用<article></article>间隔, 文章是HTML格式的, 并根据文章主题分配一个tag, tag的全部类型在<tag></tag>里, 并使用,隔开：<tag>学术前沿, 创新创业, 国际交流, 招聘就业, 校园生活</tag>. 以JSON格式返回, 包括以下键：tag, title"
      }
      console.log(prompts)
      gpt(prompts).then((res) => {
        console.log(res)
        // convert res to object
        const resObj = JSON.parse(res)
        this.title = resObj.title
        this.tag = resObj.tag
      })
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
