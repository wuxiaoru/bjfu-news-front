<template>
  <div style="positioin: relative;">
    <!-- <p>预览稿件界面</p> -->
    <!-- <div c> -->
    <div id="pdf-content"></div>
    <!-- </div> -->
    <!-- <div class="btnArea">
      <el-button @click="downloadSection('假装文章有名字')">下载稿件</el-button>
      <el-button>编审稿件</el-button>
      <el-button @click="showPictures">附图预览</el-button>
      <el-image-viewer v-if="showViewer" :on-close="closeViewer" :url-list="srcList" />
      <downloadsection-dialog :sectionTitle="sectionTitle" :dialogVisible="ddialogvisible"></downloadsection-dialog>
    </div> -->
  </div>
</template>
    <script>
</script>
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
      sectionPdf: "",
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
    getSectionPdf() {
      this.$axios
        .get("/contribution/preview.vpage?id=" + this.$route.params.id)
        .then(res => {
          this.sectionPdf = res.data.pdf;
          this.$nextTick(function() {
            this.$pdf.embed(`${this.sectionPdf}`, "#pdf-content");
          });
        });
    },
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
  },
  mounted() {
    this.getSectionPdf();
  }
};
</script>

<style scoped>
#pdf-content {
  margin: 0 auto;
  width: 60%;
  height: 85%;
  position: absolute;
  top: 50%;
  left: 55%;
  transform: translate(-50%, -50%);
}
.btnArea{
  float: right;
  margin-right: 30px;
  width: 100px;
}
</style>