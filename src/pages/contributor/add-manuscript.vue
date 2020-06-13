<template>
  <div>
    <el-card>
      <el-form :model="manuscriptForm" :rules="rules" ref="manuscriptForm" label-width="100px">
        <!-- 稿件题目 -->
        <el-form-item label="稿件题目" prop="title">
          <el-input v-model="manuscriptForm.title" placeholder="请输入文章标题"></el-input>
        </el-form-item>
        <!-- 稿件作者 -->
        <el-form-item label="稿件作者" prop="docAuthor">
          <el-input v-model="manuscriptForm.docAuthor" placeholder="请输入文章作者"></el-input>
        </el-form-item>
        <!-- 稿件上传 -->
        <el-form-item label="稿件上传" prop="docUrl">
          <el-row>
            <el-col :span="20">
              <el-input v-model="manuscriptForm.docUrl" placeholder="请上传文章" :disabled="true"></el-input>
            </el-col>
            <el-col :span="4" style="text-align:right">
              <el-upload
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
              >
                <el-button style="height:40px" size="small" type="primary" @click="upload">选择本地文件</el-button>
              </el-upload>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <label>注意：只可上传word文档</label>
        </el-form-item>
        <!-- 图片上传 -->
        <el-form-item label="图片上传">
          <el-row>
            <el-col :span="20">
              <el-input v-model="manuscriptForm.picUrl" placeholder="请上传图片" :disabled="true"></el-input>
            </el-col>
            <el-col :span="4" style="text-align:right">
              <el-upload
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
              >
                <el-button style="height:40px" size="small" type="primary">选择本地文件</el-button>
              </el-upload>
            </el-col>
          </el-row>
        </el-form-item>
        <!-- 图片作者 -->
        <el-form-item label="图片作者">
          <el-input v-model="manuscriptForm.picAuthor" placeholder="请输入图片作者"></el-input>
        </el-form-item>
        <!-- 备注 -->
        <el-form-item label="备注">
          <el-input type="textarea" v-model="manuscriptForm.note"></el-input>
        </el-form-item>
        <el-form-item>
          <el-row type="flex" justify="space-around">
            <el-col :span="6">
              <el-button @click="resetForm('manuscriptForm')">取消</el-button>
            </el-col>
            <el-col :span="6">
              <el-button type="primary" @click="saveForm('manuscriptForm')">存为草稿</el-button>
            </el-col>
            <el-col :span="6">
              <el-button type="success" @click="submitForm('manuscriptForm')">提交稿件</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <!-- 点击按钮弹出的对话框 -->
      <common-dialog
        :dialogTitle="dialogTitle"
        :dialogVisible="dialogVisible"
        :approvalForm="approvalForm"
        @cancel="cancel"
        @ok="ok"
        @pushId="getId"
      ></common-dialog>
    </el-card>
  </div>
</template>

<script>
import commonDialog from "../../components/dialog/common-dialog";
export default {
  data() {
    return {
      manuscriptForm: {
        // 稿件题目
        title: "",
        // 稿件作者
        docAuthor: "",
        // 稿件地址
        docUrl: "d://file/dsf.doc",
        // 图片作者
        picAuthor: "",
        // 图片地址
        picUrl: "",
        // 备注
        note: "",
        // 投稿人id
        userId: 1,
        // 审稿人id
        approveId: 1
      },
      rules: {
        title: [{ required: true, message: "请输入稿件题目", trigger: "blur" }],
        docAuthor: [
          { required: true, message: "请输入文章作者", trigger: "blur" }
        ],
        docUrl: [{ required: true, message: "请上传稿件", trigger: "blur" }]
      },
      // 对话框标题
      dialogTitle: "",
      // 控制 对话框 是否显示
      dialogVisible: false,
      // 对话框显示内容
      approvalForm: [],
      // 审批人列表
      approvalList: []
    };
  },
  components: {
    commonDialog
  },
  methods: {
    // 上传文件
    upload() {
      console.log("我要上传文件");

      // this.$axios.post(process.env.VUE_APP_Contribution + "/upload.vpage")
    },
    // 新建文章点击提交稿件时 先判断验证是否通过 然后弹出对话框 选择审批人
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 获取所有的审批人列表
          this.getApproveList();
          // 弹出的对话框的标题
          this.dialogTitle = "选择审批人";
          // 让对话框显示
          this.dialogVisible = true;
          // 如果对话框里面有内容，先清空
          if (this.approvalForm.length != 0) {
            this.approvalForm.splice(0, this.approvalForm.length);
          }
          this.approvalForm.push(
            {
              type: "input",
              label: "稿件题目",
              title: this.manuscriptForm.title
            },
            {
              type: "select",
              label: "选择审稿人",
              approval: "",
              option:
                // this.approvalList
                [{ name: "测试hhh", id: "9" }]
            }
          );
        } else {
          return false;
        }
      });
    },
    // 获取审批人列表
    getApproveList() {
      this.$axios
        .post(process.env.VUE_APP_Contribution + "/approver/list.vpage")
        .then(res => {
          this.approvalList = res.data;
        });
    },
    // 存为草稿
    saveForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 表单验证通过 发起存为草稿的请求
          this.$axios
            .post(
              process.env.VUE_APP_Contribution + "/draft.vpage",
              this.manuscriptForm
            )
            .then(res => {
              if (res.success == true) {
                // 稿件保存成功，跳转回稿件列表界面
                this.$router.push("/news-list");
              } else {
                this.$message.error("保存失败，请稍后再试");
              }
            });
        }
      });
    },
    // 点击取消时 清空表单数据 跳转回稿件列表界面
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.$router.push("/news-list");
    },
    // 对话框点击取消按钮时
    cancel() {
      this.dialogVisible = false;
      console.log(this.dialogVisible);
    },
    // 对话框点击确认按钮时
    ok() {
      // 对话框消失 发送提交稿件的请求
      this.dialogVisible = false;
      console.log(this.manuscriptForm);
      this.$axios
        .post(
          process.env.VUE_APP_Contribution + "/submit.vpage",
          this.manuscriptForm
        )
        .then(res => {
          if (res.success == true) {
            // 新建稿件成功，跳转回稿件列表界面
            this.$router.push("/news-list");
          } else {
            this.$message.error("提交失败，请稍后再试");
          }
        });
    },
    // 获取选择审批人
    getId(id) {
      this.manuscriptForm.approveId = id;
      console.log(id);
    }
  },
  created() {
    console.log(this.$route.params.id);
  }
};
</script>

<style lang="less" scoped>
.el-form {
  width: 80%;
  margin: 0 auto;
}
/deep/ .el-form-item__content {
  line-height: 20px;
}
</style>