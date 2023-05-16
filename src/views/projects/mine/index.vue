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
          <el-table-column prop="pIntro" label="简介" align="center" width="400" />
          <el-table-column prop="pStatus" label="状态" align="center">
            <template #default="scope">
              <el-tag v-if="scope.row.pStatus === '已通过'" type="success" effect="plain">项目成员</el-tag>
              <el-tag v-if="scope.row.pStatus === '待审核'" type="warning" effect="plain">等待教师审核项目申请</el-tag>
              <el-tag v-if="scope.row.pStatus === '未通过'" type="danger" effect="plain">未通过申请，非项目成员</el-tag>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import { getMyProjects } from "@/api/project"
export default {
  data() {
    return {
      selectedTeacher: "",
      teacherDesc: "",
      visible: false,
      projectData: [],
      pStatus: [],
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
      getMyProjects()
        .then((data) => {
          this.projectData = data.data
          this.teacherNames = data.teacherNames
          this.pStatus = data.status
          for (let i = 0; i < this.projectData.length; i++) {
            this.projectData[i].teacherName = this.teacherNames[i]
          }
          for (let i = 0; i < this.projectData.length; i++) {
            this.projectData[i].pStatus = this.pStatus[i]
          }
        })
        .catch((error: any) => {
          // 处理错误情况
          console.log(error)
        })
    },
    indexMethod(index: number) {
      return index + 1
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
