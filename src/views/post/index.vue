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
          <vue-markdown :source="content" />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { getInfoById } from "@/api/information-stu"
import { defineComponent } from "vue"
import { ref } from "vue"
import VueMarkdown from 'vue-markdown';

const content = ref("")
const post = ref({})

export default defineComponent({
  components: {
    VueMarkdown
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
      content.value = post.value.iContent
    })
  },
  setup() {
    return {
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
