<template>
  <el-card>
    <el-row>
      <el-col :span="18" push="1">
        <el-row>
          <el-form status-icon ref="ruleForm" label-width="100px">
            <el-form-item label="工号">
              <el-input type="password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="姓名">
              <el-input type="password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="单位">
              <el-select v-model="value" placeholder="请选择"></el-select>
            </el-form-item>
          </el-form>
        </el-row>
      </el-col>
      <el-col :span="4" push="2">
        <el-row>
          <el-button type="primary">搜索</el-button>
          <el-button type="success">添加</el-button>
          <el-button type="danger">删除</el-button>
        </el-row>
      </el-col>
    </el-row>
    <el-divider></el-divider>
          <!-- 稿件列表区域 -->
      <common-table :tableData="tableData" :tableOption.sync="tableOption" ></common-table>
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
  </el-card>
</template>

<script>
import commonTable from "../../components/table/common-table";
export default {
  components: {
    commonTable
  },
  data() {
    return {
      // 控制操作列是否显示
      isOperate: true,
      // 表格数据
      tableData: [
        {
          name: "北林大院植物选秀，各个尽显风采",
          state: "待处理",
          author: "张三",
          depart: "书信学院",
          reviewer: "郝平平",
          date: "2016-05-02 11:31:17"
        },
        {
          name: "北林大院植物选秀，各个尽显风采",
          state: "已拒稿",
          author: "张三",
          depart: "书信学院",
          reviewer: "郝平平",
          date: "2016-05-02 11:31:17"
        },
        {
          name: "北林大院植物选秀，各个尽显风采",
          state: "已录用",
          author: "张三",
          depart: "书信学院",
          reviewer: "郝平平",
          date: "2016-05-02 11:31:17"
        }
      ],
      tableOption: [
          {
          prop: "#",
          type: "selection",
          overHidden: true
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
          prop: "depart",
          label: "单位"
        },
        {
          prop: "reviewer",
          label: "审稿人"
        },
        {
          prop: "date",
          label: "审稿日期",
          sortable: true
        }
      ],
       // 查询表格的条件信息
      queryInfo: {
        query: "",
        pagenum: 1,
        pagesize: 10
      }
    };
  },
  methods: {
      // 监听页大小的变化
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize;
    },
    // 监听页数的变化
    handleCurrentChange(newCurrent) {
      this.queryInfo.pagenum = newCurrent;
    }
  },
  mounted() {
    // console.log(this.);
  }
};
</script>

<style scoped>
.el-form-item {
  display: inline-block;
}
.el-input,
.el-select {
  width: 450px;
}
</style>