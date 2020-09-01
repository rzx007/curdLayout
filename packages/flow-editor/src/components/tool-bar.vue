<template>
  <div class="g6_tool_bar">
    <div class="tool">
      <Icon type="ios-undo" size="16" title="撤销" />
      <Icon type="ios-refresh-circle" size="16" title="重置" />
      <Icon type="ios-color-filter" size="16" title="节点拖拽" />
      <Icon type="md-git-compare" size="16" title="关系连接" />
    </div>
    <div class="tool">
      <Tooltip max-width="290">
        <Icon type="ios-alert" size="16" />
        <div slot="content">
          <p>1.拖拽左侧树列表表名，添加关系节点，第一个节点为关联表</p>
          <p>2.双击节点维护字段</p>
        </div>
      </Tooltip>
    </div>
    <div class="tool">
      <!-- <Button type="info" size="small" @click="saveTheme">保存</Button> -->
    </div>
  </div>
</template>

<script>
import Bus from "../bus/index";
export default {
  data() {
    return {
      graph: {},
      nodeData: {
        nodes: [],
        edges: [],
      },
      nodesArr: [],
      delId: "",
    };
  },
  methods: {
    // 设置行为
    selectedMode() {
      this.graph.setMode(this.model);
    },
    // 节点右键菜单
    nodeEvnt() {
      var that = this;
      that.graph.on("node:contextmenu", function (evt) {
        const contextMenu = document.getElementById("contextMenu");
        evt.preventDefault();
        that.context = true;
        evt.stopPropagation();
        contextMenu.style.left = `${evt.x + 50}px`;
        contextMenu.style.top = `${evt.y}px`;
        that.delId = evt.item._cfg.model.id;
        // console.log(that.delId);
      });
      // that.graph.on("node:dblclick", function(evt) {});
    },
    // 撤销操作
    undoEvent() {
      // 保持nodeDate数据与图中数据一致
      this.nodeData = this.graph.save();
      if (this.nodeData.nodes.length < 1) {
        return;
      }
      var undoNode = this.nodeData.nodes.pop();
      this.nodeData.edges.pop();
      // 同时删除已关联得字段
      if (this.nodesArr.length > 0) {
        // 撤销到只有关联变一个节点时，跳过逻辑
        for (let index = 0; index < this.nodesArr.length; index++) {
          const element = this.nodesArr[index];
          if (element.etableId == undoNode.id) {
            this.nodesArr.splice(index, 1);
          }
        }
      }
      const souereItem = this.graph.findById(undoNode.id);
      this.graph.removeItem(souereItem);
    },
    // 删除节点
    delNode() {
      const souereItem = this.graph.findById(this.delId);
      this.graph.removeItem(souereItem);
      for (let index = 0; index < this.nodesArr.length; index++) {
        const element = this.nodesArr[index];
        if (element.stableId == this.delId || element.etableId == this.delId) {
          this.nodesArr.splice(index, 1);
          index--;
        }
      }
      // 保持nodeDate数据与图中数据一致
      this.nodeData = this.graph.save();
      this.context = false;
      this.graph.refresh(); //更新G6
    },
    reset() {
      this.graph.clear();
      this.nodesArr = [];
      this.context = false;
      this.nodeData = [];
    },
    bindEvent() {
      Bus.$on("afterG6Render", (obj) => {
        this.graph = obj.graph;
      });
    },
  },
  created() {
    this.bindEvent();
  },
};
</script>
<style lang='less'>
</style>