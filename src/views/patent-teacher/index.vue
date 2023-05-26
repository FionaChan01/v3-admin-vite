<!-- eslint-disable no-undef -->
<template>
  <el-container>
    <el-main>
      <el-row>
        <el-col :span="24">
          <h2>🔍 专利审核</h2>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <br />
          <h3>1. 查看学生专利</h3>
          <div v-for="(patents, name) in patentAll" :key="name">
            <h4>{{ name }}</h4>
            <div class="table-wrapper">
              <el-table :data="patents.data" stripe style="width: 100%">
                <el-table-column fixed prop="patentName" label="专利名称" width="150" align="center" />
                <el-table-column prop="patentType" label="专利类型" align="center">
                  <template #default="scope">
                    <el-tag v-if="scope.row.patentType == '发明专利'" type="info" effect="dark">发明专利</el-tag>
                    <el-tag v-else-if="scope.row.patentType == '实用新型专利'" effect="dark">实用新型专利</el-tag>
                    <el-tag v-else-if="scope.row.patentType == '软件专利'" type="success" effect="dark"
                      >软件专利</el-tag
                    >
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
                <el-table-column prop="patentInventors" label="发明人（按出版顺序）" align="center">
                  <template #default="scope">
                    {{ patents.authorNameList[scope.$index] }}
                  </template>
                </el-table-column>
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
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <br />
          <h3>2. 审核学生论文</h3>
          <div v-for="(patents, name) in patentUnderReview" :key="name">
            <h4>{{ name }}</h4>
            <div class="table-wrapper">
              <el-table :data="patents.data" stripe style="width: 100%">
                <el-table-column fixed prop="patentName" label="专利名称" width="150" align="center" />
                <el-table-column prop="patentType" label="专利类型" align="center">
                  <template #default="scope">
                    <el-tag v-if="scope.row.patentType == '发明专利'" type="info" effect="dark">发明专利</el-tag>
                    <el-tag v-else-if="scope.row.patentType == '实用新型专利'" effect="dark">实用新型专利</el-tag>
                    <el-tag v-else-if="scope.row.patentType == '软件专利'" type="success" effect="dark"
                      >软件专利</el-tag
                    >
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
                <el-table-column prop="patentInventors" label="发明人（按出版顺序）" align="center">
                  <template #default="scope">
                    {{ patents.authorNameList[scope.$index] }}
                  </template>
                </el-table-column>
                <el-table-column prop="patentNumber" label="专利号" align="center" />
                <el-table-column prop="patentReviewResult" label="审核结果" align="center">
                  <template #default="scope">
                    <el-tag v-if="scope.row.patentReviewResult == '通过'" type="success">通过</el-tag>
                    <el-tag v-else-if="scope.row.patentReviewResult == '不通过'" type="danger">不通过</el-tag>
                    <el-tag v-else>进行中</el-tag>
                  </template>
                </el-table-column>
                <el-table-column label="操作" align="center">
                  <template #default="scope">
                    <el-button
                      v-if="scope.row.patentReviewResult == '进行中'"
                      round
                      size="small"
                      type="success"
                      @click="approve(scope.row)"
                      >通过</el-button
                    >
                    <el-button
                      v-if="scope.row.patentReviewResult == '进行中'"
                      round
                      size="small"
                      type="danger"
                      @click="reject(scope.row)"
                      >不通过</el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-main></el-container
  >
</template>

<script lang="ts">
import { getStudentPatentByTeacherId, approvePatent, rejectPatent } from "@/api/patent"
import { format, parseISO } from "date-fns"
import { ElMessage } from "element-plus"
export default {
  methods: {
    approve(patent) {
      const patentId = {
        patentId: patent.patentId
      }
      approvePatent(patentId)
        .then((data) => {
          ElMessage.success("审核通过")
          this.fetchPatent()
        })
        .catch((error: any) => {
          // 处理错误情况
          console.log(error)
        })
    },

    reject(patent) {
      const patentId = {
        patentId: patent.patentId
      }
      rejectPatent(patentId)
        .then((data) => {
          ElMessage.success("审核不通过")
          this.fetchPatent()
        })
        .catch((error: any) => {
          // 处理错误情况2
          console.log(error)
        })
    },
    formatDate(date) {
      // 检查日期是否为空或无效
      if (!date) {
        // 日期为空或无效，返回空字符串或其他错误处理逻辑
        return ""
      }
      // 将日期字符串转换为 Date 对象
      const parsedDate = new Date(date)
      // 检查日期是否有效
      if (isNaN(parsedDate)) {
        // 日期无效，返回空字符串或其他错误处理逻辑
        return ""
      }
      // 使用 date-fns 的 format 函数调整日期格式
      return format(parseISO(date), "yyyy-MM-dd")
    },
    fetchPatent() {
      getStudentPatentByTeacherId()
        .then((data) => {
          this.patentAll = data.data
          for (const patents of Object.values(this.patentAll)) {
            for (const patent of patents.data) {
              // console.log("before")
              // console.log(patent.patentApplyDate)
              patent.patentApplyDate = this.formatDate(patent.patentApplyDate)
              // console.log("after")
              // console.log(patent.patentApplyDate)
              patent.patentPubDate = this.formatDate(patent.patentPubDate)
            }
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
  computed: {
    patentUnderReview() {
      const result = {}
      for (const [name, patents] of Object.entries(this.patentAll)) {
        result[name] = {
          ...patents,
          data: patents.data.filter((patent) => patent.patentReviewResult == "进行中")
        }
      }
      return result
    }
  },

  data() {
    return {
      patentAll: []
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

.input-with-select .el-input-group__prepend { background-color: var(--el-fill-color-blank); }
