<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>个人信息</span>
      <el-button style="float: right; padding: 3px 0" type="text" @click="goBack">返回</el-button>
    </div>
    <el-form label-width="80px" :model="formLabelAlign" ref="formLabelAlign">
      <el-form-item label="工号">
        <el-input v-model="formLabelAlign.eno" disabled></el-input>
      </el-form-item>
      <el-form-item label="用户姓名">
        <el-input v-model="formLabelAlign.userName" disabled></el-input>
      </el-form-item>
      <!-- 单位下拉框 带筛选 -->
      <el-form-item label="单位">
        <el-input v-model="formLabelAlign.unit" ></el-input>
      </el-form-item>
      <el-form-item label="用户职务">
        <el-input v-model="formLabelAlign.job"></el-input>
      </el-form-item>
        <el-form-item label="邮箱">
        <el-input v-model="formLabelAlign.mail"></el-input>
      </el-form-item>
        <el-form-item label="手机号">
        <el-input v-model="formLabelAlign.mobile"></el-input>
      </el-form-item>
        <el-form-item label="办公电话">
        <el-input v-model="formLabelAlign.officePhone"></el-input>
      </el-form-item>
       <el-form-item>
        <el-button type="primary" @click="save('formLabelAlign')"
          >保存</el-button>
      </el-form-item>
    </el-form>
 
    <!-- <el-button style="float:right" type="primary">保存</el-button> -->
  </el-card>
</template>

<script>
import global_ from '../../utils/constant'
export default {
  data() {
    // 自定义的邮箱校验规则
    var checkEmail = (rule, value, callback) => {
      if (value == "") {
        callback();
        return;
      }
      const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
      setTimeout(() => {
        if (mailReg.test(value)) {
          callback();
        } else {
          callback(new Error("请输入正确的邮箱格式"));
        }
      }, 100);
    };
    // 自定义 手机号校验规则
    var checkPhone = (rule, value, callback) => {
      if (value == "") {
        callback();
        return;
      }
      const phoneReg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
      setTimeout(() => {
        if (phoneReg.test(value)) {
          callback();
        } else {
          callback(new Error("请输入正确的手机号"));
        }
      }, 100);
    };
    // 自定义办公电话校验规则
    var checkTel = (rule, value, callback) => {
      if (value == "") {
        callback();
        return;
      }
      const telReg = /^((0\d{2,3})-)?(\d{7,8})(-(\d{3,}))?$/;
      setTimeout(() => {
        if (telReg.test(value)) {
          callback();
        } else {
          callback(new Error("请输入正确的电话号"));
        }
      }, 100);
    };
    return {
      // form表单绑定的数据
      formLabelAlign: {
        eno: "",
        userName: "",
        department: "",
        job: "",
        unit: "",
        officePhone:"",
        mobile:"",
        mail:""
      },
      rules: {
        mail: [{ validator: checkEmail, trigger: "blur" }],
        mobile: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { validator: checkPhone, trigger: "blur" },
        ],
        officePhone: [
          { required: true, message: "请输入办公电话", trigger: "blur" },
          { validator: checkTel, trigger: "blur" },
        ],
        // 单位
        unit: [{ required: true, message: "请选择单位", trigger: "change" }],
        // 人员名称
        userName: [
          { required: true, message: "请输入人员名称", trigger: "blur" },
        ],
        job: [{ required: true, message: "请输入职务", trigger: "blur" }],
      },
      // 单位列表
      unitList:global_.unit
    };
  },
  methods: {
    // 点击返回按钮的时候跳转上一个界面
    goBack() {
      this.$router.go(-1);
    },
    // 提交表单
    save(formLabelAlign) {
      this.$refs["formLabelAlign"].validate((valid) => {
        if (valid) {
          // 验证通过 发起添加用户的请求
          this.$axios
            .post("/v1/user/info/eno/edit.vpage", this.formLabelAlign)
            .then((res) => {
              if (res.success == true) {
                // 添加成功，回到列表界面
                localStorage.setItem("UserJob", this.formLabelAlign.job);
                localStorage.setItem("UserUnit", this.formLabelAlign.unit);
                localStorage.setItem("UserMail",this.formLabelAlign.mail);
                localStorage.setItem("UserMobile",this.formLabelAlign.mobile);
                localStorage.setItem("UserOfficePhone",this.formLabelAlign.officePhone);
                this.$router.push("/home-main");
              }else{
                this.$message.error("保存失败");
              }
            });
        } else {
          return false;
        }
      });
    }
  },
  created() {
    this.formLabelAlign.unit = localStorage.getItem("UserUnit");
    this.formLabelAlign.eno = localStorage.getItem("UserEno");
    this.formLabelAlign.userName = localStorage.getItem("UserName");
    this.formLabelAlign.job =
      localStorage.getItem("UserJob") == "null"
        ? ""
        : localStorage.getItem("UserJob");
    this.formLabelAlign.mail = localStorage.getItem("UserMail") == "null" ? "" :localStorage.getItem("UserMail");
    this.formLabelAlign.mobile = localStorage.getItem("UserMobile") == "null" ? "" :localStorage.getItem("UserMobile");
    this.formLabelAlign.officePhone = localStorage.getItem("UserOfficePhone") == "null" ? "" :localStorage.getItem("UserOfficePhone");
  }
};
</script>

<style lang="less" scoped>
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 480px;
  margin: 100px auto;
  // padding-bottom: 20px;
}
</style>