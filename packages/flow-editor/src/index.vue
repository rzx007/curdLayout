/* eslint-disable no-unused-vars */
<template>
  <div class="flow-wrap">
    <div class="tool_bar">
      <toolBar />
    </div>
    <div class="g6_content">
      <div class="node_panel">
        <itemPanel />
        <miniMap />
      </div>
      <div class="container">
        <Flow />
      </div>
      <div class="editor_content">
        <modelDetail />
      </div>
    </div>
  </div>
</template>

<script>
import Flow from "./components/flow";
import itemPanel from "./components/item-panel";
import miniMap from "./components/mini-map";
import toolBar from "./components/tool-bar";
import modelDetail from "./components/model-detail.vue";
export default {
  name: "FlowEditor",
  data() {
    return {};
  },
  components: { Flow, itemPanel, miniMap, toolBar, modelDetail },
};
</script>
<style lang='less'>
.g6_tool_bar {
  // box-shadow: 5px 5px 5px -4px rgba(199, 197, 193, 0.6);
  line-height: 26px;
  box-sizing: border-box;
  padding: 6px 10px;
  display: flex;
  align-items: center;
  background-color: #fbfbfa;
  border: 1px solid #e9e9e9;
  box-shadow: 0px 8px 12px 0px rgba(0, 52, 107, 0.04);
  .tool {
    border-right: 1px solid #d6d6d6;
    margin-right: 18px;
  }
  i {
    font-size: 14px;
    margin-right: 18px;
    cursor: pointer;
    &:hover {
      color: #686869;
    }
  }
}
.g6_content {
  display: flex;
  justify-content: space-between;
  z-index: 2;
  .g6_title {
    background-color: #d9dbdc;
    box-sizing: border-box;
    padding: 0 6px;
    line-height: 30px;
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.2) !important;
  }
  .node_panel {
    width: 250px;
    background-color: #f7f9fb;
    border-right: 1px solid #e6e9ed;
  }
  .container {
    flex: 1;
    height: calc(100vh - 100px) !important;
    position: relative;
    overflow: auto;
    background-color: #fff;
    z-index: 2;
  }
  .editor_content {
    width: 250px;
    background-color: #f7f9fb;
    overflow: auto;
    // padding: 0 10px;
    border-left: 1px solid #e6e9ed;
    position: relative;
  }
}
</style>