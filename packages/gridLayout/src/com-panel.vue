<template>
  <div class="com_panel">
    <div class="header">物料中心</div>
    <p class="com_type">基础布局</p>
    <!-- {{row}} -->
    <ul class="list_main">
      <draggable
        v-model="row"
        :group="{name: 'site',pull:'clone'}"
        @end="onRowEnd"
        @clone="cloneEvent"
        :move="onRowMove"
        :scroll="true"
        animation="100"
      >
        <li class="list_item" v-for="(item,index) in  row" :key="index">
          <span>布局容器</span>
        </li>
      </draggable>
    </ul>

    <p class="com_type">组件</p>
    <ul class="list_main">
      <draggable
        v-model="nodes"
        :group="{name: 'site',pull:'clone'}"
        @end="onEnd"
        :move="onMove"
        :scroll="true"
        animation="100"
      >
        <li class="list_item" v-for="(item,index) in  nodes" :key="index">
          <span>{{item.name}}</span>
        </li>
      </draggable>
    </ul>
  </div>
</template>

<script>
import draggable from "vuedraggable";
export default {
  data() {
    return {
      row: [
         {
          name: "row",
          type: "layout",
        },
      ],
      nodes: this.componentArr,
      draggedContext: null,
      relatedContext: null,
    };
  },
  props: {
    componentArr: {
      type: Array,
    },
  },
  components: {
    draggable,
  },
  watch: {
    // eslint-disable-next-line no-unused-vars
    componentArr: function (val, oldval) {
      this.nodes = val;
    },
  },
  methods: {
    onRowEnd(e) {
      console.log(e);
    },
    onRowMove(e) {
      // console.log(e.draggedContext);
      // console.log(e.relatedContext);
      this.draggedContext = e.draggedContext;
      this.relatedContext = e.relatedContext;
      // return false;
    },
    cloneEvent(e){
      console.log(e);
    },
    onEnd(e) {
      console.log(e);
    },
    onMove(e) {
      // console.log(e.draggedContext);
      // console.log(e.relatedContext);
      this.draggedContext = e.draggedContext;
      this.relatedContext = e.relatedContext;
    },
  },
};
</script>
<style lang='less'>
.com_panel {
  .header {
    position: relative;
    line-height: 36px;
    white-space: nowrap;
    box-sizing: border-box;
    text-align: center;
    border-bottom: 1px solid #e9e9e9;
    background: #fff;
    overflow: hidden;
  }
  .com_type {
    padding: 0 18px 0 10px;
  }
  .list_main {
    list-style: none;
    .list_item {
      position: relative;
      height: 28px;
      line-height: 28px;
      padding: 0 18px 0 16px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      cursor: pointer;

      &:hover {
        color: crimson;
      }
    }
  }
}
</style>