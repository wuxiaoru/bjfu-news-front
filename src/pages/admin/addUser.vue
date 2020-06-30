<template>
  <el-card>
    <el-form :model="addForm" ref="addForm" :rules="rules" label-width="80px" class="addFrom">
      <!-- 职工号只允许输入数字 -->
      <el-form-item label="职工号" prop="eno">
        <el-input
          v-model="addForm.eno"
          placeholder="请输入职工号"
          pattern="[0-9]*"
          oninput="value=value.replace(/[^\d]/g,'')"
          show-word-limit
          maxlength="10"
        ></el-input>
      </el-form-item>
      <!-- 对人员名称进行了校验 -->
      <el-form-item label="人员名称" prop="userName">
        <el-input
          v-model="addForm.userName"
          placeholder="请输入人员名称"
          show-word-limit
          maxlength="10"
          @input="nameCheck"
        ></el-input>
      </el-form-item>
      <!-- 单位下拉框 带筛选 -->
      <el-form-item label="单位" prop="unit">
        <el-select v-model="addForm.unit" filterable placeholder="请选择单位" style="width: 100%">
          <el-option
            v-for="(item, index) in unitList"
            :key="index"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <!-- 邮箱的校验规则 自定义 -->
      <el-form-item label="邮箱" prop="mail">
        <el-input v-model="addForm.mail" placeholder="请输入邮箱"></el-input>
      </el-form-item>
      <!-- 手机号的校验规则 自定义 -->
      <el-form-item label="手机号" prop="mobile">
        <el-input type="tel" maxlength="11" v-model="addForm.mobile" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <!-- 办公电话的校验规则 自定义 -->
      <el-form-item label="办公电话" prop="officePhone">
        <el-input v-model="addForm.officePhone" placeholder="请输入办公电话"></el-input>
      </el-form-item>
      <el-form-item label="职务">
        <el-input v-model="addForm.job" placeholder="请输入职务" show-word-limit maxlength="10"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('addForm')">立即添加</el-button>
        <el-button @click="resetForm('addForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
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
      addForm: {
        // 人员名称
        userName: "",
        // 邮箱
        mail: "",
        // 职工号
        eno: "",
        // 手机号
        officePhone: "",
        // 办公电话
        mobile: "",
        // 单位
        unit: "",
        // 职务
        job: "",
        // 角色类型
        roleType: ""
      },
      // 单位列表
      unitList: [
        {
          value: "林学院",
          label: "林学院"
        },
        {
          value: "水土保持学院",
          label: "水土保持学院"
        },
        {
          value: "生物科学与技术学院",
          label: "生物科学与技术学院"
        },
        {
          value: "园林学院",
          label: "园林学院"
        },
        {
          value: "经济管理学院",
          label: "经济管理学院"
        },
        {
          value: "工学院",
          label: "工学院"
        },
        {
          value: "材料科学与技术学院",
          label: "材料科学与技术学院"
        },
        {
          value: "人文社会科学学院",
          label: "人文社会科学学院"
        },
        {
          value: "外语学院",
          label: "外语学院"
        },
        {
          value: "信息学院",
          label: "信息学院"
        },
        {
          value: "理学院",
          label: "理学院"
        },
        {
          value: "生态与自然保护学院",
          label: "生态与自然保护学院"
        },
        {
          value: "环境科学与工程学院",
          label: "环境科学与工程学院"
        },
        {
          value: "艺术设计学院",
          label: "艺术设计学院"
        },
        {
          value: "马克思主义学院",
          label: "马克思主义学院"
        },
        {
          value: "草业与草原学院",
          label: "草业与草原学院"
        },
        {
          value: "继续教育学院",
          label: "继续教育学院"
        },
        {
          value: "国际学院",
          label: "国际学院"
        },
        {
          value: "体育教学部",
          label: "体育教学部"
        }
      ],
      rules: {
        // 人员名称
        userName: [
          { required: true, message: "请输入人员名称", trigger: "blur" }
        ],
        // 职工号
        eno: [{ required: true, message: "请输入职工号", trigger: "blur" }],
        // 单位
        unit: [{ required: true, message: "请选择单位", trigger: "change" }],
        mail: [{ validator: checkEmail, trigger: "blur" }],
        mobile: [{ validator: checkPhone, trigger: "blur" }],
        officePhone: [{ validator: checkTel, trigger: "blur" }]
      }
    };
  },
  methods: {
    // 作者姓名检测 只能输入英文 汉字和·
    nameCheck() {
      this.addForm.userName = this.addForm.userName.replace(
        /[^a-zA-Z\u4E00-\u9FA5\·]/g,
        ""
      );
    },
    // 提交表单
    submitForm(addForm) {
      this.$refs["addForm"].validate(valid => {
        if (valid) {
          // 验证通过 发起添加用户的请求
          this.$axios
            .post("/v1/user/info/create.vpage", this.addForm)
            .then(res => {
              if (res.success == true) {
                // 添加成功，回到列表界面
                this.$router.push(
                  "/user-list/" + this.addForm.roleType.toLowerCase()
                );
              }
            });
        } else {
          return false;
        }
      });
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  created() {
    if (this.$route.params.userType == "approver") {
      this.addForm.roleType = "APPROVER";
    } else if (this.$route.params.userType == "editor") {
      this.addForm.roleType = "EDITOR";
    }
  }
};
</script>

<style lang="less" scoped>
.addFrom {
  margin: 0 auto;
  width: 50%;
}
</style>