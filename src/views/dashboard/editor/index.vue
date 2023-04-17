<template>
  <div class="app-container center">
    <el-container>
      <el-aside width="250px">
        <el-avatar shape="square" :size="250" :src="squareUrl" />
      </el-aside>
      <el-main>
        <el-descriptions title="1. 基本信息" direction="vertical" :column="4" size="small" border>
          <el-descriptions-item label="姓名">陈芊辰</el-descriptions-item>
          <el-descriptions-item label="性别">女</el-descriptions-item>
          <el-descriptions-item label="民族">汉</el-descriptions-item>
          <el-descriptions-item label="政治面貌">
            <el-tag size="small" type="success">共青团员</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="电话" :span="1">18100000000</el-descriptions-item>
          <el-descriptions-item label="家庭住址" :span="3">重庆市沙坪坝区大学城南路55号 </el-descriptions-item>
          <el-descriptions-item label="证件类型" :span="1">
            <el-tag size="small">身份证</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="证件号码" :span="3">500000200100000000</el-descriptions-item>
        </el-descriptions>
        <el-divider border-style="double" />
        <el-descriptions title="2. 研究生学业信息" direction="vertical" :column="4" size="small" border>
          <el-descriptions-item label="学院">计算机学院</el-descriptions-item>
          <el-descriptions-item label="专业">计算机科学与技术</el-descriptions-item>
          <el-descriptions-item label="导师">杨广超</el-descriptions-item>
          <el-descriptions-item label="学籍">在籍</el-descriptions-item>
          <el-descriptions-item label="年级">2019级</el-descriptions-item>
          <el-descriptions-item label="班级">计算机科学与技术（卓越）1班</el-descriptions-item>
          <el-descriptions-item label="学号">20194178</el-descriptions-item>
          <el-descriptions-item label="入学日期">2019/9</el-descriptions-item>
        </el-descriptions>
      </el-main>
    </el-container>
  </div>
</template>

<style lang="scss" scoped>
.center {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.demo-basic {
  text-align: left;
}
</style>

<script lang="ts" setup>
import { reactive, toRefs } from "vue"

const state = reactive({
  squareUrl: "src/assets/imgs/identity.png",
  sizeList: ["small", "", "large"] as const
})

const { squareUrl } = toRefs(state)
</script>
