<script lang="ts" setup>
import { ref } from "vue"
import { useUserStore } from "@/store/modules/user"
import TeacherDashboard from "./teacher/index.vue"
import StudentDashboard from "./student/index.vue"

const userStore = useUserStore()
const currentRole = ref("teacher")
if (!(userStore.role === "teacher")) {
  currentRole.value = "student"
}
</script>

<template>
  <component :is="currentRole === 'teacher' ? TeacherDashboard : StudentDashboard" />
</template>
