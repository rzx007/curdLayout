<template>
  <div class="table_panel">
    <!-- 表格默认新增删操作按钮 -->
    <div class="table_panel_tool">
      <div class="panel_tool_right" v-if="showOpratingToolbar">
        <template v-if="showPanelTool">
          <Button type="default" shape="circle" icon="ios-add">添 加</Button>
          <Button type="default" shape="circle" icon="ios-build" @click="1" :disabled="isSingle">编 辑</Button>
          <Poptip confirm title="您确认删除选中的内容吗？" @on-ok="1" placement="bottom-start" transfer>
            <Button type="default" shape="circle" icon="ios-beaker" :disabled="isMultiple">删 除</Button>
          </Poptip>
        </template>
        <slot name="pannel"></slot>
      </div>
      <div class="panel_tool_left" v-if="showSettingToolbar">
        <Button type="default" @click="queryData" icon="ios-refresh"></Button>
        <Poptip placement="bottom-end" width="200">
          <Button type="default" icon="ios-funnel"></Button>
          <div slot="content" style="margin: 5px 0">
            <div v-for="(col,index) in columns" :key="index">
              <Checkbox
                @on-change="columnsChange"
                :true-value="false"
                :false-value="true"
                v-if="col.title"
                v-model="col.hidden"
                :label="col.title"
              >{{col.title}}</Checkbox>
            </div>
            <div></div>
          </div>
        </Poptip>
      </div>
    </div>
    <!-- 表格 -->
    <div class="curd_table">
      <Table
        class="curd_table_content"
        :data="tableData"
        :columns="mColumns"
        :border="border"
        ref="table"
        @on-row-click="rowClick"
        @on-row-dblclick="rowDblclick"
        @on-selection-change="selectionChange"
        @on-sort-change="onSortChange"
        :size="tableSize"
        :loading="loading"
        :height="height"
        highlight-row
      >
        <!-- 自定义表格内容，具名插槽与作用域插槽 -->
        <template v-for="(item) in slotArr" slot-scope="{ row, index }" :slot="item.slot">
          <!-- 作用域插槽 -->
          <slot :name="item.slot" :rowData="{ row, index }"></slot>
        </template>
      </Table>
    </div>
    <!-- 表格分页 -->
    <div v-if="showPage" style="margin:20px 10px;overflow: hidden">
      <div :style="'text-align: '+this.pageAlign">
        <Page
          :total="total"
          :page-size="pageParam.pageSize"
          placement="top"
          :current="pageParam.page"
          @on-change="changePage"
          @on-page-size-change="changePageSize"
          :size="tableSize"
          show-total
          show-sizer
          show-elevator
        ></Page>
      </div>
    </div>
  </div>
</template>

