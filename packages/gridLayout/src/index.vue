<template>
  <div class="grid_layout">
    <div class="grid_tool"></div>
    <div class="grid_main">
      <div class="grid_panel"></div>
      <div class="grid_playground">
        <playGround></playGround>
      </div>
      <div class="grid_property"></div>
    </div>
  </div>
</template>

<script>
import playGround from "./play-ground";
export default {
  name: "gridLayout",
  data() {
    return {};
  },
  components: { playGround },
};
</script>
<style lang='less'>
.grid_layout {
  width: 100%;
  overflow-y: auto;
  background-color: #fff;
  border: 1px solid #e9e9e9;
  .grid_tool {
    height: 38px;
    box-sizing: border-box;
    border-bottom: 1px solid #e9e9e9;
    background-color: #f7f9fb;
  }
  .grid_main {
    display: flex;
    height: 100vh;
    .grid_panel {
      width: 200px;
      background-color: #f7f9fb;
      border-right: 1px solid #e6e9ed;
    }
    .grid_playground {
      flex: 1;
      height: 100%;
    }
    .grid_property {
      width: 200px;
      background-color: #f7f9fb;
      border-left: 1px solid #e6e9ed;
    }
  }
}
</style>