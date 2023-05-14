<template>
  <div class="app-container">
    <el-card shadow="never">
      <div class="table-wrapper">
        <el-dialog v-model="visible" :show-close="false">
          <template #header="{ close, titleId, titleClass }">
            <div class="my-header">
              <h4 :id="titleId" :class="titleClass">老师详情</h4>
              <el-button @click="close">
                <el-icon class="el-icon--left"><CircleCloseFilled /></el-icon>
                Close
              </el-button>
            </div>
          </template>
          张三老师的研究方向为：机器学习，深度学习，强化学习，致力于机器学习相关交叉应用的落地
        </el-dialog>
        <el-table :data="tableData" :stripe="true">
          <el-table-column prop="id" label="项目id" align="center" />
          <el-table-column prop="name" label="项目名称" align="center" width="210" />
          <el-table-column prop="advisor" label="指导老师" align="center">
            <template #default="scope">
              <el-link @click="visible = true" target="_blank">{{ scope.row.advisor }}</el-link>
            </template>
          </el-table-column>
          <el-table-column prop="type" label="类别" align="center" />
          <el-table-column prop="dept" label="部门" align="center" />
          <el-table-column prop="source" label="课题来源" align="center" />
          <el-table-column prop="status" label="课题状态" align="center">
            <template #default="scope">
              <el-tag v-if="scope.row.status == 0" type="success" effect="plain">可选</el-tag>
              <el-tag v-else type="danger" effect="plain">不可选</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="intro" label="简介" align="center" width="600" />
          <el-table-column prop="action" label="操作" align="center">
            <el-button size="small" @click="choose()">选择</el-button>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import { ElMessage, ElMessageBox } from "element-plus"
export default {
  data() {
    return {
      visible: false,
      tableData: [
        {
          id: 1,
          name: "基于深度学习的自动驾驶系统",
          advisor: "张三",
          type: "科研",
          dept: "计算机科学",
          source: "校内",
          status: 0,
          intro: "本项目旨在研究和开发基于深度学习技术的自动驾驶系统，提高驾驶安全性和效率。"
        },
        {
          id: 2,
          name: "智能物联网安防系统",
          advisor: "李四",
          type: "项目",
          dept: "信息工程",
          source: "企业合作",
          status: 1,
          intro: "本项目与企业合作，研究和开发基于物联网技术的智能安防系统，实现远程监控和预警功能。"
        },
        {
          id: 3,
          name: "区块链在金融领域的应用研究",
          advisor: "王五",
          type: "科研",
          dept: "金融工程",
          source: "校内",
          status: 0,
          intro: "本项目旨在探讨区块链技术在金融领域的应用，分析其在金融市场中的潜力与挑战。"
        },
        {
          id: 4,
          name: "基于大数据的智慧城市规划",
          advisor: "赵六",
          type: "项目",
          dept: "城市规划",
          source: "政府合作",
          status: 1,
          intro: "本项目与政府合作，利用大数据技术对城市规划进行分析和优化，提升城市可持续发展能力。"
        }
      ],
      searchData: {
        name: "",
        advisor: ""
      }
    }
  },
  methods: {
    choose() {
      ElMessageBox.confirm("确认选择该项目？", {
        confirmButtonText: "确认",
        cancelButtonText: "取消"
      })
        .then(() => {
          ElMessage({
            type: "success",
            message: "成功提交申请"
          })
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "选择失败"
          })
        })
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
