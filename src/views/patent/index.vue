<!-- eslint-disable no-undef -->
<template>
  <el-container>
    <el-main>
      <el-row>
        <el-col :span="24">
          <h2>专利管理</h2>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <h3>1. 专利审核</h3>
          <div>
            <h5>(1) 名称</h5>
            <el-input v-model="patentName" placeholder="请输入专利名称" />
          </div>
          <div class="mt-4">
            <h5>(2) 类别</h5>
            <el-select v-model="patentCategory" placeholder="选择专利类型">
              <el-option label="发明专利" value="1" />
              <el-option label="实用新型专利" value="2" />
              <el-option label="外观设计专利" value="3" />
              <el-option label="软件专利" value="4" />
            </el-select>
          </div>
          <div>
            <h5>(3) 专利描述</h5>
            <el-input v-model="patentDesc" placeholder="请输入专利名称" />
          </div>
          <div>
            <h5>(4) 发明人</h5>
            <div class="block">
              <el-input v-model="patentInventors" placeholder="请输入专利发明人学号/工号（以分号间隔）" />
            </div>
          </div>
          <div>
            <h5>(5) 专利申请/审批时间</h5>
            <div class="line-spacing">
              <el-date-picker v-model="patentApplyDate" type="date" placeholder="选择专利申请日期" />
            </div>
            <div class="block">
              <el-date-picker v-model="patentPubDate" type="date" placeholder="选择专利审批日期" />
            </div>
          </div>
          <div class="mt-4">
            <h5>(6) 专利状态</h5>
            <el-select v-model="patentStatus" placeholder="选择状态">
              <el-option label="申请中" value="1" />
              <el-option label="已授权" value="2" />
              <el-option label="已无效" value="3" />
            </el-select>
          </div>
          <div>
            <h5>(7) 专利号</h5>
            <el-input v-model="patentNumber" placeholder="请输入专利号" />
          </div>
          <br />
          <el-row>
            <el-button type="primary" @click="handleSubmit">
              提交审核<el-icon class="el-icon--right"><Upload /></el-icon>
            </el-button>
          </el-row>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <br />
          <h3>2. 我的专利</h3>
          <div class="table-wrapper">
            <el-table :data="patentTableData" stripe style="width: 100%">
              <el-table-column fixed prop="patentName" label="专利名称" width="150" align="center" />
              <el-table-column prop="patentType" label="专利类型" align="center">
                <template #default="scope">
                  <el-tag v-if="scope.row.patentType == '发明专利'" type="info" effect="dark">发明专利</el-tag>
                  <el-tag v-else-if="scope.row.patentType == '实用新型专利'" effect="dark">实用新型专利</el-tag>
                  <el-tag v-else-if="scope.row.patentType == '软件专利'" type="success" effect="dark">软件专利</el-tag>
                  <el-tag v-else type="warning" effect="dark">外观设计专利</el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="patentStatus" label="专利状态" align="center">
                <template #default="scope">
                  <el-tag v-if="scope.row.patentStatus == '已授权'" type="success" effect="plain">已授权</el-tag>
                  <el-tag v-else-if="scope.row.patentStatus == '申请中'" type="warning" effect="plain">申请中</el-tag>
                  <el-tag v-else-if="scope.row.patentStatus == '已无效'" type="danger" effect="plain">已无效</el-tag>
                  <el-tag v-else>进行中</el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="patentApplyDate" label="专利申请日期" align="center" />
              <el-table-column prop="patentPubDate" label="专利发布日期" align="center" />
              <el-table-column prop="patentInventors" label="发明人（按出版顺序）" align="center" />
              <el-table-column prop="patentNumber" label="专利号" align="center" />
              <el-table-column prop="patentReviewResult" label="审核结果" align="center">
                <template #default="scope">
                  <el-tag v-if="scope.row.patentReviewResult == '通过'" type="success">通过</el-tag>
                  <el-tag v-else-if="scope.row.patentReviewResult == '进行中'" type="warning">进行中</el-tag>
                  <el-tag v-else-if="scope.row.patentReviewResult == '不通过'" type="danger">不通过</el-tag>
                  <el-tag v-else>进行中</el-tag>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-col>
      </el-row>
    </el-main></el-container
  >
</template>

<script lang="ts">
import { getPatentByStudentId, submitPatent } from "@/api/patent"
import { format, parseISO } from "date-fns"

export default {
  methods: {
    async handleSubmit() {
      const patentData = {
        patentName: this.patentName,
        patentType: this.patentCategory,
        patentDesc: this.patentDesc,
        patentInventors: this.patentInventors,
        patentApplyDate: this.patentApplyDate,
        patentPubDate: this.patentPubDate,
        patentStatus: this.patentStatus,
        patentReviewResult: "进行中",
        patentNumber: this.patentNumber
      }

      // 检查所有字段是否都不为空
      for (const key in patentData) {
        if (!patentData[key] && key != "patentPubDate" && key != "patentNumber") {
          this.$message({
            message: this.en2zh[key] + "不能为空！",
            type: "error"
          })
          return
        }
      }

      try {
        const response = await submitPatent(patentData)
        console.log("专利成功提交审核", response)
        // 提交成功的弹窗
        this.$message({
          message: "专利成功提交审核！",
          type: "success"
        })
        this.fetchPatent()
      } catch (error) {
        console.error("专利提交审核出错", error)
      }
    },
    fetchPatent() {
      getPatentByStudentId()
        .then((data) => {
          this.patentTableData = data.data
          //traverse thesisTableData
          for (let i = 0; i < this.patentTableData.length; i++) {
            this.patentTableData[i].patentApplyDate = format(
              parseISO(this.patentTableData[i].patentApplyDate),
              "yyyy-MM-dd"
            )
            this.patentTableData[i].patentPubDate = format(
              parseISO(this.patentTableData[i].patentPubDate),
              "yyyy-MM-dd"
            )
            this.patentTableData[i].patentInventors = data.authorNameList[i]
          }
        })
        .catch((error: any) => {
          // 处理错误情况
          console.log(error)
        })
    }
  },
  created() {
    this.fetchPatent()
  },
  data() {
    return {
      en2zh: {
        patentName: "专利名称",
        patentCategory: "专利类型",
        patentDesc: "专利描述",
        patentInventors: "专利发明人",
        patentApplyDate: "专利申请日期"
      },
      patentName: "",
      patentCategory: "",
      patentDesc: "",
      patentInventors: "",
      patentApplyDate: "",
      patentPubDate: "",
      patentStatus: "",
      patentReviewResult: "",
      patentNumber: "",
      patentTableData: []
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

.line-spacing {
  margin-bottom: 10px; /* 设置下外边距，实现行间间隔 */
}

.pager-wrapper {
  display: flex;
  justify-content: flex-end;
}
</style>

.input-with-select .el-input-group__prepend { background-color: var(--el-fill-color-blank); }
