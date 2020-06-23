<template>
  <div>
    <el-card>
      <!-- 搜索区域 -->
      <el-form label-width="80px">
        <el-row :gutter="30">
          <el-col :span="8">
            <el-form-item label="文章名称">
              <el-input v-model="textName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="审稿日期">
              <el-date-picker
                v-model="selectedTextDateTime"
                type="daterange"
                range-separator="-"
                start-placeholder="开始"
                end-placeholder="结束"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="单位">
              <el-select v-model="selectedUnitOption" placeholder="请选择">
                <el-option
                  v-for="item in selectOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="30">
          <el-col :span="8">
            <el-form-item label="作者姓名">
              <el-input v-model="docAuthor"></el-input>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="8">
            <el-form-item label="稿件状态">
              <el-select v-model="selectedTextStatus" placeholder="请选择">
                <el-option
                  v-for="item in selectStatusOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>-->
        </el-row>
      </el-form>
      <!-- 搜索按钮 -->
      <el-button class="search" type="primary" @click="searchText">搜索</el-button>
      <!-- 分割线 -->
      <el-divider></el-divider>

      <!-- Tabs标签页 -->
      <div>
        <el-button
          :class="searchType == 0 ? 'el-button-focus' : ''"
          @click="changeSearchType(0)"
        >已审核待编辑处理</el-button>
        <el-button @click="changeSearchType(1)">已拒稿</el-button>
        <el-button @click="changeSearchType(2)">已录用</el-button>
      </div>

      <!-- 稿件列表区域 -->
      <common-table :tableData="tableData" :tableOption.sync="tableOption" :isOperate="isOperate">
        <!-- 操作列，填充operate的插槽 -->
        <template slot="operate" slot-scope="scope">
          <el-button
            v-if="searchType == 0 || searchType == 1"
            type="primary"
            size="mini"
            @click="getSectionInfo(scope.row)"
          >查看</el-button>
          <el-button v-if="searchType == 0" type="warning" size="mini" @click="approvalSection(scope.row)">编审</el-button>
          <el-button
            v-if="searchType == 1 || searchType == 2"
            type="info"
            size="mini"
            @click="jumpPreview"
          >预览</el-button>
          <el-button
            v-if="searchType == 2"
            type="danger"
            size="mini"
            @click="downloadSection(scope.row)"
          >下载</el-button>
        </template>
      </common-table>
      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[5, 10, 20, 50]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
    <downloadsection-dialog :sectionTitle="sectionTitle" :dialogVisible="ddialogvisible"></downloadsection-dialog>
  </div>
</template>

<script>
import commonTable from "../../components/table/common-table";
import downloadsectionDialog from "../../components/dialog/downloadsection-dialog.vue";
export default {
  components: {
    commonTable,
    downloadsectionDialog
  },
  data() {
    return {
      //每页条数
      size:5,
      //当前的页数
      page:0,
      //当前记录条数
      total:0,
      // 0 已审核待编辑处理  1 已拒稿  2 已录用
      searchType: 0,
      value1: "",
      //稿件状态
      status: "",
      //文章名称
      textName: "",
      //文章作者
      docAuthor: "",
      //选择稿件时间范围
      selectedTextDateTime: "",
      //稿件状态，查询参数使用
      TextStatus: "APPROVE",
      // 控制操作列是否显示
      isOperate: true,
      // 表格数据
      tableData: [],
      tableOption: [
        {
          prop: "title",
          label: "稿件名称",
          overHidden: true
        },
        {
          prop: "status",
          label: "稿件状态",
          sortable: true
        },
        {
          prop: "docAuthor",
          label: "作者"
        },
        {
          prop: "unit",
          label: "单位"
        },
        {
          prop: "approveName",
          label: "审稿人"
        },
        {
          prop: "approveTime",
          label: "审稿日期",
          sortable: true
        }
      ],
      //当前选中的单位
      selectedUnitOption: "",
      //当前选中的稿件状态
      selectedTextStatus: "",
      //单位数据
      selectOptions: [
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
      //稿件状态数据
      selectStatusOptions: [
        {
          value: "APPROVE",
          label: "审稿通过等待编辑部处理"
        },
        {
          value: "HIRE",
          label: "编辑部已录用"
        },
        {
          value: "REJECTION",
          label: "编辑部已拒稿"
        }
      ],
      // 需要下载的文章标题
      sectionTitle: "",
      //下载提示框是否显示
      ddialogvisible: false
    };
  },
  methods: {
    changeSearchType(typeid) {
      this.searchType = typeid;
      switch (typeid) {
        case 0:
          this.TextStatus = "APPROVE";
          this.status = "审稿通过等待编辑部处理";
          break;
        case 1:
          this.TextStatus = "REJECTION";
          this.status = "编辑部已拒稿";
          break;
        case 2:
          this.TextStatus = "HIRE";
          this.status = "辑部已录用";
          break;
        default:
          break;
      }
      this.$axios
        .post("/edit/list.vpage", {
          status: this.TextStatus,
          size: this.size,
          page: this.page
        })
        .then(res => {
          // console.log(res);
          this.tableData = res.data.list;
          this.total = res.data.totalCount;
          for (let i = 0; i < this.tableData.length; i++) {
            this.tableData[i].status = this.status;
          }
        });
    },
    // 点击稿件预览按钮
    jumpPreview() {
      this.$router.push("/preview-section");
    },
    //点击审批稿件按钮
    approvalSection(info) {
       this.$router.push({
        name: "preview-section",
        params: {
          id: info.id
        }
      });
    },
    //下载稿件按钮
    downloadSection(sectionInfo) {
      // 需要下载的文章标题
      this.sectionTitle = sectionInfo.name;
      //下载提示框是否显示
      this.ddialogvisible = true;
    },
    //按条件查询文章
    searchText() {
      //构建一个查询对象
      var searchObj = {};
      if (this.textName.trim() != "") {
        searchObj.title = this.textName;
      }
      if (this.selectedTextDateTime.length > 0) {
        searchObj.startTime = this.selectedTextDateTime[0];
        searchObj.endTime = this.selectedTextDateTime[1];
      }
      if (this.selectedUnitOption != "") {
        searchObj.unit = this.textName;
      }
      if (this.docAuthor.trim() != "") {
        searchObj.docAuthor = this.docAuthor;
      }
      // if (this.selectedTextStatus!="") {
      searchObj.status = this.TextStatus;
      // };
      this.$axios.post("/edit/list.vpage", searchObj).then(res => {
        console.log(res);
        this.tableData = res.data.list;
        for (let i = 0; i < this.tableData.length; i++) {
          this.tableData[i].status = this.status;
        }
      });
    },
    //预览指定稿件
    previewSection(info) {
      console.log(info);
      // this.$axios.get("/contribution/detail.vpage")
    },
    // 查看稿件详情
    getSectionInfo(info) {
      this.$router.push({
        name: "section-info",
        params: {
          id: info.id
        }
      });
      // console.log(info);
      // this.$axios.get("/contribution/detail.vpage?id="+info.id).then(res=>{

      //   if (res.success) {
      //     this.$router.push({
      //       name:"state-info",
      //       params:{

      //       }
      //     })
      //   } else {

      //   }

      // })
    },
    // 监听页大小的变化
    handleSizeChange(newSize) {
      this.size = newSize;
    },
    // 监听页数的变化
    handleCurrentChange(newCurrent) {
      this.page = newCurrent;
    }
  },
  mounted() {
    console.log("1111");

    this.changeSearchType(0);
  }
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