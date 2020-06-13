<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>投稿人信息完善</span>
    </div>
    <el-form label-width="80px" :model="formLabelAlign">
      <el-row>
        <el-col :span="12">
          <el-form-item label="姓名">
            <el-input v-model="formLabelAlign.name" placeholder="请输入姓名"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="邮箱">
            <el-input v-model="formLabelAlign.email" placeholder="请输入邮箱"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="工号">
            <el-input v-model="formLabelAlign.id" placeholder="请输入工号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="手机号">
            <el-input v-model="formLabelAlign.phone" placeholder="请输入手机号"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="办公电话">
            <el-input v-model="formLabelAlign.tel" placeholder="请输入办公电话"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="单位">
            <el-select v-model="formLabelAlign.department" placeholder="请选择单位" style="width: 100%">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <el-row style="text-align: center; margin-top: 20px">
      <el-button type="primary" style="padding: 10px 36px">添加</el-button>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      // form表单绑定的数据
      formLabelAlign: {
        name: "",
        email: "",
        id: "",
        phone: "",
        tel: "",
        department: ""
      }
    };
  },
  methods: {
    // 点击返回按钮的时候跳转上一个界面
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="less" scoped>
.box-card {
  width: 960px;
  margin: 100px auto;
}
</style>