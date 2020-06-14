<template>
  <el-card>
    <el-form status-icon ref="ruleForm" label-width="100px">
      <el-row>
        <el-col :span="12" push="2">
          <el-form-item label="人员姓名">
            <el-input type="password" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="邮箱">
            <el-input type="password" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12" push="2">
          <el-form-item label="职工号">
            <el-input type="password" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="手机号">
            <el-input type="password" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12" push="2">
          <el-form-item label="电话">
            <el-input type="password" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="单位">
            <el-select v-model="value" placeholder="请选择"></el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!-- <el-row class=""> -->
      <el-button class="addUserBtn" type="primary">添加</el-button>
    <!-- </el-row> -->
  </el-card>
</template>

<script>
export default {};
</script>

<style scoped>
.el-row{
    margin: 150px;
}
.el-form-item {
  display: inline-block;
}
.el-input,
.el-select {
  width: 300px;
}
.addUserBtn{
  width: 100px;
  position: absolute;
  bottom: 90px;
  left: 50%;
}
</style>