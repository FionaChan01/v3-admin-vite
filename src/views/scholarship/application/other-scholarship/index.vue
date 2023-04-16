<template>
  <el-container>
    <el-main>
      <el-row>
        <el-col :span="24">
          <h2>学生奖学金申请</h2>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <h3>基础信息</h3>
          <el-descriptions title="1. 基本信息" direction="vertical" :column="4" :size="size" border>
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
          <el-descriptions column="2">
            <el-descriptions-item label="总绩点">{{ totalGPA }}</el-descriptions-item>
            <el-descriptions-item label="上学期绩点">{{ lastSemesterGPA }}</el-descriptions-item>
            <el-descriptions-item label="总排名">{{ totalRank }}</el-descriptions-item>
            <el-descriptions-item label="分学期排名">{{ semesterRank }}</el-descriptions-item>
            <el-descriptions-item label="专业排名">{{ majorRank }}</el-descriptions-item>
          </el-descriptions>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <h3>综合测评细则</h3>
          <el-table :data="evaluationRules">
            <el-table-column prop="name" label="项目" />
            <el-table-column prop="description" label="细则" />
          </el-table>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <h3>本学期自我总结</h3>
          <el-input type="textarea" v-model="selfSummary" placeholder="请填写本学期自我总结" />
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <h3>评分明细</h3>
          <el-form label-position="left" label-width="150px">
            <el-form-item label="智育得分">
              <el-input-number v-model="intellectualScore" :min="0" />
            </el-form-item>
            <el-form-item label="德育基础分">
              <el-input-number v-model="moralBaseScore" :min="0" />
            </el-form-item>
            <el-form-item label="德育加分">
              <el-input-number v-model="moralBonusScore" :min="0" />
            </el-form-item>
            <el-form-item label="德育扣分">
              <el-input-number v-model="moralDeductionScore" :min="0" />
            </el-form-item>
            <el-form-item label="荣誉得分">
              <el-input-number v-model="honorScore" :min="0" />
            </el-form-item>
            <el-form-item label="科研竞赛加分">
              <el-input-number v-model="researchCompetitionScore" :min="0" />
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <h3>奖学金申请结果</h3>
          <el-descriptions column="2" /></el-col></el-row></el-main
  ></el-container>
</template>
