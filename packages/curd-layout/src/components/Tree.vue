<template>
  <div class="curd_tree_main">
    <div class="tree_tool">
      <Input
        v-model="searchName"
        @on-change="treeSearch"
        placeholder="输入查询"
        clearable
        suffix="ios-search"
      />
    </div>
    <Tree
      :data="treeData"
      ref="tree"
      :render="renderFunc"
      @on-select-change="selectOption"
      class="tree_item"
    ></Tree>
    <Icon type="ios-arrow-back" class="tree_icon" @click="treeTrigger" />
  </div>
</template>

<script>
// import { apiGet } from "@/api";
// eslint-disable-next-line no-unused-vars
function renderContent(h, { root, node, data }) {
  const renderFuc = function(icon) {
    return h(
      "span",
      {
        style: {
          display: "inline-block",
          width: "100%"
        }
      },
      [
        h("span", [
          h("Icon", {
            props: {
              type: icon
            },
            style: {
              marginRight: "8px"
            }
          }),
          h("span", data.name)
        ])
      ]
    );
  };
  switch (data.level) {
    case "1":
      return renderFuc("ios-folder-outline");

    case "2":
      return renderFuc("logo-buffer");

    case "3":
      return renderFuc("md-albums");

    case "4":
      return renderFuc("md-card");

    default:
      return renderFuc("logo-buffer");
  }
}
export default {
  data() {
    return {
      searchName: "",
      treeData: [],
      treeDataCopy: []
    };
  },
  props: {
    renderFunc: {
      type: Function,
      default: renderContent
    },
    dataUrl: {},
    param: {}
  },
  methods: {
    selectOption(nodeArr, item) {
      this.$emit("on-select-change", { nodeArr, item });
    },
    queryTreeData() {
      if (!this.dataUrl) {
        return;
      }
      // let param = this.param;
      // apiGet(this.dataUrl, param).then(res => {
      //   if (!res.code === 1) {
      //     return;
      //   } else {
      //     this.treeDataCopy = res.data;
      //     this.treeData = res.data;
      //   }
      // });
    },
    treeSearch: function() {
      var that = this;
      if (!that.treeDataCopy) {
        return;
      }
      if (!that.searchName) {
        that.treeData = that.treeDataCopy;
        return;
      }
      var filterResult = that.filterTree(that.treeDataCopy, that.searchName); // 返回符合条件的对象
      if (filterResult) {
        that.treeData = filterResult;
      } else {
        that.treeData = [];
      }
    },
    // 本地查询
    filterTree(treeDataCopy, searchName) {
      var that = this;
      let newarr = [];
      treeDataCopy.forEach(element => {
        if (element.children && element.name.indexOf(searchName) > -1) {
          newarr.push(element);
        } else {
          if (element.children) {
            const res = that.filterTree(element.children, searchName);
            console.log(res);
            const obj = {
              //合并，覆盖children
              ...element,
              children: res
            };
            if (obj.name.indexOf(searchName) > -1 || (res && res.length)) {
              obj.expand = true;
              newarr.push(obj);
            }
          } else {
            if (element.name.indexOf(searchName) > -1) {
              newarr.push(element);
            }
          }
        }
      });
      return newarr;
    },
    treeTrigger(){
      this.$emit("on-trigger",false)
    }
  },
  created() {
    this.queryTreeData();
  }
};
</script>
<style lang='less'>
.curd_tree_main {
  height: 100%;
  padding: 10px;
  background-color: aliceblue;
  position: relative;
  .tree_tool {
    height: 45px;
    input{
      width: 100%;
    }
  }
  .tree_item {
    height: calc(100% - 46px);
    overflow: auto;
  }
  .tree_icon {
    z-index: 10;
    font-size: 30px;
    position: absolute;
    top: 50%;
    right: -20px;
    cursor: pointer;
    &:hover{
      // color: @hoverColor;
    }
  }
}
</style>