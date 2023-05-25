<!-- eslint-disable no-undef -->
<template>
  <el-container>
    <el-main>
      <el-row>
        <el-col :span="24">
          <h2>论文管理</h2>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <h3>1. 论文审核</h3>
          <div>
            <h5>(1) 题目</h5>
            <el-input v-model="thesisName" placeholder="请输入论文名称" />
          </div>
          <div class="mt-4">
            <h5>(2) 类别</h5>
            <el-input v-model="thesisPublicationName" placeholder="请输入期刊名/ 会议名" class="input-with-select">
              <template #prepend>
                <el-select v-model="thesisCategory" placeholder="选择分类" style="width: 115px">
                  <el-option label="期刊" value="1" />
                  <el-option label="会议" value="2" />
                </el-select>
              </template>
            </el-input>
          </div>
          <div>
            <h5>(3) 出版时间</h5>
            <div class="block">
              <el-date-picker v-model="thesisPublicationDate" type="date" placeholder="选择日期" />
            </div>
          </div>
          <div>
            <h5>(4) 通讯作者（以分号间隔）</h5>
            <div class="block">
              <el-input v-model="thesisCorrspongdingAuthor" placeholder="请输入通讯作者工号（以分号间隔）" />
            </div>
          </div>
          <div>
            <h5>(5) 作者</h5>
            <div class="block">
              <el-input v-model="thesisAuthors" placeholder="请输入文章作者学号（以分号间隔）" />
            </div>
          </div>
          <div>
            <h5>(6) 文章链接</h5>
            <el-input v-model="thesisLink" placeholder="请输入链接地址">
              <template #prepend>Http://</template>
            </el-input>
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
          <h3>2. 我的论文</h3>
          <div class="table-wrapper">
            <el-table :data="thesisTableData" stripe style="width: 100%">
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
              <el-table-column prop="correspondingAuthorId" label="通讯作者" align="center" />
              <el-table-column prop="authorIds" label="作者（按出版顺序）" align="center" />
              <el-table-column prop="tLink" label="链接" align="center" />
            </el-table>
          </div>
        </el-col>
      </el-row> </el-main
  ></el-container>
</template>

<script lang="ts">
import { getThesisByStudentId } from "@/api/thesis"
import { format, parseISO } from "date-fns"
import { submitThesis } from "@/api/thesis"

export default {
  methods: {
    async handleSubmit() {
      const thesisData = {
        thesisName: this.thesisName,
        thesisCategory: this.thesisCategory,
        thesisPublicationName: this.thesisPublicationName,
        thesisPublicationDate: this.thesisPublicationDate,
        thesisCorrspongdingAuthor: this.thesisCorrspongdingAuthor,
        thesisAuthors: this.thesisAuthors,
        thesisLink: this.thesisLink,
        thesisReviewResult: "进行中"
      }

      // 检查所有字段是否都不为空
      for (const key in thesisData) {
        if (!thesisData[key]) {
          this.$message({
            message: this.en2zh[key] + "不能为空！",
            type: "error"
          })
          return
        }
      }

      try {
        const response = await submitThesis(thesisData)
        console.log("论文成功提交审核", response)
        // 提交成功的弹窗
        this.$message({
          message: "论文成功提交审核！",
          type: "success"
        })
        this.fetchThesis()
      } catch (error) {
        console.error("论文提交审核出错", error)
      }
    },
    fetchThesis() {
      getThesisByStudentId()
        .then((data) => {
          this.thesisTableData = data.data
          //traverse thesisTableData
          for (let i = 0; i < this.thesisTableData.length; i++) {
            this.thesisTableData[i].tPublicationDate = format(
              parseISO(this.thesisTableData[i].tPublicationDate),
              "yyyy-MM-dd"
            )
            this.thesisTableData[i].authorIds = data.authorNameList[i]
            this.thesisTableData[i].correspondingAuthorId = data.corrAuthorList[i]
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
  data() {
    return {
      en2zh: {
        thesisName: "论文题目",
        thesisCategory: "类别",
        thesisPublicationName: "出版物名",
        thesisPublicationDate: "出版时间",
        thesisCorrspongdingAuthor: "通讯作者",
        thesisAuthors: "论文作者",
        thesisLink: "论文链接"
      },
      studentId: 2019194178,
      thesisName: "",
      thesisCategory: "",
      thesisPublicationName: "",
      thesisPublicationDate: "",
      thesisCorrspongdingAuthor: "",
      thesisAuthors: "",
      thesisLink: "",
      thesisTableData: []
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
