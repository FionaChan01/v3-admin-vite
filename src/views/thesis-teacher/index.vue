<!-- eslint-disable no-undef -->
<template>
  <el-container>
    <el-main>
      <el-row>
        <el-col :span="24">
          <h2>📖 论文审核</h2>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <br />
          <h3>1. 查看学生论文</h3>
          <div v-for="(papers, name) in thesisAll" :key="name">
            <h4>{{ name }}</h4>
            <div class="table-wrapper">
              <el-table :data="papers.data" stripe style="width: 100%">

                <el-table-column fixed prop="tName" label="论文题目" width="150" align="center" />
                <el-table-column prop="tCategory" label="分类" align="center">
                  <template #default="scope">
                    <el-tag v-if="scope.row.tCategory == '期刊'" type="info" effect="dark">期刊</el-tag>
                    <el-tag v-else-if="scope.row.tCategory == '会议'" effect="dark">会议</el-tag>
                    <el-tag v-else type="warning" effect="dark">出版物</el-tag>
                  </template>
                </el-table-column>
                <el-table-column prop="tPublicationName" label="期刊名/ 会议名/ 出版社名" align="center" />
                <el-table-column prop="tReviewResult" label="审核结果" align="center">
                  <template #default="scope">
                    <el-tag v-if="scope.row.tReviewResult == '通过'" type="success">通过</el-tag>
                    <el-tag v-else-if="scope.row.tReviewResult == '进行中'" type="warning">进行中</el-tag>
                    <el-tag v-else-if="scope.row.tReviewResult == '不通过'" type="danger">不通过</el-tag>
                    <el-tag v-else>进行中</el-tag>
                  </template>
                </el-table-column>
                <el-table-column prop="tPublicationDate" label="出版时间" align="center" />
                <el-table-column prop="authorIds" label="作者（按出版顺序）" align="center">
                  <template #default="scope">
                    {{ papers.authorNameList[scope.$index] }}
                  </template>
                </el-table-column>
                <el-table-column prop="correspondingAuthorId" label="通讯作者" align="center">
                  <template #default="scope">
                    {{ papers.corrAuthorList[scope.$index] }}
                  </template>
                </el-table-column>
                <el-table-column prop="tLink" label="链接" align="center" />
              </el-table>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <br />
          <h3>2. 审核学生论文</h3>
          <div v-for="(papers, name) in thesisUnderReview" :key="name">
            <h4>{{ name }}</h4>
            <div class="table-wrapper">
              <el-table :data="papers.data" stripe style="width: 100%">
                <el-table-column fixed prop="tName" label="论文题目" width="150" align="center" />
                <el-table-column prop="tCategory" label="分类" align="center">
                  <template #default="scope">
                    <el-tag v-if="scope.row.tCategory == '期刊'" type="info" effect="dark">期刊</el-tag>
                    <el-tag v-else-if="scope.row.tCategory == '会议'" effect="dark">会议</el-tag>
                    <el-tag v-else type="warning" effect="dark">出版物</el-tag>
                  </template>
                </el-table-column>
                <el-table-column prop="tPublicationName" label="期刊名/ 会议名/ 出版社名" align="center" />
                <el-table-column prop="tReviewResult" label="审核结果" align="center">
                  <template #default="scope">
                    <el-tag v-if="scope.row.tReviewResult == '通过'" type="success">通过</el-tag>
                    <el-tag v-else-if="scope.row.tReviewResult == '进行中'" type="warning">进行中</el-tag>
                    <el-tag v-else-if="scope.row.tReviewResult == '不通过'" type="danger">不通过</el-tag>
                    <el-tag v-else>进行中</el-tag>
                  </template>
                </el-table-column>
                <el-table-column prop="tPublicationDate" label="出版时间" align="center" />
                <el-table-column prop="authorIds" label="作者（按出版顺序）" align="center">
                  <template #default="scope">
                    {{ papers.authorNameList[scope.$index] }}
                  </template>
                </el-table-column>
                <el-table-column prop="correspondingAuthorId" label="通讯作者" align="center">
                  <template #default="scope">
                    {{ papers.corrAuthorList[scope.$index] }}
                  </template>
                </el-table-column>
                <el-table-column prop="tLink" label="链接" align="center" />
                <el-table-column label="操作" align="center">
                  <template #default="scope">
                    <el-button
                      v-if="scope.row.tReviewResult == '进行中'"
                      round
                      size="small"
                      type="success"
                      @click="approve(scope.row)"
                      >通过</el-button
                    >
                    <el-button
                      v-if="scope.row.tReviewResult == '进行中'"
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
import { getStudentThesisByTeacherId, approveThesis, rejectThesis } from "@/api/thesis"
import { format, parseISO } from "date-fns"
import { ElMessage } from "element-plus"
export default {
  methods: {
    approve(paper) {
      // console.log(paper.tId)
      const thesisId = {
        thesisId: paper.tId
      }
      approveThesis(thesisId)
        .then((data) => {
          ElMessage.success("审核通过")
          this.fetchThesis()
        })
        .catch((error: any) => {
          // 处理错误情况
          console.log(error)
        })
    },

    reject(paper) {
      const thesisId = {
        thesisId: paper.tId
      }
      rejectThesis(thesisId)
        .then((data) => {
          ElMessage.success("审核不通过")
          this.fetchThesis()
        })
        .catch((error: any) => {
          // 处理错误情况
          console.log(error)
        })
    },
    formatDate(date) {
      // 使用 date-fns 的 format 函数调整日期格式
      return format(parseISO(date), "yyyy-MM-dd")
    },
    fetchThesis() {
      getStudentThesisByTeacherId()
        .then((data) => {
          this.thesisAll = data.data
          for (const papers of Object.values(this.thesisAll)) {
            for (const paper of papers.data) {
              paper.tPublicationDate = this.formatDate(paper.tPublicationDate)
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
    this.fetchThesis()
  },
  computed: {
    thesisUnderReview() {
      const result = {}
      for (const [name, papers] of Object.entries(this.thesisAll)) {
        result[name] = {
          ...papers,
          data: papers.data.filter((paper) => paper.tReviewResult == "进行中")
        }
      }
      return result
    }
  },

  data() {
    return {
      thesisName: "",
      thesisCategory: "",
      thesisPublicationName: "",
      thesisPublicationDate: "",
      thesisCorrspongdingAuthor: "",
      thesisAuthors: "",
      thesisLink: "",
      thesisAll: []
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
