<template>
  <div class="app-container">
    <el-card shadow="never">
      <div class="table-wrapper">
        <!-- <el-dialog v-model="visible" :show-close="false">
          <template #header="{ close, titleId, titleClass }">
            <div class="card-header">
              <h4 :id="titleId" :class="titleClass">{{ selectedTeacher }}</h4>
              <el-button class="close-button" @click="close" type="danger">
                <el-icon class="el-icon--left"><CircleCloseFilled /></el-icon>
                关闭
              </el-button>
            </div>
          </template>
          {{ selectedTeacher }}老师的研究方向为：{{ teacherDesc }}
        </el-dialog> -->
        <el-table :data="projectData" :stripe="true">
          <el-table-column type="index" :index="indexMethod" />
          <el-table-column prop="pName" label="项目名称" align="center" width="210" />
          <el-table-column prop="teacherName" label="指导老师" align="center">
            <!-- <template #default="scope">
              <el-link @click="selectTeacher(scope.row.$index)" target="_blank">{{ scope.row.advisor }}</el-link>
            </template> -->
          </el-table-column>
          <el-table-column prop="pType" label="类别" align="center" />
          <el-table-column prop="pDept" label="部门" align="center" />
          <el-table-column prop="pSource" label="课题来源" align="center" />
          <el-table-column prop="pCurrentNum" label="课题状态" align="center">
            <template #default="scope">
              <el-tag v-if="scope.row.pLimit > scope.row.pCurrentNum" type="success" effect="plain">可选</el-tag>
              <el-tag v-else type="danger" effect="plain">不可选</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="pIntro" label="简介" align="center" width="600" />
          <el-table-column label="操作" align="center">
            <template #default="scope">
              <el-button size="small" @click="choose(scope.row)" v-if="scope.row.pLimit > scope.row.pCurrentNum">选择</el-button>
              <el-button size="small" v-else disabled>选择</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import { ElMessage, ElMessageBox } from "element-plus"
import { submitProjectApplication, getAllProjects } from "@/api/project"
export default {
  data() {
    return {
      selectedTeacher: "",
      teacherDesc: "",
      visible: false,
      projectData: [],
      teacherNames: [],
      searchData: {
        name: "",
        advisor: ""
      }
    }
  },
  created() {
    this.fetchProjects()
  },
  methods: {
    fetchProjects() {
      getAllProjects()
        .then((data) => {
          this.projectData = data.data.data
          this.teacherNames = data.data.teacherNames
          for (let i = 0; i < this.projectData.length; i++) {
            this.projectData[i].teacherName = this.teacherNames[i]
          }
        })
        .catch((error: any) => {
          // 处理错误情况
          console.log(error)
        })
    },
    indexMethod(index: number) {
      return index + 1
    },
    choose(row: any) {
      ElMessageBox.confirm("确认选择该项目？", {
        confirmButtonText: "确认",
        cancelButtonText: "取消"
      })
        .then(() => {
          // console.log("teacherId")
          // console.log(row.teacherId)
          // console.log("teacherId")
          // console.log(row.teacherId)
          const data = {
            pId: row.pId,
            teacherId: row.teacherId
          }
          submitProjectApplication(data).then(() => {
            // console.log(res)
            ElMessage({
              type: "success",
              message: "成功提交申请"
            })
          })
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "选择失败"
          })
        })
    }
    // selectTeacher(index: number) {
    //   this.visible = true
    //   this.selectedTeacher = this.tableData[index].advisor
    //   this.teacherDesc = this.tableData[index].desc
    // }
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

.close-button {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

.card-header {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
