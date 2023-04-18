<template>
  <el-container>
    <el-main>
      <el-row>
        <el-col :span="24">
          <h2>奖学金状态查询</h2>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <h3>1. 综合奖学金</h3>
          <h4>(1) 本学期评分明细</h4>
          <el-descriptions direction="vertical" :column="2" border>
            <div v-for="(score, index) in scores" :key="index" style="display: block">
              <el-descriptions-item :label="score.name">{{ score.score }}</el-descriptions-item>
            </div>
          </el-descriptions>
          <h4>(2) 本学期评选结果</h4>
          <el-descriptions direction="vertical" :column="1" border>
            <el-descriptions-item label="等级">一等奖学金</el-descriptions-item>
          </el-descriptions>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <h3>2. 所有奖学金</h3>

        </el-col>
      </el-row>

    </el-main></el-container
  >
</template>

<script>
export default {
  data() {
    return {
      scores: [
        { name: "智育得分", score: 4.5 },
        { name: "德育基础分", score: 59 },
        { name: "德育加分", score: 7 },
        { name: "德育扣分", score: 0 },
        { name: "荣誉得分", score: 4.5 },
        { name: "科研竞赛加分", score: 5 },
        { name: "综合测评总分", score: 89 },
        { name: "综合测评排名", score: 3 }
      ],
      selectedScholarships: [],
      checked: []
    }
  }
}
</script>
