<template>
  <el-main style="border: solid 1px white">
    <div class="course-selection">
      <div class="sidebar">
        <div class="content-header">
          <h3>🔍 快速查询</h3>
        </div>
        <!-- 左侧条件查询栏 -->
        <div class="sidebar-content">
          <el-form model="searchForm" label-width="80px" ref="searchForm">
            <el-form-item label="学期">
              <el-select v-model="searchForm.semester" placeholder="请选择">
                <el-option label="第一学期" value="1" />
                <el-option label="第二学期" value="2" />
                <el-option label="第三学期" value="3" />
              </el-select>
            </el-form-item>
            <el-form-item label="课程类型">
              <el-select v-model="searchForm.courseType" placeholder="请选择">
                <el-option label="必修课" value="1" />
                <el-option label="选修课" value="2" />
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
          <el-drawer v-model="drawer" title="课程详情" class="course-drawer">
            <div class="drawer-title">
              <div class="course-title">{{ selectedCourse.courseName }} ({{ selectedCourse.courseCode }})</div>
              <div class="course-info">
                <el-tag size="large" class="tag-title">{{ selectedCourse.credit }}学分</el-tag>
                <!-- <span class="course-label">课程编号:</span>
                <span class="course-content">{{ selectedCourse.courseCode }}</span> -->
              </div>
            </div>
            <el-divider />
            <el-table :data="selectedCourse.courseSection" stripe>
              <el-table-column prop="class" label="课程班号" />
              <el-table-column prop="teacher" label="教师" />
              <el-table-column label="已选/ 容量">
                <template #default="scope"> {{ scope.row.selected }} / {{ scope.row.capacity }} </template>
              </el-table-column>
              <el-table-column label="操作">
                <template v-slot="scope">
                  <el-button
                    :disabled="scope.row.selected >= scope.row.capacity"
                    type="primary"
                    size="small"
                    @click="enrollCourse(scope.row)"
                  >
                    选课
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-drawer>
          <el-table :data="courseList" stripe>
            <el-table-column prop="courseName" label="课程名称">
              <template #default="scope">
                <el-link @click="selectCourse(scope.$index)" target="_blank">{{ scope.row.courseName }}</el-link>
              </template>
            </el-table-column>
            <el-table-column prop="status" label="课程性质">
              <template #default="scope">
                <el-tag v-if="scope.row.type == 1" type="success" effect="plain">选修</el-tag>
                <el-tag v-else type="danger" effect="plain">必修</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="courseCode" label="课程代码" />
            <el-table-column prop="credit" label="学分" />
            <el-table-column prop="campus" label="校区" />
            <el-table-column prop="type" label="课程类别" />
            <el-table-column prop="isFulled" label="标记">
              <template #default="scope">
                <el-tag v-if="scope.row.status == false" type="success" effect="dark">可选</el-tag>
                <el-tag v-else type="danger" effect="dark">已选满</el-tag>
              </template>
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
          <ul>
            <li v-for="course in selectedCourses" :key="course.courseCode">
              {{ course.courseName }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </el-main>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      searchForm: {
        semester: "",
        courseType: ""
      },
      selectedCourse: {},
      courseList: [
        {
          courseName: "川剧艺术与身段体验",
          courseCode: "HG00072",
          credit: 3,
          campus: "D区",
          type: "通识教育课程",
          status: 0,
          isFulled: false,
          courseSection: [
            {
              class: "034",
              teacher: "河马",
              selected: 17,
              capacity: 31
            },
            {
              class: "035",
              teacher: "河马",
              selected: 31,
              capacity: 31
            },
            {
              class: "031",
              teacher: "骏马",
              selected: 1,
              capacity: 31
            }
          ]
        },
        {
          courseName: "计算机科学导论",
          courseCode: "CS10001",
          credit: 4,
          campus: "A区",
          type: "专业必修课程",
          status: 1,
          isFulled: false,
          courseSection: [
            {
              class: "001",
              teacher: "张三",
              selected: 25,
              capacity: 50
            },
            {
              class: "002",
              teacher: "李四",
              selected: 15,
              capacity: 50
            },
            {
              class: "003",
              teacher: "王五",
              selected: 30,
              capacity: 50
            }
          ]
        },
        {
          courseName: "英语写作与口语训练",
          courseCode: "EN20002",
          credit: 3,
          campus: "B区",
          type: "通识教育课程",
          status: 1,
          isFulled: false,
          courseSection: [
            {
              class: "021",
              teacher: "Johnson",
              selected: 20,
              capacity: 40
            },
            {
              class: "022",
              teacher: "Smith",
              selected: 35,
              capacity: 40
            },
            {
              class: "023",
              teacher: "Williams",
              selected: 10,
              capacity: 40
            }
          ]
        },
        {
          courseName: "艺术史与欣赏",
          courseCode: "AR30005",
          credit: 3,
          campus: "C区",
          type: "通识教育课程",
          status: 1,
          isFulled: false,
          courseSection: [
            {
              class: "041",
              teacher: "陈老师",
              selected: 5,
              capacity: 20
            },
            {
              class: "042",
              teacher: "杨老师",
              selected: 18,
              capacity: 20
            },
            {
              class: "043",
              teacher: "刘老师",
              selected: 10,
              capacity: 20
            }
          ]
        }
      ]
    }
  },
  methods: {
    handleSearch() {
      // 处理查询逻辑
    },
    resetForm() {
      this.$refs.searchForm.resetFields()
    },
    enrollCourse(course) {
      course.isEnrolled = true
      this.selectedCourses.push(course)
    },
    cancelEnrollment(course) {
      course.isEnrolled = false
      const index = this.selectedCourses.findIndex((selectedCourse) => selectedCourse.courseCode === course.courseCode)
      if (index > -1) {
        this.selectedCourses.splice(index, 1)
      }
    },
    selectCourse(index) {
      this.drawer = true
      this.selectedCourse = this.courseList[index]
      console.log(this.selectedCourse)
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
