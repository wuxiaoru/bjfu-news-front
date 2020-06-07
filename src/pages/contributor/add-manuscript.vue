<template>
  <div>
    <el-card>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
        <!-- 稿件题目 -->
        <el-form-item label="稿件题目" prop="title">
          <el-input v-model="ruleForm.title" placeholder="请输入文章标题"></el-input>
        </el-form-item>
        <!-- 稿件作者 -->
        <el-form-item label="稿件作者" prop="manuscript-author">
          <el-input v-model="ruleForm.manuscriptAuthor" placeholder="请输入文章作者"></el-input>
        </el-form-item>
        <!-- 稿件上传 -->
        <el-form-item label="稿件上传" required>
          <div class="upload">
            <label for="myFile">
              <el-button>123</el-button>
            </label>
            <input type="file" capture="camera" id="myFile" />
          </div>
        </el-form-item>
        <!-- 图片上传 -->
        <el-form-item label="图片上传" prop="picture"></el-form-item>
        <!-- 图片作者 -->
        <el-form-item label="图片作者" prop="picture-author">
          <el-input v-model="ruleForm.pictureAuthor" placeholder="请输入图片作者"></el-input>
        </el-form-item>
        <!-- 备注 -->
        <el-form-item label="备注" prop="more">
          <el-input type="textarea" v-model="ruleForm.more"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        title: "",
        "manuscript-author": "",
        date1: "",
        date2: "",
        "picture-author": false,
        more: ""
      },
      rules: {
        title: [{ required: true, message: "请输入稿件题目", trigger: "blur" }],
        "manuscript-author": [
          { required: true, message: "请输入文章作者", trigger: "blur" }
        ],
        date1: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style>
.upload > input {
  display: none;
}
</style>