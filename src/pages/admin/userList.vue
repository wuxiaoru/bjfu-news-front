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
              <el-select v-model="searchForm.unit" placeholder="请选择单位" style="width:100%">
                <el-option
                  v-for="(item, index) in unitList"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
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
        @pushId="getId"
      ></common-dialog>
    </el-card>
  </div>
</template>

<script>
import commonTable from "../../components/table/common-table";
import commonDialog from "../../components/dialog/common-dialog";
export default {
  data() {
    return {
      searchForm: {
        // 职工号
        eno: "",
        // 单位
        unit: "",
        // 用户名
        userName: ""
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
      roleType: ""
    };
  },
  // 注册组件
  components: {
    commonTable,
    commonDialog
  },
  methods: {
    // 清空搜索条件
    clear() {},
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
        console.log(res);
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
        { type: "input", label: "用户id", title: row.title },
        { type: "input", label: "用户姓名", title: row.title },
        { type: "input", label: "用户部门", title: row.title },
        { type: "input", label: "用户职务", title: row.title }
      );
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
    },
    // 获取选择审批人
    getId(id) {
      this.approvalForm.approval = id;
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