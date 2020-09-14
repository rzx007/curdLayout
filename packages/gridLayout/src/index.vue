<template>
  <div class="grid_layout">
    <div class="grid_tool" v-if="!disabled"></div>
    <div class="grid_main">
      <div class="grid_panel" v-if="!disabled">
        <comPanel :componentArr="componentArr"></comPanel>
      </div>
      <div class="grid_playground container-fluid" :class="[disabled?'':'grid_line']">
        <playGround v-model="nodeArr" :disabled="disabled"></playGround>
      </div>
      <div class="grid_property" v-if="!disabled">
        <comProperty></comProperty>
      </div>
    </div>
  </div>
</template>

<script>
import comPanel from "./com-panel";
import playGround from "./play-ground";
import comProperty from "./com_property";
const init = [
  {
    type: "row",
    id: (new Date().getTime() + Math.random() * 10).toString(),
    children: [],
  },
];
export default {
  name: "gridLayout",
  data() {
    return {
      nodeArr: this.value.length > 0 ? this.value : init,
    };
  },
  props: {
    value: {
      type: Array,
    },
    componentArr: {
      type: Array,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  components: { playGround, comPanel, comProperty },
  watch: {
    nodeArr: {
      handler: function (val) {
        console.log(val);
        this.$emit("input", val);
      },
      deep: true,
    },
  },
};
</script>
<style lang='less'>
.grid_layout {
  width: 100%;
  overflow-y: auto;
  background-color: #fff;
  // border: 1px solid #e9e9e9;
  .grid_tool {
    height: 38px;
    box-sizing: border-box;
    border-bottom: 1px solid #e9e9e9;
    background-color: #f7f9fb;
  }
  .grid_main {
    display: flex;
    .grid_panel {
      width: 200px;
      background-color: #f7f9fb;
      border-right: 1px solid #e6e9ed;
    }
    .grid_playground {
      flex: 1;
      min-height: 70vh;
    }
    .grid_property {
      width: 200px;
      background-color: #f7f9fb;
      border-left: 1px solid #e6e9ed;
    }
  }
  .grid_line {
    background-image: repeating-linear-gradient(
        0deg,
        rgba(0, 0, 0, 0.05),
        rgba(0, 0, 0, 0.05) 1px,
        transparent 1px,
        transparent 20px
      ),
      repeating-linear-gradient(
        -90deg,
        rgba(0, 0, 0, 0.05),
        rgba(0, 0, 0, 0.05) 1px,
        transparent 1px,
        transparent 20px
      );
    background-size: 10px 10px;
    background-position: 1px 1px;
  }
}
</style>
