<template>
  <div class="node_panel">
    <div class="g6_title">数据源列表</div>
    <List header="Header" footer="Footer" border size="small">
      <ListItem
        :draggable="draggable"
        v-for="(item,index) in defaultNode"
        :key="index"
        @dragstart.native="handleDragStart(item)"
        @dragend.native="handleDrop()"
      >{{item}}</ListItem>
    </List>
  </div>
</template>

<script>
import Bus from "../bus/index";
import { defaultNode } from "../g6_config/styleConfig";
export default {
  data() {
    return {
      draggable: true,
      nodeType: "circle",
      defaultNode: defaultNode,
      graph: {},
      addedCount: 0,
    };
  },
  methods: {
    handleDragStart(data) {
      // eslint-disable-next-line no-unused-vars
      const event = window.event || arguments[0];
      this.nodeType = data;
    },
    handleDrop() {
      const event = window.event || arguments[0];
      this.addedCount++;
      const obj = {
        isRoot: false,
        x: event.offsetX,
        y: event.offsetY,
        type: this.nodeType,
        label: "test_label",
        description: `描述`,
        id: `node-${this.addedCount}`, // Generate the unique id
        isRela: false,
        stateStyles: {
          //  graph.setItemState(item, 'hover', true);
          hover: {
            fill: "#d3adf7",
          },
        },
      };
      this.addNode(obj);
    },
    allowDrop() {
      const event = window.event || arguments[0];
      event.preventDefault();
    },
    addNode(node) {
      if (this.graph) {
        this.graph.addItem("node", node);
      }
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