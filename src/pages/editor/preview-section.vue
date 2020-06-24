<template>
  <div style="positioin: relative;">
    <!-- <p>预览稿件界面</p> -->
    <!-- <div c> -->
    <div id="pdf-content"></div>
    <!-- </div> -->
    <div class="btnArea">
      <!-- <el-button @click="downloadSection('假装文章有名字')">下载稿件</el-button> -->
      <el-button @click="jumpToApproval">编审稿件</el-button>
      <el-button @click="showPictures">附图预览</el-button>
      <el-image-viewer v-if="showViewer" :on-close="closeViewer" :url-list="srcList" />
      <downloadsection-dialog :sectionTitle="sectionTitle" :dialogVisible="ddialogvisible"></downloadsection-dialog>
    </div>
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
      srcList: []
    };
  },
  methods: {
    getSectionPdf() {
      this.$axios
        .get("/v1/contribution/preview.vpage?id=" + this.$route.params.id)
        .then(res => {
          this.sectionPdf = res.data.pdf;
          this.srcList = res.data.pic;
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
      if (this.srcList.length == 0) {
        this.$message({
      showClose: true,
      message: "作者未上传图片！",
      type: "warning"
    })
      }else{
        this.showViewer = true;
      }
      
    },
    closeViewer() {
      this.showViewer = false;
    },
    //跳转到编审界面
    jumpToApproval(){
       this.$router.push({
        name: "approval-section",
        params: {
          sectionId:this.$route.params.id
        }
      });  
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
.el-button{
  margin-left: 0;
  margin-top: 10px;
}
</style>