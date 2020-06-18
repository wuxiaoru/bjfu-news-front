<template>
  <el-card>
    <el-form ref="suggestionForm" :model="suggestionForm" label-width="90px">
      <el-form-item label="审稿结果">
        <el-select v-model="suggestionForm.status" placeholder="请选择审稿结果">
          <el-option label="通过" value="AGREE"></el-option>
          <el-option label="不通过" value="REJECTION"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="审稿意见">
        <el-input type="textarea" v-model="suggestionForm.suggestion"></el-input>
      </el-form-item>
      <el-form-item label="审批稿上传">
        <el-row>
          <el-col :span="20">
            <el-input v-model="suggestionForm.docTitle" placeholder="请上传审批稿" :disabled="true"></el-input>
          </el-col>
          <el-col :span="4" style="text-align:right">
            <el-upload
              :action="fileURL"
              :show-file-list="false"
              multiple
              :on-success="pictureSuccess"
              accept=".doc, .docx"
            >
              <el-button style="height:40px" size="small" type="primary">选择本地文件</el-button>
            </el-upload>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <label>注意：只可上传word文档</label>
      </el-form-item>
      <el-form-item>
        <el-row type="flex" justify="space-around">
          <el-col :span="6">
            <el-button @click="resetForm('manuscriptForm')">取消</el-button>
          </el-col>
          <el-col :span="6">
            <el-button type="primary" @click="saveForm('manuscriptForm')">确认</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      suggestionForm: {
        status: "",
        suggestion: "",
        docTitle: "",
        docUrl: ""
      }
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    }
  }
};
</script>

<style lang="less" scoped>
.el-form {
  width: 80%;
  margin: 0 auto;
}
/deep/ .el-textarea__inner {
  line-height: 110px;
}
</style>