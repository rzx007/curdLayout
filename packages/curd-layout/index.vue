<template>
  <Row class="row_main" style="height: 100%;">
    <Col v-if="treeOptions&&expand" :xs="8" :sm="4" :md="4" :lg="3" class="curd_view_left_col">
      <Tree
        @on-trigger="triggerTree"
        :renderFunc="treeOptions.renderFunc"
        :dataUrl="treeOptions.dataUrl"
        :param="treeOptions.param"
        @on-select-change="selectOption"
      ></Tree>
    </Col>
    <Col
      :xs="rightSpan(16)"
      :sm="rightSpan(20)"
      :md="rightSpan(20)"
      :lg="rightSpan(21)"
      class="curd_view_right_col"
    >
      <CurdTable
        ref="crudTable"
        :tableOptions="tableOptions"
        @on-selection-change="selectionChange"
        @on-row-dblclick="rowDblclick"
        @on-row-click="rowClick"
        @on-change="getInputParams"
      >
        <template v-slot:pannel>
          <slot name="pannel"></slot>
        </template>
        <template v-for="(item) in slotArr" v-slot:[item.slot]="Props">
          <slot :name="item.slot" :rowData="Props.rowData"></slot>
        </template>
        <template v-slot:tool>
          <slot name="tool"></slot>
        </template>
      </CurdTable>
    </Col>
    <Icon
      v-if="treeOptions&&!expand"
      type="ios-arrow-forward"
      class="row_tree_icon"
      @click="expand = true"
    />
  </Row>
</template>

<script>
import Tree from "./components/Tree";
import CurdTable from "./components/CurdTable";
export default {
  name:"curdLayout",
  data() {
    return {
      expand: true,
      slotArr: []
    };
  },
  props: {
    treeOptions: {},
    tableOptions: {}
  },
  components: { CurdTable, Tree },
  methods: {
    rightSpan(span) {
      if (this.treeOptions == null || !this.expand) {
        return 24;
      } else {
        return span;
      }
    },
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
      this.$emit("on-change", params);
    },
    searchTable() {
      this.$refs.crudTable.queryTable();
    },
    selectOption({ nodeArr, item }) {
      this.searchTable(); // 选中tree后触发列表查询
      this.$emit("on-select-change", { nodeArr, item });
    },
    triggerTree(bool) {
      this.expand = bool;
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
.row_main {
  .curd_view_left_col {
    height: 100%;
    position: relative;
  }

  .curd_view_right_col {
    padding: 10px 0px;
    margin-left: -2px;
    height: 100%;
    overflow: auto;
  }
  .row_tree_icon {
    z-index: 10;
    font-size: 30px;
    position: absolute;
    top: 50%;
    left: -6px;
    cursor: pointer;
    &:hover {
      // color: @hoverColor;
    }
  }
}
</style>