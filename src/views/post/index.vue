<!-- BlogPost.vue -->
<template>
  <div class="blog-post-container">
    <el-row>
      <el-col :span="22" :offset="1">
        <el-card>
          <h2 class="post-title">{{ post.title }}</h2>
          <div class="post-meta">
            <span>{{ post.author }}</span>
            <span>{{ post.date }}</span>
          </div>
          <div v-html="post.content" class="post-content" />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  props: {
    postId: Number
  },
  data() {
    return {
      post: {},
      img1: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/19112901-1575009243.jpg",
      img2: "@/assets/post-pic/example2.jpeg"
    }
  },
  created() {
    // 在实际应用中，您可能需要从服务器获取博客文章数据
    const blogPosts = [
      {
        id: 1,
        title: "国家重点研发计划“多媒体大数据的隐私保护技术”项目启动暨实施方案论证会顺利召开",
        author: "重庆大学计算机学院",
        tag: 1,
        date: "2023-04-11",
        content: `2023年4月8日，由重庆大学牵头承担的“十四五”国家重点研发计划项目“多媒体大数据的隐私保护技术”项目启动暨实施方案论证会顺利召开。工信部产业发展促进中心项目主管周由胜教授、重庆市科技局副局长许志鹏、重庆大学科发院副院长谢卫东等出席会议并讲话。项目责任专家、中兴通讯股份有限公司副总裁王继刚，重庆大学科发院重大项目管理办公室主任赵亮，重庆大学计算机学院党委书记杨守鸿，项目实施方案论证专家组专家，项目负责人重庆大学计算机学院副院长向涛教授，各课题负责人以及40余位项目骨干参加会议。会议由重庆大学计算机学院院长廖晓峰教授主持。<br><img src="http://www.cs.cqu.edu.cn/__local/C/AB/67/EAEA013558F27056345D3C520DC_40CA4962_186BA.jpg " <br><br> 启动仪式上，谢卫东代表重庆大学致欢迎辞，他对各位来宾与会指导表示欢迎。周由胜代表项目主管单位对项目立项背景、基本情况等进行了介绍。许志鹏对项目具体实施提出了指导性意见。随后，会议成立了以贵州大学副校长马建峰教授为组长，国内十余名网络空间安全学科相关著名专家学者为专家组成员的项目实施方案论证专家组。<br><img src="http://www.cs.cqu.edu.cn/__local/F/AF/7B/243F561048BACA11B5467ECCB0A_41363B73_1DAE9.jpg"> />`
      },
      {
        id: 2,
        title: "英国布里斯托大学3+1本硕双学位项目招生通知",
        author: "重庆大学计算机学院",
        date: "2022-04-17",
        content: "根据重庆大学与布里斯托大学签订的3+1本硕双学位项目校际合作协议及相关规定，现启动布里斯托大学3+1本硕双学位项目2022年暑假选拔营的招生选拔工作。<br>一、学校介绍<br><br>布里斯托大学（University of Bristol），简称“布大”，始建于1876年，位于英格兰西南部被誉为“欧洲硅谷”的布里斯托市，为世界百强名校（QS2021）、世界一流研究型大学，是英国著名的六所红砖大学之一。布里斯托大学拥有众多学术界教授和校友，其中包括47位皇家学会研究员、17位英国科学院研究员、13位诺贝尔奖获得者。布里斯托大学被评为全英科研质量最好的五所顶尖研究型大学之一，其工程部素有“工程王国”之称。2021年QS英国大学排名位列第9名；2020年QS世界大学排名位列第49名。"
      }
    ]
    this.post = blogPosts.find((post) => post.id == this.postId)
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
