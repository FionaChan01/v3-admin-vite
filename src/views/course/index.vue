<template>
  <el-main style="border: solid 1px white">
    <div class="course-selection">
      <div class="sidebar">
        <div class="content-header">
          <h3>🔍 快速查询</h3>
        </div>
        <!-- 左侧条件查询栏 -->
        <div class="sidebar-content">
          <el-form v-model="searchForm" label-width="80px" ref="searchForm">
            <el-form-item label="课程名称">
              <el-input v-model="searchForm.courseName" placeholder="请输入" />
            </el-form-item>
            <el-form-item label="课程代码">
              <el-input v-model="searchForm.courseNumber" placeholder="请输入" />
            </el-form-item>
            <el-form-item label="课程性质">
              <el-select v-model="searchForm.courseType" placeholder="请选择">
                <el-option label="必修" value="必修" />
                <el-option label="选修" value="选修" />
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="handleSearch">查询</el-button>
              <el-button @click="resetForm">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>

      <div class="content">
        <!-- 中间选课部分 -->
        <div class="content-header">
          <h3>📖 课程列表</h3>
        </div>
        <div class="content-body">
          <el-drawer v-model="drawerList" title="课程详情" class="course-drawer">
            <div class="drawer-title">
              <div class="course-title">{{ courseChoose.cName }} ({{ courseChoose.cNumber }})</div>
              <div class="course-info">
                <el-tag size="large" class="tag-title">{{ courseChoose.cCredit }}学分</el-tag>
                <!-- <span class="course-label">课程编号:</span>
                <span class="course-content">{{ selectedCourse.courseCode }}</span> -->
              </div>
            </div>
            <el-divider />
            <el-table :data="courseDetail" stripe>
              <el-table-column prop="tcNumber" label="课程班号" />
              <el-table-column prop="teachers" label="教师" />
              <el-table-column prop="tcRoom" label="教室" />
              <el-table-column prop="tcStartweek" label="上课起始周次" />
              <el-table-column prop="tcEndweek" label="上课终止周次" />
              <el-table-column prop="tcStarttime" label="上课起始时间（节）" />
              <el-table-column prop="tcEndtime" label="上课终止时间（节）" />
              <el-table-column fixed="right" label="已选/ 容量">
                <template #default="scope"> {{ scope.row.selectedNumber }} / {{ scope.row.tcCapacity }} </template>
              </el-table-column>
              <el-table-column fixed="right" label="操作">
                <template v-slot="scope">
                  <el-button
                    v-if="scope.row.canSelected"
                    :disabled="scope.row.selectedNumber >= scope.row.capacity"
                    type="primary"
                    size="small"
                    @click="enrollCourse(scope.row)"
                  >
                    选课
                  </el-button>
                  <el-button v-else :disabled="true" type="warning" size="small"> 已选 </el-button>
                  <el-button v-else type="danger" size="small" @click="withdrawCourse(scope.row)"> 退选 </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-drawer>
          <el-table :data="courseData" stripe>
            <el-table-column prop="cName" label="课程名称">
              <template #default="scope">
                <el-link @click="showCourseDetail(scope.row)" target="_blank">{{ scope.row.cName }}</el-link>
              </template>
            </el-table-column>
            <el-table-column prop="cType" label="课程性质">
              <template #default="scope">
                <el-tag v-if="scope.row.cType == '选修'" type="success" effect="plain">选修</el-tag>
                <el-tag v-else type="danger" effect="plain">必修</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="cNumber" label="课程代码" />
            <el-table-column prop="cCredit" label="学分" />
            <el-table-column prop="cCampus" label="校区" />
            <el-table-column prop="cNature" label="课程类别" />
            <el-table-column prop="isFulled" label="标记">
              <!-- <template> -->
              <el-tag type="success" effect="dark">未选满</el-tag>
              <!-- <el-tag v-else type="danger" effect="dark">已选满</el-tag> -->
              <!-- </template> -->
            </el-table-column>
            <!-- <el-table-column label="操作">
              <template v-slot="scope">
                <el-button v-if="!scope.row.isFulled" type="primary" size="small" @click="enrollCourse(scope.row)">
                  选课
                </el-button>
                <el-button v-else type="danger" size="small" @click="cancelEnrollment(scope.row)"> 取消选课 </el-button>
              </template>
            </el-table-column> -->
          </el-table>
        </div>
      </div>

      <div class="sidebar">
        <!-- 右侧已选课程列表 -->
        <div class="content-header">
          <h3>✅ 已选课程</h3>
        </div>
        <div class="sidebar-content">
          <el-table :data="selectedCourses" stripe>
            <el-table-column prop="cName" label="课程名称">
              <template #default="scope">
                <el-link @click="showCourseDetail(scope.row)" target="_blank">{{ scope.row.cName }}</el-link>
              </template>
            </el-table-column>
            <!-- <el-table-column prop="cType" label="课程性质">
              <template #default="scope">
                <el-tag v-if="scope.row.cType == '选修'" type="success" effect="plain">选修</el-tag>
                <el-tag v-else type="danger" effect="plain">必修</el-tag>
              </template>
            </el-table-column> -->
            <el-table-column prop="cNumber" label="课程代码" />
            <el-table-column prop="cCredit" label="学分" />
            <!-- <el-table-column prop="cCampus" label="校区" />
            <el-table-column prop="cNature" label="课程类别" /> -->
          </el-table>
        </div>
      </div>
    </div>
  </el-main>
</template>

