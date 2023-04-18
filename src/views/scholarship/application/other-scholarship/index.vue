<template>
  <el-container>
    <el-main>
      <el-row>
        <el-col :span="24">
          <h2>其他奖学金申请</h2>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <h3>1. 奖学金类别</h3>
          <div class="indent">
            <div v-for="(scholarship, index) in scholarships" :key="index" style="display: block">
              <el-checkbox :label="scholarship.scholarship" v-model="scholarship.checked" />
              <el-form v-show="scholarship.checked" class="indent3" label-position="left" label-width="70px">
                <el-form-item label="计分">
                  <el-input-number v-model="scholarship.score" :min="0" />
                </el-form-item>
              </el-form>
            </div>
          </div>
        </el-col>
      </el-row>
      <h3>2. 上传申请材料及附件</h3>
      <el-row>
        <div class="indent">
          <el-upload
            class="upload-demo"
            style="width: 100%"
            drag
            action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
            multiple
          >
            <el-icon class="el-icon--upload"><upload-filled /></el-icon>
            <div class="el-upload__text">Drop file here or <em>click to upload</em></div>
            <template #tip>
              <div class="el-upload__tip">jpg/png files with a size less than 500kb</div>
            </template>
          </el-upload>
        </div>
      </el-row>
      <br />
      <el-row>
        <el-button type="primary">
          提交申请<el-icon class="el-icon--right"><Upload /></el-icon>
        </el-button>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
import { UploadFilled } from "@element-plus/icons-vue"
export default {
  data() {
    return {
      scholarships: [
        { scholarship: "南京科远校友奖学金", checked: false, score: 0 },
        { scholarship: "唐立新奖学金", checked: false, score: 0 },
        { scholarship: "‘关工委’德育奖学金", checked: false, score: 0 },
        { scholarship: "长江电力奖学金", checked: false, score: 0 }
      ],
      selectedScholarships: [],
      checked: []
    }
  },
  methods: {
    updateSelectedScholarships(value, scholarship) {
      if (value) {
        this.selectedScholarships.push(scholarship)
      } else {
        const index = this.selectedScholarships.indexOf(scholarship)
        if (index !== -1) {
          this.selectedScholarships.splice(index, 1)
        }
      }
    }
  }
}
</script>