<script>
// import { apiGet } from "@/api";
export default {
  props: {
    pageAlign: {
      default: "right"
    },
    tableSize: {
      default: "small"
    },
    pageSize: {
      default: 20
    },
    showOpratingToolbar: {
      type: Boolean,
      default: true
    },
    showSettingToolbar: {
      type: Boolean,
      default: true
    },
    showPage: {
      type: Boolean,
      default: true
    },
    lazy: {
      type: Boolean,
      default: false
    },
    columns: {},
    dataUrl: {},
    param: {},
    height: {
      default: "580"
    },
    border: {
      type: Boolean,
      default: true
    },
    showPanelTool: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      total: 0,
      loading: false,
      searchTimer: null,
      mColumns: [],
      selection: [],
      pageParam: {
        pageIndex: 1,
        pageSize: 10
      },
      tableData: [],
      slotArr: []
    };
  },
  computed: {
    isSingle() {
      return !(this.selection !== null && this.selection.length === 1);
    },
    isMultiple() {
      return !(this.selection != null && this.selection.length > 0);
    }
  },
  methods: {
    /**
     * 获取数据
     */
    queryData() {
      if (!this.dataUrl) {
        return;
      }
      this.selection = null;
      this.$emit("on-selection-change", null);
      if (this.dataUrl == null || this.loading === true) {
        return;
      }
      this.loading = true;
      // let param = Object.assign(
      //   JSON.parse(JSON.stringify(this.pageParam)),
      //   this.param
      // );
      // apiGet(this.dataUrl, param)
      //   .then(res => {
      //     this.loading = false;
      //     if (!res.code === 1) {
      //       return;
      //     } else {
      //       this.total = res.pojoTotalCount;
      //       this.tableData = res.data;
      //     }
      //   })
      //   // eslint-disable-next-line no-unused-vars
      //   .catch(err => {
      //     this.loading = false;
      //   });
    },
    changePage(page) {
      this.pageParam.pageIndex = page;
      this.queryData();
    },
    changePageSize(pageSize) {
      this.pageParam.pageSize = pageSize;
      this.queryData();
    },
    selectionChange(selection) {
      this.selection = selection;
      this.$emit("on-selection-change", this.selection);
    },
    rowDblclick(data, index) {
      this.$emit("on-row-dblclick", data, index);
    },
    rowClick(data, index) {
      this.$refs.table.selectAll(false);
      this.$refs.table.toggleSelect(index);
      this.$emit("on-row-click", data, index);
    },
    clearCurrentRow() {
      this.$refs["table"].clearCurrentRow();
    },
    onSortChange(data) {
      this.pageParam.sortField = data.key;
      this.pageParam.sortOrder = data.order;
      this.queryData();
    },
    columnsChange() {
      let list = [];
      for (let key = 0; key < this.columns.length; key++) {
        if (
          this.columns[key] instanceof Object &&
          (this.columns[key].hidden == null || !this.columns[key].hidden)
        ) {
          list.push(this.columns[key]);
        }
      }
      this.mColumns = list;
      this.$nextTick(() => {
        this.mColumns = list;
      });
    },
    /**
     * 表格字段绑定数据
     */
    columnRenderData() {
      if (this.mColumns != null) {
        for (let i = 0; i < this.mColumns.length; i++) {
          let col = this.mColumns[i];
          // 数据枚举
          if (col.enum) {
            col.render = (h, params) => {
              const row = params.row;
              for (let i = 0; i < col.enum.length; i++) {
                if (typeof col.enum[i] === "string" && i === row[col.key]) {
                  return h("span", col.enum[i]);
                } else if (row[col.key] === col.enum[i].id) {
                  let html = col.enum[i].el || "span";
                  return h(html, col.enum[i].value);
                }
              }
              return null;
            };
          }
           if(col.key == 'index') {
            col.render = (h, params) => {
              return h("span", params.index + (this.pageParam.pageIndex - 1)*this.pageParam.pageSize + 1);
            }
          }
        }
      }
    }
  },
  created() {
    if (!this.showPage) {
      delete this.pageParam.pageSize;
      delete this.pageParam.pageIndex;
    }
    this.mColumns = this.columns;
    this.columns.forEach(item => {
      let keys = Object.keys(item);
      if (keys.indexOf("slot") > 0) {
        this.slotArr.push(item);
      }
    });
    this.columnRenderData();
    if (this.pageSize != null && this.showPage) {
      this.pageParam.pageSize = this.pageSize;
    }
    if (!this.lazy) {
      this.queryData();
    }
  },
  watch: {
    param: {
      // eslint-disable-next-line no-unused-vars
      handler(curVal, oldVal) {
        console.log(curVal);
        this.pageParam.pageIndex = 1;
        this.queryData();
      },
      deep: true
    },
    columns: {
      // eslint-disable-next-line no-unused-vars
      handler(curVal, oldVal) {
        this.mColumns = curVal;
      },
      deep: true
    }
  },
  components: {}
};
</script>

<style scoped>
.table-spin {
  position: absolute;
  left: 50%;
  top: 48%;
}
</style>

<style lang='less'>
.table_panel {
  height: calc(100% - 45px);
  .table_panel_tool {
    display: inline-block;
    width: 100%;
  }
  .ivu-table {
    background-color: transparent !important;
  }
  .ivu-table-wrapper {
    border-color: #f4f4f4;
  }
  .panel_tool_right {
    float: left;
    button {
      margin-right: 12px;
    }
  }
  .panel_tool_left {
    float: right;
    padding-top: 8px;
    button {
      margin-left: 8px;
    }
  }
}
</style>
