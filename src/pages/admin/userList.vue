<template>
  <div>
    <el-card>
      <!-- 搜索区域 -->
      <el-form :model="searchForm" label-width="80px">
        <!-- 第一行的搜索条件 -->
        <el-row :gutter="10">
          <el-col :span="8">
            <el-form-item label="工号" prop="eno">
              <el-input v-model="searchForm.eno" placeholder="请输入工号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="姓名" prop="userName">
              <el-input v-model="searchForm.userName" placeholder="请输入姓名"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 第二行的搜索条件 -->
        <el-row :gutter="10">
          <el-col :span="8">
            <el-form-item label="单位" prop="unit">
              <el-select
                filterable
                v-model="searchForm.unit"
                placeholder="请选择单位"
                style="width:100%"
              >
                <el-option
                  v-for="(item, index) in unitList"
                  :key="index"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="16" style="text-align: center; padding-left: 30%">
            <el-button type="info" @click="clear">清空</el-button>
            <el-button type="primary" @click="queryList">搜索</el-button>
          </el-col>
        </el-row>
      </el-form>
      <!-- 分割线 -->
      <el-divider></el-divider>
      <!-- 按钮，添加一个父级元素 为了清除浮动 -->
      <div class="clearfix">
        <el-button type="primary" style="float: right" @click="addPerson">添加</el-button>
      </div>
      <!-- 列表区域 -->
      <common-table :tableData="tableData" :tableOption.sync="tableOption" :isOperate="isOperate">
        <!-- 操作列，填充operate的插槽 -->
        <template slot="operate" slot-scope="scope">
          <el-button type="danger" size="mini" @click="deletePerson(scope.row)">删除</el-button>
          <el-button type="primary" size="mini" @click="editPerson(scope.row)">编辑</el-button>
        </template>
      </common-table>
      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[5, 10, 20, 50]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
      <!-- 点击按钮弹出的对话框 -->
      <common-dialog
        :dialogTitle="dialogTitle"
        :dialogVisible="dialogVisible"
        :approvalForm="approvalForm"
        @cancel="cancel"
        @ok="ok"
      ></common-dialog>
      <!-- 嵌套表单的对话框 -->
      <el-dialog title="编辑用户信息" :visible.sync="dialogFormVisible" width="30%">
        <el-form :model="editForm" ref="editForm" :rules="rules" label-width="80px" class="addFrom">
          <el-form-item label="职工号" prop="eno">
            <el-input v-model="editForm.eno" placeholder="请输入职工号"></el-input>
          </el-form-item>
          <el-form-item label="人员名称" prop="userName">
            <el-input v-model="editForm.userName" placeholder="请输入人员名称"></el-input>
          </el-form-item>
          <!-- 单位下拉框 带筛选 -->
          <el-form-item label="单位" prop="unit">
            <el-select v-model="editForm.unit" filterable placeholder="请选择单位" style="width: 100%">
              <el-option
                v-for="(item, index) in unitList"
                :key="index"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="editForm.mail" placeholder="请输入邮箱"></el-input>
          </el-form-item>
          <el-form-item label="手机号">
            <el-input maxlength="11" v-model="editForm.mobile" placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item label="办公电话">
            <el-input v-model="editForm.officePhone" placeholder="请输入办公电话"></el-input>
          </el-form-item>
          <el-form-item label="职务">
            <el-input v-model="editForm.job" placeholder="请输入职务"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submit('editForm')">确 定</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import commonTable from "../../components/table/common-table";
