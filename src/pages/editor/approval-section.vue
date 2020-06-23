<template>
  <el-card class="box-card">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="审批结果" prop="result">
        <el-select v-model="ruleForm.result" placeholder="请选择审批结果">
          <el-option label="通过" value="HIRE"></el-option>
          <el-option label="不通过" value="REJECTION"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="审批意见" prop="suggestion">
        <el-input :rows="4" type="textarea" v-model="ruleForm.suggestion"></el-input>
      </el-form-item>
      <el-form-item class="buttonArea">
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        result:"",
        suggestion:""
      },
      rules: {
        result: [
          { required: true, message: "请选择审批结果", trigger: "change" }
        ],
        suggestion: [
          { required: true, message: "请填写意见", trigger: "blur" }
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

<style scoped>
.el-card {
  height: 100%;
}
.el-form{
    width: 80%;
    margin: auto;
}
.el-select{
    width: 100%;
}
.el-form-item{
    margin-top: 10%;
}
.buttonArea{
    text-align: center;
}
.buttonArea .el-button{
    width: 15%;
    margin: 0 10%;
}
</style>