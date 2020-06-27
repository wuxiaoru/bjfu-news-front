<template>
  <el-card>
    <el-form :model="addForm" ref="addForm" :rules="rules" label-width="80px" class="addFrom">
      <el-form-item label="人员名称" prop="userName">
        <el-input v-model="addForm.userName" placeholder="请输入人员名称"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="mail">
        <el-input v-model="addForm.mail" placeholder="请输入邮箱"></el-input>
      </el-form-item>
      <el-form-item label="职工号" prop="eno">
        <el-input v-model="addForm.eno" placeholder="请输入职工号"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="officePhone">
        <el-input v-model="addForm.officePhone" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item label="办公电话" prop="mobile">
        <el-input v-model="addForm.mobile" placeholder="请输入办公电话"></el-input>
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
      <el-form-item label="职务" prop="job">
        <el-select v-model="addForm.job" filterable placeholder="请选择职务" style="width: 100%">
          <el-option
            v-for="(item, index) in jobList"
            :key="index"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
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
      // 职务列表
      jobList: [
        {
          value: "教授",
          label: "教授"
        },
        {
          value: "讲师",
          label: "讲师"
        },
        {
          value: "导员",
          label: "导员"
        },
        {
          value: "职员",
          label: "职员"
        }
      ],
      rules: {
        userName: [
          { required: true, message: "请输入人员名称", trigger: "blur" }
        ],
        mail: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
        eno: [{ required: true, message: "请输入职工号", trigger: "blur" }],
        officePhone: [
          { required: true, message: "请输入手机号", trigger: "blur" }
        ],
        mobile: [
          { required: true, message: "请输入办公电话", trigger: "blur" }
        ],
        unit: [{ required: true, message: "请选择单位", trigger: "change" }],
        job: [{ required: true, message: "请选择职务", trigger: "change" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 验证通过 发起添加用户的请求
          this.$axios.post("/v1/user/info/create.vpage");
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.$router.go(-1);
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