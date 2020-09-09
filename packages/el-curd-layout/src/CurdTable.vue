<template>
  <div class="curd_table">
    <div class="curd_table_main">
      <el-table
        :data="tableData"
        :border="border"
        :size="tableSize"
        :height="height"
        @row-click="rowClick"
        @row-dblclick="rowDblclick"
        @selection-change="selectionChange"
        style="width: 100%"
        :loading="loading"
      >
        <DataTable :columns="mColumns">
          <template v-for="(item) in slotArr" v-slot:[item.slot]="Props">
            <slot :name="item.slot" :rowData="Props.rowData"></slot>
          </template>
        </DataTable>
      </el-table>
    </div>
    <div v-if="showPage" style="margin:20px 10px;overflow: hidden">
      <div :style="'text-align: '+this.pageAlign">
        <el-pagination
          :total="total"
          :page-size="pageParam.pageSize"
          :current-page="pageParam.page"
          @current-change="changePage"
          @size-change="changePageSize"
          :size="tableSize"
          layout="total, sizes, prev, pager, next"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import DataTable from "./DataTable";
export default {
  props: {
    pageAlign: {
      default: "right",
    },
    tableSize: {
      default: "small",
    },
    pageSize: {
      default: 20,
    },
    showSettingToolbar: {
      type: Boolean,
      default: true,
    },
    showPage: {
      type: Boolean,
      default: true,
    },
    lazy: {
      type: Boolean,
      default: false,
    },
    columns: {},
    dataUrl: {},
    params: {},
    height: {
      default: "52vh",
    },
    border: {
      type: Boolean,
      default: true,
    },
    resizable: {
      type: Boolean,
      default: true,
    },
    showPanelTool: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      loading: false,
      tableData: [
        {
          creator: "rzx007",
          id: 12,
          projectName: "name",
          createDate: "12-11",
          description: "w21",
        },
      ],
      mColumns: [],
      selection: [],
      total: 0,
      pageParam: {
        pageIndex: 1,
        pageSize: 10,
      },
      slotArr: [],
    };
  },
  components: { DataTable },
  methods: {
    queryData() {
      if (!this.dataUrl || this.loading === true) {
        return;
      }
      this.selection = null;
      this.$emit("selection-change", null);

      this.loading = true;
      let params = Object.assign(
        JSON.parse(JSON.stringify(this.pageParam)),
        this.params
      );
      console.log(params);
    },
    changePage(page) {
      this.pageParam.pageIndex = page;
      this.queryData();
    },
    changePageSize(pageSize) {
      this.pageParam.pageSize = pageSize;
      this.queryData();
    },
    rowClick(row) {
      // this.$refs.table.toggleAllSelection();
      this.$emit("row-click", row);
    },
    rowDblclick(row) {
      this.$emit("row-dblclick", row);
    },
    selectionChange(selection) {
      this.$emit("selection-change", selection);
    },
    getSlot() {
      var that = this;
      let mColumns = this.mColumns;
      function Maps(mColumns) {
        mColumns.forEach((item) => {
          let keys = Object.keys(item);
          if (keys.indexOf("slot") > 0) {
            that.slotArr.push(item);
          }
          if (item.children && item.children.length > 0) {
            Maps(item.children);
          }
        });
      }
      Maps(mColumns);
    },
  },
  created() {
    if (!this.showPage) {
      delete this.pageParam.pageSize;
      delete this.pageParam.pageIndex;
    }
    this.mColumns = this.columns;
    this.getSlot();

    if (this.pageSize != null && this.showPage) {
      this.pageParam.pageSize = this.pageSize;
    }
    if (!this.lazy) {
      this.queryData();
    }
  },
  watch: {
    params: {
      // eslint-disable-next-line no-unused-vars
      handler(curVal, oldVal) {
        console.log(curVal);
        this.pageParam.pageIndex = 1;
        this.queryData();
      },
      deep: true,
    },
  },
};
</script>
<style lang='scss'>
.curd_table {
 
  background-color: #fff;
  padding: 10px;
  margin-top: 20px;
  border-radius: 4px;
}
</style>