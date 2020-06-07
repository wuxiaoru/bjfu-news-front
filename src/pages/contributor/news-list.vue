<template>
  <div>
    <el-card>
      <!-- 搜索区域 -->
      <el-form :model="searchForm" label-width="80px">
        <!-- 第一行的搜索条件 -->
        <el-row :gutter="10">
          <el-col :span="8">
            <el-form-item label="文章标题" prop="title">
              <el-input v-model="searchForm.title" placeholder="请输入文章标题"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="作者姓名" prop="name">
              <el-input v-model="searchForm.name" placeholder="请输入作者姓名"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 第二行的搜索条件 -->
        <el-row :gutter="10">
          <el-col :span="8">
            <el-form-item label="稿件状态" prop="state">
              <el-select v-model="searchForm.state" placeholder="请选择稿件状态" style="width:100%">
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
      <!-- 按钮，添加一个父级元素 为了清除浮动 -->
      <div class="clearfix">
        <el-button type="primary" style="float: right">新建文章</el-button>
      </div>
      <!-- 加载Loading的组件 -->
      <!-- <loading :isShow = "isShow"></loading> -->
      <!-- 新闻列表区域 -->
      <common-table :tableData="tableData" :tableOption.sync="tableOption" :isOperate="isOperate">
        <!-- 操作列，填充operate的插槽 -->
        <template slot="operate" slot-scope="scope">
          <el-button type="primary" size="mini" v-if="scope.row.state == '草稿'">查看</el-button>
          <el-button type="warning" size="mini" @click="submit(scope.row)">提交</el-button>
          <el-button type="info" size="mini">编辑</el-button>
          <el-button type="danger" size="mini">删除</el-button>
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
    </el-card>
  </div>
</template>

<script>
import commonTable from "../../components/table/common-table";
import commonDialog from "../../components/dialog/common-dialog";
export default {
  data() {
    return {
      // 控制 加载组件 是否显示
      isShow: true,
      // 搜索表单的内容
      searchForm: {
        // 文章标题
        title: "",
        // 作者姓名
        name: "",
        // 稿件状态
        state: "",
        // 提交日期
        date: ""
      },
      // 稿件状态选择项
      stateList: [
        { label: "全部", value: "0" },
        { label: "草稿", value: "1" },
        { label: "待审稿", value: "2" },
        { label: "重投待审稿", value: "3" },
        { label: "审批不过待修改", value: "4" }
      ],
      // 表格数据
      tableData: [
        {
          date: "2016-05-02 11:31:17",
          name: "北林大院植物选秀，各个尽显风采",
          state: "草稿",
          author: "张三"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          state: "待审批",
          author: "张三"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          state: "审批不过待修改",
          author: "张三"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          state: "编辑部已录用",
          author: "张三"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          state: "审批通过待编辑部处理",
          author: "张三"
        }
      ],
      // 表格操作
      tableOption: [
        {
          type: "selection",
          label: "#"
        },
        {
          prop: "name",
          label: "稿件名称",
          overHidden: true
        },
        {
          prop: "state",
          label: "稿件状态",
          sortable: true
        },
        {
          prop: "author",
          label: "作者"
        },
        {
          prop: "date",
          label: "提交日期",
          sortable: true
        }
      ],
      // 控制操作列是否显示
      isOperate: true,
      // 查询表格的条件信息
      queryInfo: {
        query: "",
        pagenum: 1,
        pagesize: 10
      },
      // 总数量
      total: 0,
      // 对话框标题
      dialogTitle: "选择审批人",
      // 控制 对话框 是否显示
      dialogVisible: false,
      // 对话框显示内容
      approvalForm: [
        {
          type: "input",
          label: "稿件题目",
          title: "北林大院植物选秀"
        },
        {
          type: "select",
          label: "选择审稿人",
          approval: "",
          option: [
            { label: "张老师", value: "0" },
            { label: "杨老师", value: "1" },
            { label: "米老师", value: "2" }
          ]
        }
      ]
    };
  },
  // 注册组件
  components: {
    commonTable,
    commonDialog
  },
  methods: {
    // 监听页大小的变化
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize;
    },
    // 监听页数的变化
    handleCurrentChange(newCurrent) {
      this.queryInfo.pagenum = newCurrent;
    },
    // 点击提交按钮时触发的事件
    submit(row) {
      this.dialogVisible = true;
      this.approvalForm[0].title = row.name;
    },
    // 对话框点击取消按钮时
    cancel() {
      this.dialogVisible = false;
      console.log(this.dialogVisible);
    },
    // 对话框点击确认按钮时
    ok() {
      this.dialogVisible = false;
      console.log(this.dialogVisible);
    }
  }
};
</script>

<style lang="less" scoped>
</style>