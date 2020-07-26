<template>
  <div style="height: 100%;">
    <!-- 查询条件 -->
    <FromDynamic
      v-if="tableOptions.searchDynamic"
      ref="searchFrom"
      :data="tableOptions.searchDynamic"
      :toolAlign ="tableOptions.toolAlign"
      @on-change="getInputParams"
    >
    <!-- 工具栏slot -->
      <template v-slot:tool>
        <Button type="default" icon="ios-search" @click="queryTable()">查询</Button>
        <slot name="tool"></slot>
      </template>
    </FromDynamic>
    <!-- 表格，包裹增改删，和刷新筛选 -->
    <DataTable
      ref="table"
      :columns="tableOptions.columns"
      :lazy="tableOptions.lazy"
      :dataUrl="tableOptions.dataUrl"
      :pageSize="tableOptions.pageSize"
      :param="tableOptions.param"
      :local="tableOptions.local"
      :height="tableOptions.height"
      :showPage="tableOptions.showPage"
      :showPanelTool="tableOptions.showPanelTool"
      :border="tableOptions.border"
      :showOpratingToolbar="tableOptions.showOpratingToolbar"
      :showSettingToolbar="tableOptions.showSettingToolbar"
      @on-selection-change="selectionChange"
      @on-row-dblclick="rowDblclick"
      @on-row-click="rowClick"
    >
    <!-- 表格操作工具按钮slot -->
      <template v-slot:pannel>
        <slot name="pannel"></slot>
      </template>
      <!-- 自定义表格slot -->
      <template v-for="(item) in slotArr" v-slot:[item.slot]="Props">
        <!--  父组件调用  老版本为：slot-scope="{ row, index }" -->
        <slot :name="item.slot" :rowData="Props.rowData"></slot>
      </template>
    </DataTable>
  </div>
</template>

<script>
import DataTable from "./DataTable";
import FromDynamic from "./FromDynamic";
export default {
  data() {
    return {
      slotArr: []
    };
  },
  props: {
    tableOptions: {
      searchDynamic: []
    }
  },
  components: { DataTable, FromDynamic },
  methods: {
    selectionChange(selection) {
      this.$emit("on-selection-change", selection);
    },
    rowDblclick(selection) {
      this.$emit("on-row-dblclick", selection);
    },
    rowClick(selection) {
      this.$emit("on-row-click", selection);
    },
    getInputParams(params) {
      this.$emit('on-change',params)
      this.tableOptions.param = Object.assign(this.tableOptions.param, params);
    },
    queryTable() {
      this.$refs.table.queryData();
    }
  },
  created() {
    this.tableOptions.columns.forEach(item => {
      let keys = Object.keys(item);
      if (keys.indexOf("slot") > 0) {
        this.slotArr.push(item);
      }
    });
  }
};
</script>
<style lang='less'>
</style>