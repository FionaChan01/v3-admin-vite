<template>
  <el-container>
    <el-main>
      <el-row>
        <el-col :span="24">
          <h2>综合奖学金申请</h2>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <h3>1. 基础信息</h3>
          <div class="indent">
            <el-descriptions direction="vertical" :column="2" :size="size" border>
              <el-descriptions-item label="总绩点">3.73</el-descriptions-item>
              <el-descriptions-item label="上学期绩点">4.00</el-descriptions-item>
              <el-descriptions-item label="总排名">36</el-descriptions-item>
              <el-descriptions-item label="上学期排名">1</el-descriptions-item>
            </el-descriptions>
          </div>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <h3>2. 综合测评细则</h3>
          <div class="indent">
            <el-collapse v-model="activeNames" @change="handleChange">
              <el-collapse-item title="2022-2023春季" name="1">
                <div class="container">
                  <h1>计算机学院2019级研一上综合测评细则</h1>
                  <h2>一．德育25%</h2>
                  <h3>1. 德育基础分</h3>
                  <p>
                    校级及以上先进班集体、红旗团支部，标杆团支部立项等，德育基础分获得优秀同学的比例占班级同学数45%，良好50%，合格5%；普通班集体，德育基础分获得优秀同学的比例占班级同学数40%，良好50%，合格10%
                    优秀为56-60，良好51-55，合格为50含以下。
                  </p>
                  <h3>2. 德育奖励分（总分不得超过30分）</h3>
                  <h4>1) 活动参与加分</h4>
                  <p>注：本学期活动参与加分承认的活动有且仅有以下（需提供证明材料），1分/项，累计≤8分。</p>
                  <h4>2) 突出事迹加分</h4>
                  <ul>
                    <li>志愿时长每3小时加1分，累计不超过10分（经学校认定为准）</li>
                    <li>献血加3分</li>
                    <li>见义勇为、抢险救灾加10分，以上行为如有突出表现者，经个人申请，学院认定后可加15分。</li>
                  </ul>
                </div>
              </el-collapse-item>
            </el-collapse>
          </div>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <h3>3. 我的综合测评</h3>
          <h4>(1) 本学期自我总结</h4>
          <div class="indent">
            <el-input
              style="width: 95%"
              type="textarea"
              maxlength="500"
              v-model="selfSummary"
              placeholder="请填写本学期自我总结，建议编辑完成再复制至网页，以免丢失。"
              show-word-limit
            />
          </div>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <h4>(2) 评分明细</h4>
          <div class="indent">
            <h5>i. 德育奖励分 --> a. 活动加分（每项活动计1分，上限8分）</h5>
            <el-checkbox-group class="indent2" v-model="checkList">
              <div style="display: block">
                <el-checkbox v-model="activity1" label="重庆大学第十五届科技节" />
              </div>
              <div style="display: block">
                <el-checkbox v-model="activity2" label="2022美国大学生数学竞赛" />
              </div>
              <div style="display: block">
                <el-checkbox v-model="activity3" label="重庆大学艾滋病知识问答大赛" />
              </div>
            </el-checkbox-group>
          </div>
          <div class="indent">
            <h5>i. 德育奖励分 --> b. 突出事迹加分</h5>
            <el-form class="indent2" label-position="left" label-width="100px">
              <el-form-item label="志愿时长">
                <el-input-number v-model="moralBonusScore" :min="0" />
              </el-form-item>
            </el-form>
            <el-checkbox-group class="indent2" v-model="checkList">
              <div style="display: block">
                <el-checkbox v-model="activity4" label="献血" />
              </div>
              <div style="display: block">
                <el-checkbox v-model="activity5" label="见义勇为，抢险救灾" />
              </div>
            </el-checkbox-group>
          </div>
          <div class="indent">
            <h5>i. 德育奖励分 --> c. 荣誉加分（同一集体或个人获同一类型各级别荣誉称号按最高加分计分1次）</h5>
            <el-checkbox-group class="indent2" v-model="checkList">
              <div style="display: block">
                <el-checkbox
                  v-model="activity6"
                  label="各类先进个人、优秀共青团干、优秀共青团员、重庆市三好学生（市级6分，校级4分，院级2分，十佳个人、候选标兵5分，标兵6分) "
                />
              </div>
              <div style="display: block">
                <el-checkbox
                  v-model="activity7"
                  label="重庆大学先进班集体、重庆大学优秀团日活动（校级：班长团支书：4分，其他成员：2分；校级：班长团支书：2分，其他成员：1分）"
                />
                <!--TODO:无法勾选checkbox后显示下一个计分框-->
                <el-form v-if="activity7" class="indent3" label-position="left" label-width="70px">
                  <el-form-item label="计分">
                    <el-input-number v-model="HonorBonus1" :min="0" />
                  </el-form-item>
                </el-form>
              </div>
              <div style="display: block">
                <el-checkbox
                  v-model="activity8"
                  label="重庆大学文明寝室（寝室长2分，其他成员1分）、重庆市文明寝室（寝室长3分，其他成员1.5分）"
                />
              </div>
            </el-checkbox-group>
          </div>
          <div class="indent">
            <h5>
              i. 德育奖励分 --> d. 社会工作加分
              (学生干部兼任多个职务者，只计2项，其中最高的职务全额加分，第2项折半加分，其余职务不予加分)
            </h5>
            <el-checkbox-group max="2" class="indent2" v-model="checkList">
              <div style="display: block">
                <el-checkbox v-model="social1" label="校、院学生会主席团成员（5）" />
              </div>
              <div style="display: block">
                <el-checkbox v-model="social2" label="校、院学生会部长（4）" />
              </div>
              <div style="display: block">
                <el-checkbox v-model="social3" label="辅导员助理（4） " />
              </div>
              <div style="display: block">
                <el-checkbox v-model="social4" label="校、院团委学生会副部长/各协会会长及副会长/班长/团支书（3）  " />
              </div>
              <div style="display: block">
                <el-checkbox v-model="social5" label="学生会干事/协会部长/普通班委（1）" />
              </div>
            </el-checkbox-group>
          </div>
          <div class="indent">
            <h5>ii. 德育扣分</h5>
          </div>
          <!--TODO:接下来的综合测评没写完，且细则写完需要上传证明材料的按钮-->
        </el-col>
      </el-row>
    </el-main></el-container
  >
</template>

<script>
export default {
  data() {
    return {
      size: "small",
      activeNames: ["1"],
      selfSummary: "",
      checkList: [],
      activity1: false,
      activity2: false,
      activity3: false,
      activity4: false,
      activity5: false,
      activity6: false,
      activity7: false,
      activity8: false,
      intellectualScore: 0,
      moralBaseScore: 0,
      moralBonusScore: 0,
      moralDeductionScore: 0,
      honorScore: 0,
      researchCompetitionScore: 0,
      checkListHonor: [],
      showInput: [false, false, false],
      score1: 0,
      score2: 0,
      score3: 0,
      HonorBonus1: 0,
      social1: false,
      social2: false,
      social3: false,
      social4: false,
      social5: false
    }
  },
  methods: {
    toggleInput(index) {
      this.$set(this.showInput, index, !this.showInput[index])
    },
    handleChange(val) {
      console.log(val)
    }
  }
}
</script>

<style>
.indent {
  padding-left: 20px !important;
}
.indent2 {
  padding-left: 40px !important;
}
.indent3 {
  padding-left: 60px !important;
}
</style>
