<template>
  <div class="app-container center">
    <el-container>
      <el-aside width="250px">
        <el-avatar shape="square" :size="250" :src="photoUrl" />
      </el-aside>
      <el-main>
        <el-descriptions title="1. 基本信息" direction="vertical" :column="4" size="small" border>
          <el-descriptions-item label="姓名">{{ name }}</el-descriptions-item>
          <el-descriptions-item label="性别">{{ gender }}</el-descriptions-item>
          <el-descriptions-item label="民族">{{ ethnicity }}</el-descriptions-item>
          <el-descriptions-item label="政治面貌">
            <el-tag v-if="political == '共青团员'" size="small" type="success">共青团员</el-tag>
            <el-tag v-if="political == '共产党员'" size="small" type="danger">共产党员</el-tag>
            <el-tag v-if="political == '群众'" size="small">群众</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="电话" :span="1">{{ phone }}</el-descriptions-item>
          <el-descriptions-item label="家庭住址" :span="3">{{ address }} </el-descriptions-item>
          <el-descriptions-item label="证件类型" :span="1">
            <el-tag v-if="idType == '身份证'" size="small">身份证</el-tag>
            <el-tag v-if="idType == '护照'" size="small">护照</el-tag>
            <el-tag v-if="idType == '港澳通行证'" size="small">港澳通行证</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="证件号码" :span="3">{{ idNumber }}</el-descriptions-item>
        </el-descriptions>
        <el-divider border-style="double" />
        <el-descriptions title="2. 研究生学业信息" direction="vertical" :column="4" size="small" border>
          <el-descriptions-item label="学院">{{ college }}</el-descriptions-item>
          <el-descriptions-item label="专业">{{ major }}</el-descriptions-item>
          <el-descriptions-item label="导师">{{ mentor }}</el-descriptions-item>
          <el-descriptions-item label="学籍">{{ status }}</el-descriptions-item>
          <el-descriptions-item label="年级">{{ grade }}</el-descriptions-item>
          <el-descriptions-item label="班级">{{ clazz }}</el-descriptions-item>
          <el-descriptions-item label="学号">{{ studentId }}</el-descriptions-item>
          <el-descriptions-item label="入学日期">{{ gradeYear }}</el-descriptions-item>
          <el-descriptions-item label="研究生类型">{{ studentType }}</el-descriptions-item>
          <el-descriptions-item label="学位类型">{{ degreeType }}</el-descriptions-item>
          <el-descriptions-item label="预计毕业日期">{{ graduateDate }}</el-descriptions-item>
        </el-descriptions>
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
import { display } from "@/api/dashboard"
import { IDashboardStuResponseData } from "@/api/dashboard/types/dashboard"
import { format, parseISO } from "date-fns"

export default {
  data() {
    return {
      photoUrl: "",
      id: 2019194178,
      name: "",
      gender: "",
      ethnicity: "",
      political: "",
      phone: "",
      address: "",
      idType: "",
      idNumber: "",
      college: "",
      major: "",
      mentor: "",
      status: "",
      grade: 0,
      clazz: "",
      studentId: "",
      gradeYear: "",
      graduateDate: "",
      degreeType: "",
      studentType: ""
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      display()
        .then((data) => {
          this.mentor = data.data.mentorName
          // 处理接口返回的数据
          const studentInfo = data.data.data
          this.name = studentInfo.sName
          this.gender = studentInfo.sGender
          this.ethnicity = studentInfo.sEthnicity
          this.political = studentInfo.sPoliticalStatus
          this.phone = studentInfo.sPhone
          this.address = studentInfo.sAddress
          this.idType = studentInfo.sIdType
          this.idNumber = studentInfo.sIdNumber
          this.college = studentInfo.sDept
          this.major = studentInfo.sMajor
          this.status = studentInfo.sRegistrationStatus
          this.grade = studentInfo.sGradeYear
          this.clazz = studentInfo.sClass
          this.studentId = studentInfo.sStudentId
          this.gradeYear = format(parseISO(studentInfo.sEnrollmentDate), "yyyy-MM-dd")
          this.photoUrl = studentInfo.sPhoto
          this.graduateDate = format(parseISO(studentInfo.sGraduateDate), "yyyy-MM-dd")
          this.degreeType = studentInfo.sDegreeType
          this.studentType = studentInfo.sStudentType
        })
        .catch((error: any) => {
          // 处理错误情况
          console.log(error)
        })
    }
  }
}
</script>
