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
          <div v-html="post.iContent" class="post-content" />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getInfoById } from "@/api/information-stu"
export default {
  props: {
    postId: Number
  },
  data() {
    return {
      post: {}
    }
  },
  created() {
    // 在实际应用中，您可能需要从服务器获取博客文章数据
    getInfoById(this.postId).then((res) => {
      this.post = res.data.information
      this.post.author = res.data.author
    })
  }
}
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
