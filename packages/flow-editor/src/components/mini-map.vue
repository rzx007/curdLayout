<template>
  <div id="navigator">
    <div class="pannel-title">导航器</div>
    <div id="minimap" class="minimap" ref="minimap"></div>
    <!-- <div id="zoom-slider">
      <a class="zoom-dropdown-btn ant-dropdown-trigger" href="#">
        100 %
        <i class="anticon anticon-down"></i>
      </a>
    </div>-->
  </div>
</template>

<script>
import G6 from "@antv/g6";
import Bus from "../bus/index";
export default {
  data() {
    return {
      minimap: {},
      graph: {},
    };
  },
  created() {
    this.bindEvent();
  },
  mounted() {
    this.initMinmap();
    this.$nextTick(() => {
      this.initMinmap();
    });
  },
  methods: {
    initMinmap() {
      const cfgs = {
          container:document.getElementById('minimap'),
          className:'minimap',
          size:[250,180]
      };
      this.minimap = new G6.Minimap({ ...cfgs });
    },
    bindEvent() {
      Bus.$on("afterG6Render", (page) => {
        this.graph = page.graph;
        this.addMIniMap();
      });
    },
    addMIniMap() {
      if (!this.minimap || !this.graph) {
        return;
      }
      this.graph.addPlugin(this.minimap);
    },
  },
};
</script>

<style >
#navigator {
  width: 250px;
  height: 306px;

  z-index: 3;
}
.pannel-title {
  height: 32px;
  border-top: 1px solid #dce3e8;
  border-bottom: 1px solid #dce3e8;
  background: #ebeef2;
  color: #000;
  line-height: 28px;
  padding-left: 12px;
}
.g6-minimap-container {
  border: 1px solid #e2e2e2;
}
.g6-minimap-viewport {
  border: 2px solid rgb(25, 128, 255);
}
</style>
