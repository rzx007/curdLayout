/* eslint-disable no-unused-vars */
<template>
  <div class="main">
    <div class="main-canvas">
      <div class="g6_content">
        <div id="mountNode" class="container">
          <ul id="contextMenu" v-show="context">
            <li @click="delNode()">删除节点</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import g6_mixin from "../g6_mixin";
export default {
  name: "FlowEditor",
  data() {
    return {
      graph: {},
      model: "default",
      nodeData: {
        nodes: [],
        edges: [],
      },
      context: false,
     
    };
  },
  mixins: [g6_mixin],
  methods: {
    // 保存关系
  },
  created() {},
  mounted() {
  },
};
</script>
<style lang='less'>
</style>