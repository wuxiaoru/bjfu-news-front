<template>
  <div>
    <el-row :gutter="20">
      <!-- pdf预览 -->
      <el-col :span="21">
        <pdf :src="pdfUrl" class="pdfPreview"></pdf>
      </el-col>
      <!-- 右侧按钮区 -->
      <el-col :span="3">
        <el-row>
          <el-button type="primary" v-if="showApprove" @click="approveNews">审批稿件</el-button>
        </el-row>
        <el-row>
          <el-button type="primary" v-if="showAppend" @click="approveNews">追加意见</el-button>
        </el-row>
        <el-row>
          <el-button type="primary" @click="downloadSection">下载稿件</el-button>
        </el-row>
        <el-row>
          <el-button type="primary" @click="showPictures">预览附图</el-button>
        </el-row>
      </el-col>
    </el-row>
    <!-- 图片预览区 -->
    <el-image-viewer v-if="showViewer" :on-close="closeViewer" :url-list="srcList" />
    <!-- 点击按钮弹出的对话框 -->
    <common-dialog
      :dialogTitle="dialogTitle"
      :dialogVisible="dialogVisible"
      :approvalForm="approvalForm"
      @cancel="cancel"
      @ok="ok"
      @pushId="getId"
    ></common-dialog>
  </div>
</template>

<script>
// 导入组件
import ElImageViewer from "element-ui/packages/image/src/image-viewer";
import commonDialog from "../../components/dialog/common-dialog";
import pdf from "vue-pdf";
export default {
  components: {
    pdf,
    ElImageViewer,
    commonDialog
  },
  data() {
    return {
      // pdf预览地址
      pdfUrl: "",
      // 图片预览地址
      srcList: [],
      // 显示查看器
      showViewer: false,
      // 需要下载的文章标题
      sectionTitle: "",
      // 下载提示框是否显示
      // dialogvisible: false,
      // 控制审批稿件按钮是否显示
      showApprove: true,
      // 控制追加按钮是否显示
      showAppend: false,
      // 稿件名称
      title: "",
      // 稿件id
      id: "",
      // 对话框标题
      dialogTitle: "",
      // 控制 对话框 是否显示
      dialogVisible: false,
      // 对话框显示内容
      approvalForm: []
    };
  },
  methods: {
    // 发起预览稿件的请求
    previewNews(id) {
      this.$axios.get("/v1/contribution/preview.vpage?id=" + id).then(res => {
        if (res.success == true) {
          this.pdfUrl = res.data.pdf;
          this.srcList = res.data.pic;
        }
        console.log(this.pdfUrl);
      });
    },
    // 审批稿件按钮
    approveNews() {
      this.$router.push("/approve-suggestion/" + this.id);
    },
    //下载稿件按钮
    downloadSection() {
      // 需要下载的文章标题
      this.dialogTitle = "稿件下载确认";
      //下载提示框是否显示
      this.dialogVisible = true;
      this.approvalForm.push({
        type: "input",
        label: "稿件名称",
        title: this.title
      });
    },
    // 显示图片预览
    showPictures() {
      this.showViewer = true;
    },
    // 关闭图片预览
    closeViewer() {
      this.showViewer = false;
    },
    cancel() {
      this.dialogVisible = false;
      console.log("用户点击了退出");
    },
    ok() {
      // 用户点击了确认，需要下载稿件
      this.$axios.post("/v1/contribution/download.vpage?id=236").then(res => {
        // if (res.success == true) {
        // 稿件撤回成功，重新调用获取稿件列表的接口
        // this.queryList();
        // } else {
        //   this.$message.error("撤回稿件失败，请稍后再试");
        // }
      });
      console.log("用户点击了OK");
    },
    getId() {
      console.log("我要获取id了");
    }
  },
  created() {
    // 从缓存中获取稿件id 状态（是审批稿件还是追加意见） 稿件名称
    this.id = localStorage.getItem("newsId");
    var state = localStorage.getItem("state");
    this.title = localStorage.getItem("title");
    this.previewNews(this.id);
    if (state == "append") {
      this.showApprove = false;
      this.showAppend = true;
    }
  }
};
</script>

<style lang="less" scoped>
.el-button {
  margin-bottom: 20px;
}
</style>