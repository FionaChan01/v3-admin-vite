<!-- BlogPost.vue -->
<template>
  <div class="blog-post-container">
    <el-row>
      <el-col :span="22" :offset="1">
        <el-card>
          <h2 class="post-title">{{ post.iTitle }}</h2>
          <div class="post-meta">
            <span>{{ post.author }}</span>
            <span>{{ post.iTime }}</span>
          </div>
          <editor :init="init" :api-key="apiKey" v-model="content" />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { getInfoById } from "@/api/information-stu"
import { defineComponent } from "vue"
import Editor from "@/components/editor/index"
import { ref } from "vue"

const apiKey = "1kf68b8jnzsbtaxh2p1ek44moofujp4q78k51lx9x9svgq4c"
const content = ref('')
const post = ref({})


export default defineComponent({
  components: {
    Editor
  },
  props: {
    postId: Number
  },
  created() {
    const data = {
      iId: this.postId
    }
    console.log(data)
    // 在实际应用中，您可能需要从服务器获取博客文章数据
    getInfoById(data).then((res) => {
      post.value = res.data.information
      post.value.author = res.data.author
      content = post.value.iContent
    })
  },
  setup() {
    const init = {
      images_upload_url: "http://localhost:8080/information/uploadImage", // 请替换为处理图片上传的后端URL
      init_instance_callback: (editor) => {
        editor.on("change", () => {
          content.value = editor.getContent()
        })
      }
    }
    return {
      init,
      apiKey,
      content,
      post
    }
  }
})
</script>

<style scoped>
.blog-post-container {
  padding: 20px;
}

.post-title {
  font-size: 24px;
  margin-bottom: 10px;
}

.post-meta {
  font-size: 14px;
  color: #999;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.post-content {
  font-size: 16px;
  line-height: 1.5;
}
</style>
