<!-- eslint-disable no-undef -->
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
          <h3>2. 我的奖学金</h3>
          <div class="table-wrapper">
            <el-table :data="scholarshipTableData" stripe style="width: 100%" max-height="250">
              <el-table-column fixed prop="scholarshipName" label="奖学金名字" width="150" align="center" />

              <el-table-column prop="results" label="等级" align="center" />

              <el-table-column prop="semester" label="学期" align="center" />
              <el-table-column prop="status" label="状态" align="center">
                <template #default="scope">
                  <el-tag v-if="scope.row.status == 0" type="success" effect="plain">申请成功</el-tag>
                  <el-tag v-else-if="scope.row.status == 2" type="danger" effect="plain">申请失败</el-tag>
                  <el-tag v-else type="warning" effect="plain">申请中</el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="amount" label="金额" align="center" />
            </el-table>
          </div>
        </el-col>
      </el-row> </el-main
  ></el-container>
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
      checked: [],
      scholarshipTableData: [
        {
          scholarshipName: "综合奖学金",
          semester: "2020-2021学年第一学期",
          status: 0,
          results: "一等奖学金",
          amount: "1250"
        },
        {
          scholarshipName: "综合奖学金",
          semester: "2020-2021学年第二学期",
          status: 0,
          results: "一等奖学金",
          amount: "1250"
        },
        {
          scholarshipName: "国家奖学金",
          semester: "2021-2022学年第一学期",
          status: 0,
          results: "国家奖学金",
          amount: "8000"
        },
        {
          scholarshipName: "综合奖学金",
          semester: "2021-2022学年第二学期",
          status: 0,
          results: "一等奖学金",
          amount: "1250"
        },
        {
          scholarshipName: "综合奖学金",
          semester: "2022-2023学年第一学期",
          status: 0,
          results: "二等奖学金",
          amount: "750"
        },
        {
          scholarshipName: "综合奖学金",
          semester: "2022-2023学年第二学期",
          status: 1,
          results: "二等奖学金",
          amount: "750"
        },
        {
          scholarshipName: "唐立新奖学金",
          semester: "2023-2024学年第一学期",
          status: 2,
          results: "------",
          amount: "0"
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.search-wrapper {
  margin-bottom: 20px;
  :deep(.el-card__body) {
    padding-bottom: 2px;
  }
}

.toolbar-wrapper {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.table-wrapper {
  margin-bottom: 20px;
}

.pager-wrapper {
  display: flex;
  justify-content: flex-end;
}
</style>
