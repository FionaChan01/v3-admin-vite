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
      <el-col :span="6" v-for="post in blogPostsShow" :key="post.id">
        <el-card :class="['blog-post', selectedStyle]" @click.native="openBlogPost(post.id)">
          <h2 class="post-title">{{ post.title }}</h2>
          <div class="post-meta">
            <span>{{ post.author }}</span>
            <span>{{ post.date }}</span>
          </div>
          <el-row style="float: right">
            <el-tag v-if="post.tag == 1" round>学术前沿</el-tag>
            <el-tag v-if="post.tag == 2" type="danger" round>招聘就业</el-tag>
            <el-tag v-if="post.tag == 3" type="warning" round>创新创业</el-tag>
            <el-tag v-if="post.tag == 4" type="success" round>国际交流</el-tag>
            <el-tag v-if="post.tag == 5" type="info" round>校园生活</el-tag>
          </el-row>
          <el-row>
            <div class="post-content">{{ post.intro }}</div>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
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
        {
          id: 1,
          title: "国家重点研发计划“多媒体大数据的隐私保护技术”项目启动暨实施方案论证会顺利召开",
          author: "重庆大学计算机学院",
          tag: 1,
          date: "2023-04-11",
          intro:
            "2023年4月8日，由重庆大学牵头承担的“十四五”国家重点研发计划项目“多媒体大数据的隐私保护技术”项目启动暨实施方案论证会顺利召开。工信部产业发展促进中心项目主管周由胜教授、重庆市科技局副局长许志鹏、重庆大学科发院副院长谢卫东等出席会议并讲话。"
        },
        {
          id: 2,
          title: "英国布里斯托大学3+1本硕双学位项目招生通知",
          author: "重庆大学计算机学院",
          tag: 4,
          date: "2022-04-17",
          intro:
            "根据重庆大学与布里斯托大学签订的3+1本硕双学位项目校际合作协议及相关规定，现启动布里斯托大学3+1本硕双学位项目2022年暑假选拔营的招生选拔工作。"
        }
        // 添加更多博客文章
      ],
      blogPostsShow: []
    }
  },
  created() {
    this.blogPostsShow = this.blogPosts
  },
  methods: {
    changeBlogSort(value) {
      this.blogPostsShow = []
      if (value == 6) this.blogPostsShow = this.blogPosts
      for (let index = 0; index < this.blogPosts.length; index++) {
        const element = this.blogPosts[index]
        if (element.tag == value) {
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
