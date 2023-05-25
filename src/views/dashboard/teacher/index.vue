<template>
  <div class="app-container center">
    <el-container>
      <el-aside width="250px">
        <el-avatar shape="square" :size="250" :src="photoUrl" />
      </el-aside>
      <el-dialog v-model="showEditForm" title="修改学术信息" width="60%">
        <el-form :model="editForm">
          <el-form-item label="研究方向">
            <el-input v-model="editForm.researchArea" />
          </el-form-item>
          <el-form-item label="个人简介">
            <el-input v-model="editForm.personalIntroText" />
          </el-form-item>
          <el-form-item label="个人网站">
            <el-input v-model="editForm.personalIntroLink" />
          </el-form-item>
          <el-form-item label="办公时间">
            <el-input v-model="editForm.officeHour" />
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="showEditForm = false">取 消</el-button>
          <el-button type="primary" @click="submitEditForm">确 定</el-button>
        </span>
      </el-dialog>

      <el-main>
        <el-descriptions title="1. 基本信息" direction="vertical" :column="4" size="small" border>
          <el-descriptions-item label="姓名">{{ name }}</el-descriptions-item>
          <el-descriptions-item label="性别">{{ gender }}</el-descriptions-item>
          <el-descriptions-item label="电话" :span="1">{{ phone }}</el-descriptions-item>
          <el-descriptions-item label="邮件" :span="1">{{ email }}</el-descriptions-item>
          <el-descriptions-item label="学院">{{ dept }}</el-descriptions-item>
          <el-descriptions-item label="办公室">{{ office }}</el-descriptions-item>
          <el-descriptions-item label="职称">{{ position }}</el-descriptions-item>
          <el-descriptions-item label="职位">{{ title }}</el-descriptions-item>
          <el-descriptions-item label="工号">{{ jobId }}</el-descriptions-item>
        </el-descriptions>
        <el-divider border-style="double" />
        <el-descriptions title="2. 学术信息" direction="vertical" :column="4" size="small" border>
          <el-descriptions-item label="研究方向">{{ researchArea }}</el-descriptions-item>
          <el-descriptions-item label="个人简介">{{ personalIntroText }}</el-descriptions-item>
          <el-descriptions-item label="个人网站">{{ personalIntroLink }}</el-descriptions-item>
          <el-descriptions-item label="办公时间">{{ officeHour }}</el-descriptions-item>
        </el-descriptions>
        <br />
        <el-button type="primary" icon="Edit" circle @click="this.showForm()" />
        <el-divider border-style="double" />
        <el-descriptions title="3. 研究生信息" direction="vertical" :column="4" size="small" border />
        <el-table :data="students" stripe style="width: 100%">
          <el-table-column fixed prop="sName" label="姓名" width="150" align="center" />
          <el-table-column prop="sPhone" label="电话" align="center" />
          <el-table-column prop="sStudentId" label="学号" align="center" />
          <el-table-column prop="sDegreeType" label="学位" align="center">
            <template #default="scope">
              <el-tag v-if="scope.row.sDegreeType == '硕士'" type="info" effect="dark">硕士</el-tag>
              <el-tag v-else type="warning" effect="dark">博士</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="sStudentType" label="研究生类型" align="center">
            <template #default="scope">
              <el-tag v-if="scope.row.sStudentType == '专业研究生'" type="success" effect="plain">专业研究生</el-tag>
              <el-tag v-else>学术研究生</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="sGraduateDate" label="预计毕业日期" align="center" />
        </el-table>
      </el-main>
    </el-container>
  </div>
</template>

<style lang="scss" scoped>
.center {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.demo-basic {
  text-align: left;
}
</style>

<script lang="ts">
import { displayTeacher, submitTeacherInfo } from "@/api/dashboard"
import { format, parseISO } from "date-fns"
import { Edit } from "@element-plus/icons-vue"
import { submit } from "@/api/information"

export default {
  data() {
    return {
      showEditForm: false,
      editForm: {
        researchArea: "",
        personalIntroText: "",
        personalIntroLink: "",
        officeHour: ""
      },
      name: "",
      students: [],
      gender: "",
      position: "",
      phone: "",
      title: "",
      officeHour: "",
      email: "",
      photoUrl: "",
      researchArea: "",
      personalIntroText: "",
      personalIntroLink: "",
      dept: "",
      office: "",
      jobId: ""
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    showForm() {
      // console.log("showForm")
      this.showEditForm = true
      this.loadFormData()
    },
    loadFormData() {
      this.editForm.researchArea = this.researchArea
      this.editForm.personalIntroText = this.personalIntroText
      this.editForm.personalIntroLink = this.personalIntroLink
      this.editForm.officeHour = this.officeHour
    },
    submitEditForm() {
      submitTeacherInfo(this.editForm)
        .then((data) => {
          this.fetchData()
          this.$message({
            message: "修改成功",
            type: "success"
          })
        })
        .catch((err) => {
          this.$message({
            message: "修改失败",
            type: "error"
          })
        })
      // 这里可以发送请求到后端，把新的信息保存到数据库
      // 然后关闭弹窗，并更新页面上的信息
      this.showEditForm = false
    },
    fetchData() {
      displayTeacher()
        .then((data) => {
          this.students = data.data.students
          // 处理接口返回的数据
          const teacherInfo = data.data.data
          this.name = teacherInfo.teacherName
          this.gender = teacherInfo.teacherGender
          this.position = teacherInfo.teacherPosition
          this.phone = teacherInfo.teacherPhone
          this.title = teacherInfo.teacherTitle
          this.officeHour = teacherInfo.teacherOfficeHours
          this.email = teacherInfo.teacherEmail
          this.photoUrl = teacherInfo.teacherPhotoUrl
          this.researchArea = teacherInfo.teacherResearchArea
          this.personalIntroText = teacherInfo.personalIntroText
          this.personalIntroLink = teacherInfo.personalIntroLink
          this.dept = teacherInfo.teacherDept
          this.office = teacherInfo.teacherOffice
          this.jobId = teacherInfo.teacherJobId

          for (let i = 0; i < this.students.length; i++) {
            this.students[i].sGraduateDate = format(parseISO(this.students[i].sGraduateDate), "yyyy-MM-dd")
          }
        })
        .catch((error: any) => {
          // 处理错误情况
          console.log(error)
        })
    }
  }
}
</script>
