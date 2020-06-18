<template>
  <div>
    <el-card>
      <!-- 搜索区域 -->
      <el-form :model="searchForm" label-width="80px">
        <!-- 第一行的搜索条件 -->
        <el-row :gutter="10">
          <el-col :span="8">
            <el-form-item label="文章名称" prop="title">
              <el-input v-model="searchForm.title" placeholder="请输入文章名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="作者姓名" prop="docAuthor">
              <el-input v-model="searchForm.docAuthor" placeholder="请输入作者姓名"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 第二行的搜索条件 -->
        <el-row :gutter="10">
          <el-col :span="8">
            <el-form-item label="稿件状态" prop="status">
              <el-select v-model="searchForm.status" placeholder="请选择稿件状态" style="width:100%">
                <el-option
                  v-for="(item, index) in stateList"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="提交日期" prop="date">
              <el-date-picker
                v-model="searchForm.date"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd HH:mm:ss"
                :default-time="['00:00:00', '23:59:59']"
                style="width:100%"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8" style="text-align: center">
            <el-button type="primary">搜索</el-button>
          </el-col>
        </el-row>
      </el-form>
      <!-- 分割线 -->
      <el-divider></el-divider>
      <!-- 新闻列表区域 -->
      <common-table :tableData="tableData" :tableOption.sync="tableOption" :isOperate="isOperate">
        <!-- 操作列，填充operate的插槽 -->
        <template slot="operate" slot-scope="scope">
          <!-- 所有的状态都有查看的操作 -->
          <el-button type="primary" size="mini" @click="scanNews(scope.row)">查看</el-button>
          <!-- 草稿 审批不过待修改 可以进行编辑 -->
          <el-button
            type="warning"
            size="mini"
            v-if="scope.row.status == '待审批' || scope.row.status == '重投待审稿'"
            @click="approveNews(scope.row)"
          >审稿</el-button>
          <!-- 草稿 的可以删除 -->
          <el-button
            type="danger"
            size="mini"
            v-else-if="scope.row.status == '审批通过等待编辑部处理'"
            @click="recallNews(scope.row)"
          >撤回</el-button>
          <!-- 待审批 的可以撤回 -->
          <el-button type="primary" size="mini" v-else>追加</el-button>
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
      // 搜索表单的内容
      searchForm: {
        // 文章标题
        title: "测试",
        // 作者姓名
        docAuthor: "zhangsan",
        // 稿件状态
        status: "DRAFT",
        // 提交日期
        date: ["2020-06-11 00:00:00", "2020-07-05 23:59:59"]
      },
      // 表格数据
      tableData: [
        {
          id: 1,
          title: "林业信息拉萨解放了书法家",
          status: "APPROVAL_PENDING",
          docAuthor: "zhangshan",
          submitTime: "2020-06-06 23:58:49"
        },
        {
          id: 2,
          title: "林业信息拉萨解放了书法家",
          status: "APPROVE",
          docAuthor: "zhangshan",
          submitTime: "2020-06-07 00:10:59"
        },
        {
          id: 6,
          title: "林业信息拉萨解放了书法家",
          status: "APPROVAL_REJECTION",
          docAuthor: "zhangshan",
          submitTime: "2020-06-11 08:07:26"
        }
      ],
      // 表格操作
      tableOption: [
        {
          prop: "title",
          label: "稿件名称",
          overHidden: true
        },
        {
          prop: "status",
          label: "稿件状态"
        },
        {
          prop: "docAuthor",
          label: "作者"
        },
        {
          prop: "submitTime",
          label: "提交日期",
          sortable: true
        }
      ],
      // 控制操作列是否显示
      isOperate: true,
      // 稿件状态选择项
      stateList: [
        { label: "全部", value: "0" },
        { label: "草稿", value: "1" },
        { label: "待审稿", value: "2" },
        { label: "重投待审稿", value: "3" },
        { label: "审批不过待修改", value: "4" }
      ],
      // 查询表格的条件信息
      queryInfo: {
        query: "",
        pagenum: 1,
        pagesize: 10
      },
      // 总数量
      total: 0,
      // 对话框标题
      dialogTitle: "",
      // 控制 对话框 是否显示
      dialogVisible: false,
      // 对话框显示内容
      approvalForm: []
    };
  },
  // 注册组件
  components: {
    commonTable,
    commonDialog
  },
  methods: {
    // 点击查看按钮触发的事件
    scanNews(row) {
      this.$router.push({
        name: "approve-state-info",
        params: { id: row.id }
      });
    },
    // 点击审稿按钮触发的事件,跳转预览稿件的界面
    approveNews(row) {
      this.$router.push("/approve-perview-news/" + row.id);
    },
    // 点击撤回按钮时触发的事件
    recallNews(row) {
      this.dialogTitle = "撤回稿件确认";
      this.dialogVisible = true;
      this.id = row.id;
      // 如果对话框里面有内容，先清空
      if (this.approvalForm.length != 0) {
        this.approvalForm.splice(0, this.approvalForm.length);
      }
      this.approvalForm.push({
        type: "input",
        label: "稿件题目",
        title: row.title
      });
    },
    // 监听页大小的变化
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize;
    },
    // 监听页数的变化
    handleCurrentChange(newCurrent) {
      this.queryInfo.pagenum = newCurrent;
    },
    cancel() {
      console.log("用户点击了退出");
    },
    ok() {
      console.log("用户点击了OK");
    },
    getId() {
      console.log("我要获取id了");
    }
  },
  created() {
    this.tableData.map(item => {
      if (item.status == "APPROVAL_PENDING") {
        item.status = "待审批";
      } else if (item.status == "APPROVE") {
        item.status = "审批通过等待编辑部处理";
      } else if (item.status == "APPROVAL_REJECTION") {
        item.status = "审批不过待修改";
      }
      return item;
    });
  }
};
</script>

<style>
</style>