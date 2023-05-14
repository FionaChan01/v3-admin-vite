<template>
  <editor id="editor" v-model="content" :api-key="apiKey" :init="initConfig" />
</template>

<script>
import axios from "axios"

import plugins from "./plugins"
import toolbar from "./toolbars"
import fontFormats from "./fontFormats"
import Editor from "@tinymce/tinymce-vue"
import COS from "cos-js-sdk-v5"
axios.defaults.withCredentials = true
const defaultConfig = {
  width: 1000,
  height: 600,
  menubar: true,
  language: "zh_CN"
}

const apiKey = "1kf68b8jnzsbtaxh2p1ek44moofujp4q78k51lx9x9svgq4c"

export default {
  name: "TinyMce",
  components: {
    editor: Editor
  },
  props: {
    value: {
      type: String,
      default: ""
    },
    config: {
      type: Object,
      default: () => {
        return {
          width: 1000,
          height: 600,
          menubar: true,
          language: "zh_CN"
        }
      }
    }
  },
  data() {
    return {
      token: "",
      apiKey,
      content: "",
      initConfig: {
        plugins,
        toolbar,
        width: Object.assign(defaultConfig, this.config).width,
        height: Object.assign(defaultConfig, this.config).height,
        menubar: Object.assign(defaultConfig, this.config).menubar,
        language: Object.assign(defaultConfig, this.config).language,
        font_formats: fontFormats,
        images_upload_handler: async (blobInfo, successFun) => {
          const file = blobInfo.blob()
          await this.uploadFile(file)
        },
        file_picker_types: "media",
        file_picker_callback: (callback, value, meta) => {
          if (meta.filetype === "media") {
            const input = document.createElement("input")
            input.setAttribute("type", "file")
            const that = this // 为 Vue 构造函数中的 this，指向 Vue 实例对象
            input.onchange = async function () {
              const file = this.files[0] // 为 HTMLInputElement 构造函数中的 this，指向 input 实例对象
              const isValid = await that.validateVideo(file)

              if (isValid) {
                const { url } = await that.uploadFile(file)
                callback(url)
              } else {
                callback()
              }
            }

            input.click()
          }
        },
        video_template_callback: (data) => {
          return `<video width="745" height="420" controls="controls" src=${data.source} />`
        }
      }
    }
  },
  watch: {
    value: {
      handler(newValue) {
        if (newValue !== "") {
          this.content = newValue
        }
      },
      immediate: true
    }
  },
  create() {
  },
  methods: {
    /**
     * @description 获取富文本内容（注：供父组件调用）
     * @returns {string}
     */
    getContent() {
      return this.content
    },

    /**
     * @description 校验上传视频
     * @param {File} file - 要上传的文件
     * @returns {boolean}
     */
    async validateVideo(file) {
      const isMP4 = file.type === "video/mp4"
      const isLt3M = file.size / 1024 / 1024 < 3

      if (!isMP4) {
        this.$message.error("上传视频必须为 MP4 格式！")

        return false
      }

      if (!isLt3M) {
        this.$message.error("上传视频大小限制 3M 以内！")

        return false
      }

      const duration = await this.getVideoDuration(file)
      if (duration > 60) {
        this.$message.error("上传视频时长不能超过 60 秒！")

        return false
      }

      return true
    },

    /**
     * @description 获取视频时长
     * @param {File} file - 要上传的文件
     * @returns {Promise<number>}
     */
    getVideoDuration(file) {
      return new Promise((resolve) => {
        const videoElement = document.createElement("video")
        videoElement.src = URL.createObjectURL(file)

        videoElement.addEventListener("loadedmetadata", () => {
          resolve(videoElement.duration)
        })
      })
    },
    // uploadToCOS(file, bucket, region, key) {
    //   const cos = new COS({
    //     SecretId: "AKID9B0aljaDevypTxFLEvRkW8YmpkS1PWSD",
    //     SecretKey: "dEoNMD5kEbt5FIJOP7h9TirrmaGrNivE"
    //   })
    //   return new Promise((resolve, reject) => {
    //     cos.putObject(
    //       {
    //         Bucket: bucket,
    //         Region: region,
    //         Key: key,
    //         StorageClass: "STANDARD",
    //         Body: file
    //       },
    //       function (err, data) {
    //         if (err) {
    //           reject(err)
    //         } else {
    //           resolve(data)
    //         }
    //       }
    //     )
    //   })
    // },

    /**
     * @description 上传文件
     * @param {File} file - 要上传的文件
     * @param {string} folder - 所存放的文件夹
     * @returns {Object}
     */
    async uploadFile(file) {
      const bucket = "cquinformation-1305987680"
      const region = "ap-shanghai"
      const key = "img/" + file.name

      try {
        // const result = await this.uploadToCOS(file, bucket, region, key)
        console.log("上传成功：", result)
      } catch (error) {
        console.error("上传失败：", error)
      }
    }
  }
}
</script>
