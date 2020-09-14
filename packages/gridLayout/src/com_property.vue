<template>
  <div class="com_property">
    <div class="header">基础折线图</div>
    <!-- {{node}} -->
    <ul class="props_list">
      <li class="list_item">
        <div class="item">
          <span>尺寸</span>
          <input type="number" v-model="node.size" />
        </div>
      </li>
      <li class="list_item">
        <div class="item">
          <span>标题</span>
          <input type="text" v-model="prop.title" />
        </div>
      </li>
      <li class="list_item">
        <div class="item">
          <span>高度</span>
          <input type="number" v-model="prop.height" />
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import bus from "../../bus/index";
export default {
  data() {
    return {
      width: 6,
      node: {
        size: null,
        title: "",
      },
      prop: {
        title: "",
      },
    };
  },
  props: {
    nodeProps: {
      type: Object,
    },
  },
  watch: {
    nodeProps: function (val) {
      this.node = val;
    },
  },
  mounted() {
    bus.$on("choose", (msg) => {
      console.log(msg);
      this.node = msg;
      this.prop = msg.props ? msg.props : "";
    });
  },
};
</script>
<style lang='less'>
.com_property {
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
  .props_list {
    list-style: none;
    .list_item {
      box-sizing: border-box;
      padding: 6px;
      .item {
        display: flex;
        span {
          display: inline-block;
          min-width: 36px;
        }
        input {
          max-width: 120px;
          text-align: center;
        }
      }
    }
  }
}
</style>