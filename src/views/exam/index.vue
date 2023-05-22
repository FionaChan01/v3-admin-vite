<template>
  <div>
    <el-main style="border: solid 1px white">
      <h2>排考管理</h2>
      <el-calendar v-model="value" @click="onDatePicked(value)">
        <template #date-cell="{ data }">
          <p :class="getExamDateClass(data)">
            {{ data.day.split("-").slice(1).join("-") }}
            {{ hasExam(data.day) == 0 ? "🔵" : hasExam(data.day) == 1 ? "🔴" : "" }}
          </p>
        </template>
      </el-calendar>
    </el-main>
    <el-dialog v-model="dialogVisible" :title="dialogTitle">
      <el-table :data="selectedExams" style="width: 100%">
        <el-table-column prop="course" label="科目" />
        <el-table-column prop="courseNumber" label="课号" />
        <el-table-column prop="scheduleDate" label="日期" />
        <el-table-column prop="timeStart" label="开始时间" />
        <el-table-column prop="timeEnd" label="结束时间" />
        <el-table-column prop="classroom" label="考场" />
        <el-table-column prop="seat" label="座位号" />
        <el-table-column prop="teacher" label="授课教师" />
        <el-table-column prop="type" label="考试类型">
          <template #default="scope">
            <el-tag v-if="scope.row.type == 1" type="success" effect="dark">期中考试</el-tag>
            <el-tag v-else type="danger" effect="dark">期末考试</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="open" label="是否开卷">
          <template #default="scope">
            <el-tag v-if="scope.row.open == 1" type="success" effect="plain">开卷</el-tag>
            <el-tag v-else type="danger" effect="plain">闭卷</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { ref } from "vue"
export default {
  data() {
    return {
      value: ref(new Date()),
      dialogVisible: false,
      dialogTitle: "",
      selectedExams: [],
      exams: [
        {
          id: 1,
          type: 1,
          scheduleDate: "2023-05-17",
          course: "机器学习",
          courseNumber: "658965",
          teacher: "张三",
          classroom: "DS137",
          timeStart: "14:00",
          timeEnd: "16:00",
          studentNumber: "20194178",
          studentName: "陈芊辰",
          studentClass: "012",
          seat: "42",
          status: 0,
          openBook: 0,
          credit: 3
        },
        {
          id: 2,
          type: 0,
          scheduleDate: "2023-05-27",
          course: "数据结构",
          courseNumber: "789654",
          teacher: "李四",
          classroom: "CS204",
          timeStart: "09:00",
          timeEnd: "11:00",
          studentNumber: "20194002",
          studentName: "王五",
          studentClass: "021",
          seat: "18",
          status: 0,
          openBook: 0,
          credit: 3
        },
        {
          id: 3,
          type: 0,
          scheduleDate: "2023-05-29",
          course: "数据库",
          courseNumber: "456789",
          teacher: "赵六",
          classroom: "IT101",
          timeStart: "14:00",
          timeEnd: "16:00",
          studentNumber: "20194123",
          studentName: "刘七",
          studentClass: "032",
          seat: "26",
          status: 1,
          openBook: 0,
          credit: 3
        },
        {
          id: 4,
          type: 1,
          scheduleDate: "2023-05-30",
          course: "操作系统",
          courseNumber: "987654",
          teacher: "王八",
          classroom: "CS302",
          timeStart: "14:00",
          timeEnd: "16:00",
          studentNumber: "20194058",
          studentName: "李九",
          studentClass: "041",
          seat: "33",
          status: 0,
          openBook: 1,
          credit: 3
        }
      ]
    }
  },
  methods: {
    hasExam(date: string) {
      const today = new Date()
      const dateObj = new Date(date)
      if (this.exams.some((exam) => exam.scheduleDate === date)) {
        if (dateObj < today) {
          return 0
        }
        return 1
      }
      return 2
    },
    getExamDateClass(data: { day: any }) {
      return this.hasExam(data.day)
    },
    onDatePicked(value: object) {
      const selectedDate = JSON.stringify(value).substring(1, 11)
      const selectedExams = this.exams.filter((exam) => exam.scheduleDate == selectedDate)

      if (selectedExams.length > 0) {
        this.dialogVisible = true
        this.dialogTitle = "考试安排"
        this.selectedExams = selectedExams
      } else {
        this.dialogVisible = false
      }
    }
  }
}
</script>

<style scoped>
.exam-date {
  background-color: red;
}
</style>
