<template>
  <div>
    <p>预览稿件界面</p>
    <el-button @click="downloadSection('假装文章有名字')">下载稿件</el-button>
    <el-button>编审稿件</el-button>
    <el-button @click="showPictures">附图预览</el-button>
    <el-image-viewer v-if="showViewer" :on-close="closeViewer" :url-list="srcList" />
    <downloadsection-dialog :sectionTitle="sectionTitle" :dialogVisible="ddialogvisible"></downloadsection-dialog>
  </div>
</template>

<script>
import downloadsectionDialog from "../../components/dialog/downloadsection-dialog.vue";
// 导入组件
import ElImageViewer from "element-ui/packages/image/src/image-viewer";
export default {
  components: {
    downloadsectionDialog,
    ElImageViewer
  },
  data() {
    return {
      showViewer: false, // 显示查看器
      // 需要下载的文章标题
      sectionTitle: "",
      //下载提示框是否显示
      ddialogvisible: false,
      srcList: [
        "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg",
        "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg"
      ]
    };
  },
  methods: {
    //下载稿件按钮
    downloadSection(sectionInfo) {
      // 需要下载的文章标题
      this.sectionTitle = sectionInfo;
      //下载提示框是否显示
      this.ddialogvisible = true;
    },
    showPictures() {
      this.showViewer = true;
    },
    closeViewer() {
      this.showViewer = false;
    }
  }
};
</script>

<style scoped>
</style>