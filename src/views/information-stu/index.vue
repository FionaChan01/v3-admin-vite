<!-- eslint-disable vue/no-deprecated-v-on-native-modifier -->
<template>
  <div class="blog-container">
    <div class="directory">
      <el-button-group>
        <el-button v-for="style in blogStyles" :key="style.value" @click="changeBlogSort(style.value)">{{
          style.label
        }}</el-button>
      </el-button-group>
    </div>
    <el-row :gutter="20">
      <el-col :span="6" v-for="post in blogPostsShow" :key="post.iId">
        <el-card :class="['blog-post', selectedStyle]" @click.native="openBlogPost(post.iId)">
          <h2 class="post-title">{{ post.iTitle }}</h2>
          <div class="post-meta">
            <span>{{ post.author }}</span>
            <span>{{ post.iTime }}</span>
          </div>
          <el-row style="float: right">
            <el-tag v-if="post.iTag == 1" round>学术前沿</el-tag>
            <el-tag v-if="post.iTag == 2" type="danger" round>招聘就业</el-tag>
            <el-tag v-if="post.iTag == 3" type="warning" round>创新创业</el-tag>
            <el-tag v-if="post.iTag == 4" type="success" round>国际交流</el-tag>
            <el-tag v-if="post.iTag == 5" type="info" round>校园生活</el-tag>
          </el-row>
          <el-row>
            <div class="post-content">{{ post.iIntro }}</div>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getAllInfo } from "@/api/information-stu"

export default {
  data() {
    return {
      selectedStyle: "",
      blogStyles: [
        { label: "全部", value: 6 },
        { label: "学术前沿", value: 1 },
        { label: "招聘就业", value: 2 },
        { label: "创新创业", value: 3 },
        { label: "国际交流", value: 4 },
        { label: "校园生活", value: 5 }
      ],
      blogPosts: [
        // {
        //   iId: 1,
        //   iTitle: "国家重点研发计划“多媒体大数据的隐私保护技术”项目启动暨实施方案论证会顺利召开",
        //   author: "重庆大学计算机学院",
        //   iTag: 1,
        //   iTime: "2023-04-11",
        //   iIntro:
        //     "2023年4月8日，由重庆大学牵头承担的“十四五”国家重点研发计划项目“多媒体大数据的隐私保护技术”项目启动暨实施方案论证会顺利召开。工信部产业发展促进中心项目主管周由胜教授、重庆市科技局副局长许志鹏、重庆大学科发院副院长谢卫东等出席会议并讲话。"
        // }
      ],
      blogPostsShow: []
    }
  },
  created() {
    getAllInfo().then((res) => {
      this.blogPostsShow = res.data.information
      this.blogPosts = this.blogPostsShow
      for (let i = 0; i < this.blogPostsShow.length; i++) {
        this.blogPostsShow[i].author = res.data.author[i]
        if (this.blogPostsShow[i].iTag == "学术前沿") this.blogPostsShow[i].iTag = 1
        else if (this.blogPostsShow[i].iTag == "招聘就业") this.blogPostsShow[i].iTag = 2
        else if (this.blogPostsShow[i].iTag == "创新创业") this.blogPostsShow[i].iTag = 3
        else if (this.blogPostsShow[i].iTag == "国际交流") this.blogPostsShow[i].iTag = 4
        else if (this.blogPostsShow[i].iTag == "校园生活") this.blogPostsShow[i].iTag = 5
      }
    })
  },
  methods: {
    changeBlogSort(value) {
      this.blogPostsShow = []
      if (value == 6) this.blogPostsShow = this.blogPosts
      console.log(this.blogPosts)
      for (let index = 0; index < this.blogPosts.length; index++) {
        const element = this.blogPosts[index]
        if (element.iTag == value) {
          this.blogPostsShow.push(element)
        }
      }
    },
    openBlogPost(postId) {
      this.$router.push({ name: "BlogPost", params: { postId } })
    }
  }
}
</script>

<style scoped>
.blog-container {
  padding: 20px;
}

.directory {
  margin-bottom: 20px;
  text-align: center;
}

.blog-post {
  height: 240px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.post-title {
  font-size: 18px;
  margin-bottom: 10px;
}

.post-meta {
  font-size: 12px;
  color: #999;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.post-content {
  font-size: 14px;
  line-height: 1.5;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}

/* 添加风格样式 */
.style1 {
  /* 风格1样式 */
}

.style2 {
  /* 风格2样式 */
}
</style>
