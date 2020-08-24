 <!--<template>
  <div>
    <template v-for="(item,index) in columns">
      <el-table-column
        v-if="item.type==='selection'"
        type="selection"
        :key="index+'selection'"
        :width="item.width"
        fixed
      ></el-table-column>
      <template v-else>
        <el-table-column
          v-if="!item.slot"
          :type="item.type"
          :prop="item.prop"
          :label="item.label"
          :key="index"
          :width="item.width"
        >
          <template v-if="item.children&&item.children.length > 0">
            <DataTable :columns="item.children"></DataTable> 
          </template>
        </el-table-column>
        <el-table-column v-else :label="item.label" :key="index">
          <template slot-scope="scope">
            {{item.slot}}
            <slot :name="item.slot" :rowData="{row:scope.row,index:scope.$index}"></slot>
          </template>
        </el-table-column>
      </template>
    </template>
  </div>
</template>-->

<script>
export default {
  name: "DataTable",
  data() {
    return {
      user: "rzx",
    };
  },
  props: {
    columns: {
      type: Array,
      required: true,
    },
  },
  methods: {
    renderFunc(columns, h) {
      var that = this;
      let children = [];
      let elememtArr = columns.map((item) => {
        const columnProps = {
          label: item.label,
          width: item.width,
          minWidth: item.minWidth,
          fixed: item.fixed || false,
          renderHeader: item.renderHeader,
          resizable: item.resizable || true,
          align: item.align || "left",
          headerAlign: item.headerAlign,
        };
        if (item.slot) {
          // slot,自定义列模板
          return h("el-table-column", {
            props: {
              label: item.label,
              width: item.width,
              ...columnProps,
            },
            scopedSlots: {
              // scope 就相当于 slot-scope="{title}" 里面的值
              default: (scope) => {
                return [
                  h("span", [
                    h(
                      "p",
                      that.$scopedSlots[item.slot]({
                        rowData: {
                          row: scope.row,
                          colum: scope.column,
                          index: scope.$index,
                        },
                      })
                    ),
                  ]),
                ];
              },
            },
          });
        }
        
        if (item.type === "index") {
          return h(
            "el-table-column",
            {
              props: {
                type: "index",
                label: item.label,
                width: item.width,
                fixed: "left",
              },
            },
            [children]
          );
        }
        if (item.type === "selection") {
          return h(
            "el-table-column",
            {
              props: {
                type: "selection",
                label: item.label,
                width: item.width,
                fixed: "left",
              },
            },
            [children]
          );
        }
        if (item.children && item.children.length > 0) {
          children = that.renderFunc(item.children, h); //嵌套表头，递归
        }
        return h(
          "el-table-column",
          {
            props: {
              prop: item.prop,
              type: item.type,
              sortable: item.sortable || false,
              sortMethod: item.sortMethod,
              sortBy: item.sortBy,
              showOverflowtooltip: item.showOverflowtooltip,
              ...columnProps,
            },
          },
          [children]
        );
      });
      return elememtArr;
    },
  },
  render(h) {
    var that = this;
    let elememtArr = this.renderFunc(that.columns, h);
    return h(
      "div",

      elememtArr
    );
  },
};
</script>
<style lang='less'>
</style>