<script lang="ts">
import { enrollCourse, getAllCourses, withdrawCourse, getFilteredCourses } from "@/api/course"
import { te } from "date-fns/locale"
import { ElMessage } from "element-plus"
export default {
  data() {
    return {
      drawerList: false,
      searchForm: {
        courseType: "",
        courseName: "",
        courseNumber: ""
      },
      courseChoose: {},
      courseSelected: {},
      courseDetail: {},
      courseSelectedDetail: {},
      teacherCourseData: [],
      courseData: [],
      teacherNames: [],
      numberOfPeople: [],
      selectedCourses: [],
      selectedTcIds: []
    }
  },
  created() {
    this.fetchCourses()
  },
  methods: {
    fetchCourses() {
      getAllCourses()
        .then((data) => {
          this.courseData = data.data.course
          this.teacherCourseData = data.data.teacherCourse
          this.teacherNames = data.teacherNames
          this.numberOfPeople = data.NumberOfPeople
          this.selectedCourses = data.selectedCourses
          this.selectedTcIds = data.selectedTcIds
          // for (let i = 0; i < this.projectData.length; i++) {
          //   this.projectData[i].teacherName = this.teacherNames[i]
          // }
        })
        .catch((error: any) => {
          // 处理错误情况
          console.log(error)
        })
    },
    handleSearch() {
      // 处理查询逻辑
      const searchParamData = {
        courseType: this.searchForm.courseType,
        courseName: this.searchForm.courseName,
        courseNumber: this.searchForm.courseNumber
      }
      // console.log("searchParam")
      // console.log(searchParam)
      getFilteredCourses(searchParamData).then((data) => {
        this.courseData = data.data.course
        this.teacherCourseData = data.data.teacherCourse
        this.teacherNames = data.teacherNames
        this.numberOfPeople = data.NumberOfPeople
        this.selectedCourses = data.selectedCourses
        this.selectedTcIds = data.selectedTcIds
      })
    },
    resetForm() {
      this.searchForm = {
        courseType: "",
        courseName: "",
        courseNumber: ""
      }
      this.fetchCourses()
    },
    enrollCourse(row) {
      const selectedCourseData = {
        tcId: row.tcId
      }

      enrollCourse(selectedCourseData)
        .then((data) => {
          // 处理成功情况
          this.fetchCourses()
        })
        .catch((error: any) => {
          // 处理错误情况
          console.log(error)
          ElMessage({
            message: "选课失败",
            type: "error"
          })
        })
    },
    withdrawCourse(row) {
      const selectedCourseData = {
        tcId: row.tcId
      }
      withdrawCourse(selectedCourseData)
        .then((data) => {
          // 处理成功情况
          this.fetchCourses()
        })
        .catch((error: any) => {
          // 处理错误情况
          console.log(error)
          ElMessage({
            message: "退课失败",
            type: "error"
          })
        })
    },
    showCourseDetail(row) {
      this.courseChoose = row
      this.drawerList = true
      this.courseDetail = this.teacherCourseData[row.cId]
      // this.courseDetail.teachers = this.teacherNames[row.cId]
      for (let i = 0; i < this.courseDetail.length; i++) {
        this.courseDetail[i].teachers = this.teacherNames[row.cId][i]
        if (this.numberOfPeople[this.courseDetail[i].tcId] != undefined) {
          this.courseDetail[i].selectedNumber = this.numberOfPeople[this.courseDetail[i].tcId]
        } else {
          this.courseDetail[i].selectedNumber = 0
        }
      }
      // check if the course is selected
      for (let i = 0; i < this.courseDetail.length; i++) {
        if (this.selectedTcIds.includes(this.courseDetail[i].tcId)) {
          this.courseDetail[i].canSelected = false
        } else {
          this.courseDetail[i].canSelected = true
        }
      }
    }
  }
}
</script>

<style scoped>
.course-selection {
  display: flex;
  justify-content: space-between;
}

.sidebar {
  width: 20%;
  margin-right: 0px;
  margin-left: 0px;
  /* border: 1px solid #ccc;
  border-radius: 4px; */
  background-color: #ffffff;
}

.sidebar-content {
  height: 100%;
  padding: 20px;
}

.content {
  flex-grow: 1;
  margin-right: 10px;
  margin-left: 10px;
  /* border: 1px solid #ccc;
  border-radius: 4px; */
  background-color: #ffffff;
}

.content-header {
  margin-left: 20px;
  margin-bottom: 20px;
}

.content-body {
  height: 400px;
  overflow-y: auto;
  margin: 30px;
}

.sidebar-content h3 {
  margin-bottom: 10px;
}

.sidebar-content ul {
  padding-left: 0;
  list-style: none;
}

.sidebar-content ul li {
  margin-bottom: 5px;
}

.drawer-title {
  margin: 20px;
}

.course-drawer {
  width: 400px;
  padding: 20px;
}

/* 标题样式 */
.course-title {
  font-size: 21px;
  font-weight: bold;
  margin-bottom: 20px;
}

/* 课程信息样式 */
.course-info {
  margin-bottom: 20px;
}

/* 标签样式 */
.course-label {
  display: inline-block;
  margin-right: 10px;
  font-weight: bold;
}

/* 内容样式 */
.course-content {
  display: inline-block;
  color: #555555;
}

/* 按钮样式 */
.course-button {
  display: inline-block;
  margin-right: 10px;
  padding: 8px 16px;
  border-radius: 4px;
  background-color: #409eff;
  color: #ffffff;
  cursor: pointer;
  transition: background-color 0.3s;
}

.course-button:hover {
  background-color: #66b1ff;
}

.tag-title {
  font-size: 16px;
  font-weight: bold;
}
</style>
