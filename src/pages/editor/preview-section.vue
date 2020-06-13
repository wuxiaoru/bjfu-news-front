<template>
  <div>
    <p>预览稿件界面</p>
    <el-button @click="downloadSection('假装文章有名字')">下载稿件</el-button>
    <el-button>编审稿件</el-button>
    <el-button>附图预览</el-button>
    <downloadsection-dialog :sectionTitle="sectionTitle" :dialogVisible="ddialogvisible"></downloadsection-dialog>
  </div>
</template>

<script>
import downloadsectionDialog from "../../components/dialog/downloadsection-dialog.vue";
export default {
  components: {
    downloadsectionDialog
  },
  data() {
    return {
      // 需要下载的文章标题
      sectionTitle: "",
      //下载提示框是否显示
      ddialogvisible: false
    };
  },
  methods: {
    //下载稿件按钮
    downloadSection(sectionInfo) {
      // 需要下载的文章标题
      this.sectionTitle = sectionInfo;
      //下载提示框是否显示
      this.ddialogvisible = true;
    }
  }
};
</script>

<style>
</style>