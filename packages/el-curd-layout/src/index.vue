<template>
  <div class="curd_view">
    <div class="curd_tree_view" v-if="treeOptions">
      <Tree
        @changeSatus="toggler"
        @nodeClick="treeNodeClick"
        :renderFunction="treeOptions.renderContent"
        :dataUrl="treeOptions.dataUrl"
        :search="treeOptions.search"
      ></Tree>
    </div>
    <div class="curd_table_view">
      <FromDynamic
        v-if="fromOptions"
        :searchDynamic="fromOptions"
        @query="query"
        @params-change="paramsChange"
      >
        <template v-slot:tool>
          <slot name="tool"></slot>
        </template>
      </FromDynamic>
      <CurdTable
        ref="table"
        :columns="tableOptions.columns"
        :lazy="tableOptions.lazy"
        :dataUrl="tableOptions.dataUrl"
        :pageSize="tableOptions.pageSize"
        :params="tableOptions.params"
        :local="tableOptions.local"
        :height="tableOptions.height"
        :showPage="tableOptions.showPage"
        :showPanelTool="tableOptions.showPanelTool"
        :border="tableOptions.border"
        :showOpratingToolbar="tableOptions.showOpratingToolbar"
        @row-click="rowClick"
        @row-dblclick="rowDblclick"
        @selection-change="selectionChange"
      >
        <!-- 自定义表格slot -->
        <template v-for="(item) in slotArr" v-slot:[item.slot]="Props">
          <!--  父组件调用  老版本为：slot-scope="{ row, index }" -->
          <slot :name="item.slot" :rowData="Props.rowData"></slot>
        </template>
      </CurdTable>
    </div>
  </div>
</template>

<script>
import Tree from "./Tree";
import CurdTable from "./CurdTable";
import FromDynamic from "./FromDynamic";

export default {
  name: "ElCurdLayout",
  data() {
    return {
      slotArr: [],
      toggle: true,
    };
  },
  props: {
    treeOptions: {},
    tableOptions: {},
    fromOptions: {},
  },
  components: { CurdTable, Tree, FromDynamic },
  created() {
    this.getSlot();
  },
  methods: {
    rowClick(row) {
      this.$emit("row-click", row);
    },
    rowDblclick(row) {
      this.$emit("row-dblclick", row);
    },
    selectionChange(selection) {
      this.$emit("selection-change", selection);
    },
    paramsChange(params) {
      this.$emit("params-change", params);
      this.tableOptions.params = Object.assign(
        {},
        this.tableOptions.params,
        params
      );
    },
    toggler(toggle) {
      this.toggle = toggle;
    },
    treeNodeClick({ data, node }) {
      this.$emit("node-click", { data, node });
    },
    query() {
      this.$refs.table.queryData();
    },
    refresh() {
      this.$refs.table.queryData();
    },
    getSlot() {
      var that = this;
      let mColumns = this.tableOptions.columns;
      function Maps(mColumns) {
        mColumns.forEach((item) => {
          let keys = Object.keys(item);
          if (keys.indexOf("slot") > 0) {
            that.slotArr.push(item);
            console.log("slot=", that.slotArr);
          }
          if (item.children && item.children.length > 0) {
            Maps(item.children);
          }
        });
      }
      Maps(mColumns);
    },
  },
};
</script>
<style lang='scss'>
.curd_view {
  display: flex;
  .curd_tree_view {
    width: auto;
    box-shadow: 4px 4px 30px rgba(75, 102, 171, 0.2);
    height: calc(100vh - 170px);
    border-radius: 0 4px 4px 0;
  }
  .curd_table_view {
    overflow: auto;
    padding: 12px;
    box-sizing: border-box;
    flex: 1;
    box-shadow: 4px 4px 30px rgba(75, 102, 171, 0.2);
  }
}
</style>