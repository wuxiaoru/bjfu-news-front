<template>
  <div>
    <el-card>
      <!-- 搜索区域 -->
      <el-form label-width="80px">
        <el-row :gutter="30">
          <el-col :span="8">
            <el-form-item label="文章名称">
              <el-input></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="审稿日期">
              <el-date-picker
                v-model="value1"
                type="daterange"
                range-separator="-"
                start-placeholder="开始"
                end-placeholder="结束"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="单位">
              <el-input></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="30">
          <el-col :span="8">
            <el-form-item label="作者姓名">
              <el-input></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="稿件状态">
              <el-select placeholder="请选择">
                <el-option></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <!-- 搜索按钮 -->
      <el-button class="search" type="primary">搜索</el-button>
      <!-- 分割线 -->
      <el-divider></el-divider>

      <!-- Tabs标签页 -->
      <div>
        <el-button :class="searchType == 0 ? 'el-button-focus' : ''" @click="changeSearchType(0)">已审核待编辑处理</el-button>
        <el-button @click="changeSearchType(1)">已拒稿</el-button>
        <el-button @click="changeSearchType(2)">已录用</el-button>
      </div>

      <!-- 稿件列表区域 -->
      <common-table :tableData="tableData" :tableOption.sync="tableOption" :isOperate="isOperate">
        <!-- 操作列，填充operate的插槽 -->
        <template slot="operate" slot-scope="scope">
          <el-button v-if="searchType == 0 || searchType == 1"  type="primary" size="mini">查看</el-button>
          <el-button v-if="searchType == 0" type="warning" size="mini" @click="approvalSection">编审</el-button>
          <el-button v-if="searchType == 1 || searchType == 2" type="info" size="mini" @click="jumpPreview">预览</el-button>
          <el-button v-if="searchType == 2" type="danger" size="mini" @click="downloadSection(scope.row)">下载</el-button>
        </template>
      </common-table>
    </el-card>
    <downloadsection-dialog :sectionTitle="sectionTitle" :dialogVisible="ddialogvisible"></downloadsection-dialog>
  </div>
</template>

<script>
import commonTable from "../../components/table/common-table";
import downloadsectionDialog from '../../components/dialog/downloadsection-dialog.vue';
export default {
  components: {
    commonTable,
    downloadsectionDialog
  },
  data() {
    return {
      // 0 已审核待编辑处理  1 已拒稿  2 已录用
      searchType:0,
      value1: "",
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
      // 需要下载的文章标题
      sectionTitle:'',
      //下载提示框是否显示
      ddialogvisible:false
    };
  },
  methods: {
    changeSearchType(typeid){
      this.searchType = typeid;
    },
    // 点击稿件预览按钮
    jumpPreview(){
      this.$router.push('/preview-section')
    },
    //点击审批稿件按钮
    approvalSection(){
      this.$router.push('/approval-section')
    },
    //下载稿件按钮
    downloadSection(sectionInfo){
            // 需要下载的文章标题
      this.sectionTitle = sectionInfo.name;
      //下载提示框是否显示
      this.ddialogvisible = true;
    }
  },
};
</script>

<style scoped>
.el-form {
  width: 65%;
  margin-left: 10%;
}
.el-date-editor--daterange.el-input__inner {
  width: 100%;
}
.el-select {
  width: 100%;
}
.search {
  position: absolute;
  right: 100px;
  top: 140px;
  width: 100px;
}
.el-button {
  margin-left: 0;
}
.el-button {
  margin-right: 3px;
}
.el-button-focus {
  color: #409eff;
  border-color: #c6e2ff;
  background-color: #ecf5ff;
}
</style>