import commonDialog from "../../components/dialog/common-dialog";
export default {
  data() {
    var checkPhone = (rule, value, callback) => {
      const phoneReg = /^1[3|4|5|7|8][0-9]{9}$/;
      setTimeout(() => {
        // Number.isInteger是es6验证数字是否为整数的方法,但是我实际用的时候输入的数字总是识别成字符串
        // 所以我就在前面加了一个+实现隐式转换
        if (!Number.isInteger(+value)) {
          callback(new Error("请输入数字值"));
        } else {
          if (phoneReg.test(value)) {
            callback();
          } else {
            callback(new Error("电话号码格式不正确"));
          }
        }
      }, 100);
    };
    var checkEmail = (rule, value, callback) => {
      const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
      setTimeout(() => {
        if (mailReg.test(value)) {
          callback();
        } else {
          callback(new Error("请输入正确的邮箱格式"));
        }
      }, 100);
    };
    var checkEno = (rule, value, callback) => {
      setTimeout(() => {
        if (!Number.isInteger(+value)) {
          callback(new Error("请输入数字值"));
        }
      }, 100);
    };
    return {
      editForm: {},
      searchForm: {
        // 职工号
        eno: "",
        // 单位
        unit: null,
        // 用户名
        userName: ""
      },
      // 单位列表
      unitList: [
        {
          id: null,
          name: ""
        },
        {
          id: "林学院",
          name: "林学院"
        },
        {
          id: "水土保持学院",
          name: "水土保持学院"
        },
        {
          id: "生物科学与技术学院",
          name: "生物科学与技术学院"
        },
        {
          id: "园林学院",
          name: "园林学院"
        },
        {
          id: "经济管理学院",
          name: "经济管理学院"
        },
        {
          id: "工学院",
          name: "工学院"
        },
        {
          id: "材料科学与技术学院",
          name: "材料科学与技术学院"
        },
        {
          id: "人文社会科学学院",
          name: "人文社会科学学院"
        },
        {
          id: "外语学院",
          name: "外语学院"
        },
        {
          id: "信息学院",
          name: "信息学院"
        },
        {
          id: "理学院",
          name: "理学院"
        },
        {
          id: "生态与自然保护学院",
          name: "生态与自然保护学院"
        },
        {
          id: "环境科学与工程学院",
          name: "环境科学与工程学院"
        },
        {
          id: "艺术设计学院",
          name: "艺术设计学院"
        },
        {
          id: "马克思主义学院",
          name: "马克思主义学院"
        },
        {
          id: "草业与草原学院",
          name: "草业与草原学院"
        },
        {
          id: "继续教育学院",
          name: "继续教育学院"
        },
        {
          id: "国际学院",
          name: "国际学院"
        },
        {
          id: "体育教学部",
          name: "体育教学部"
        }
      ],
      // 表格数据
      tableData: [],
      // 表格头数据
      tableOption: [
        {
          prop: "#",
          type: "selection",
          overHidden: true
        },
        {
          prop: "eno",
          label: "工号",
          overHidden: true
        },
        {
          prop: "userName",
          label: "姓名",
          sortable: true
        },
        {
          prop: "unit",
          label: "单位"
        },
        {
          prop: "mobile",
          label: "手机号"
        },
        {
          prop: "officePhone",
          label: "办公电话"
        },
        {
          prop: "mail",
          label: "邮箱"
        },
        {
          prop: "job",
          label: "职务"
        }
      ],
      // 查询表格的条件信息
      queryInfo: {
        query: "",
        pagenum: 1,
        pagesize: 10
      },
      // 控制操作列是否显示
      isOperate: true,
      // 总数量
      total: 0,
      // 对话框标题
      dialogTitle: "",
      // 控制 对话框 是否显示
      dialogVisible: false,
      // 对话框显示内容
      approvalForm: [],
      // 角色类型
      roleType: "",
      // 用户id
      id: "",
      rules: {
        userName: [
          { required: true, message: "请输入人员名称", trigger: "blur" }
        ],
        mail: [{ validator: checkEmail, trigger: "blur" }],
        eno: [
          {
            required: true,
            validator: checkEno,
            trigger: "blur"
          }
        ],
        officePhone: [{ message: "请输入手机号", trigger: "blur" }],
        mobile: [{ validator: checkPhone, trigger: "blur" }],
        unit: [{ required: true, message: "请选择单位", trigger: "change" }],
        job: [{ message: "请输入职务", trigger: "change" }]
      },
      // 控制表单对话框是否显示
      dialogFormVisible: false
    };
  },
  // 注册组件
  components: {
    commonTable,
    commonDialog
  },
  methods: {
    // 清空搜索条件
    clear() {
      this.searchForm.eno = "";
      this.searchForm.unit = null;
      this.searchForm.userName = "";
      // 清除所有数据成功，显示所有数据
      this.queryList();
    },
    // 查询表格中的数据
    queryList() {
      const body = {
        eno: this.searchForm.eno,
        unit: this.searchForm.unit,
        userName: this.searchForm.userName,
        roleType: this.roleType,
        size: this.queryInfo.pagesize,
        page: this.queryInfo.pagenum
      };
      this.$axios.post("/v1/user/info/list.vpage", body).then(res => {
        this.tableData = res.data.list;
        this.total = res.data.totalCount;
      });
    },
    // 添加人员
    addPerson() {
      this.$router.push("/add-user/" + this.$route.params.userType);
    },
    // 删除表格中的数据
    deletePerson(row) {
      this.dialogTitle = "确认删除信息";
      this.dialogVisible = true;
      this.id = row.id;
      // 如果对话框里面有内容，先清空
      if (this.approvalForm.length != 0) {
        this.approvalForm.splice(0, this.approvalForm.length);
      }
      this.approvalForm.push(
        { type: "input", label: "用户id", title: row.id },
        { type: "input", label: "用户姓名", title: row.userName },
        { type: "input", label: "用户单位", title: row.unit },
        { type: "input", label: "用户职务", title: row.job }
      );
    },
    // 编辑表格中的数据
    editPerson(row) {
      this.dialogFormVisible = true;
      console.log(row);
      this.editForm = row;
      console.log(this.editForm);
    },
    submit(form) {
      console.log(this.editForm);
      // 发起编辑用户的请求
      this.$axios.post("/v1/user/info/edit.vpage", this.editForm).then(res => {
        if (res.success == true) {
          // 编辑用户成功
          this.dialogFormVisible = false;
        } else {
          this.$message.error("编辑用户信息失败，请稍后再试");
        }
      });
    },
    // 监听页大小的变化
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize;
      this.queryList();
    },
    // 监听页数的变化
    handleCurrentChange(newCurrent) {
      this.queryInfo.pagenum = newCurrent;
      this.queryList();
    },
    // 对话框点击取消按钮时
    cancel() {
      this.dialogVisible = false;
      console.log(this.dialogVisible);
    },
    // 对话框点击确认按钮时
    ok(data) {
      this.dialogVisible = false;
      if (data.title == "确认删除信息") {
        // 走删除的接口
        this.delete();
      }
    },
    // 删除的接口
    delete() {
      // 确认删除
      this.$axios.post("/v1/user/info/delete.vpage?id=" + this.id).then(res => {
        if (res.success == false) {
          this.$message.error("删除用户失败，请稍后再试");
        } else if (res.success == true) {
          // 删除用户成功，重新查询用户列表
          this.queryList();
        }
      });
    }
  },
  created() {
    // 获取地址栏中的地址
    console.log(this.$route.params.userType);
    if (this.$route.params.userType == "approver") {
      this.roleType = "APPROVER";
    } else if (this.$route.params.userType == "editor") {
      this.roleType = "EDITOR";
    }
    this.queryList();
  }
};
</script>

<style>
</style>