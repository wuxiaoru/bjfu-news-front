<template>
  <el-card class="box-card">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="活动区域" prop="region">
        <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
          <el-option label="通过" value="shanghai"></el-option>
          <el-option label="不通过" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="活动形式" prop="desc">
        <el-input :rows="4" type="textarea" v-model="ruleForm.desc"></el-input>
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
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      rules: {
        region: [
          { required: true, message: "请选择活动区域", trigger: "change" }
        ],
        desc: [{ required: true, message: "请填写活动形式", trigger: "blur" }]
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