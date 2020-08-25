<template>
  <div :class="classes" :style="style" ref="dragHandle">
    <slot></slot>
    <div class="resize-handle" ref="resizeHandle"></div>
  </div>
</template>

<style>
.axe-grid-box {
  position: absolute;
  z-index: 1;
  box-sizing: border-box;
}

.axe-grid-box.dragging,
.axe-grid-box.resizing {
  z-index: 2;
  opacity: 0.7;
}

.axe-grid-box:not(.dragging):not(.resizing) {
  transition: transform ease-out 0.1s, width ease-out 0.1s, height ease-out 0.1s;
}

.axe-grid-box .resize-handle {
  position: absolute;
  right: -5px;
  bottom: -5px;
  width: 10px;
  height: 10px;
  cursor: se-resize;
  border-radius: 50%;
}

@media only screen and (max-width: 1366px) {
  .axe-grid-box .resize-handle {
    width: 60px;
    height: 60px;
    bottom: -10px;
    right: -10px;
  }

  axe-grid-box .resize-handle.resize-visible {
    background-color: rgba(100, 100, 100, 0.1);
  }
}
</style>

<script>
import { List as ContainerList } from "./Container";
import * as utils from "../utils";

export default {
  name: "GridBox",
  props: {
    boxId: {
      required: true,
    },
    dragSelector: {
      type: String,
      default: "*",
    },
    resizeVisible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      container: null,
      dragging: false,
      resizing: false,
    };
  },
  computed: {
    style() {
      if (this.container && this.container.isBoxVisible(this.boxId)) {
        var pixelPosition = this.container.getPixelPositionById(this.boxId);
        return {
          display: "block",
          width: pixelPosition.w + "px",
          height: pixelPosition.h + "px",
          transform: `translate(${pixelPosition.x}px, ${pixelPosition.y}px)`,
        };
      }

      return {
        display: "none",
      };
    },
    classes() {
      return {
        "axe-grid-box": true,
        dragging: this.dragging,
        resizing: this.resizing,
        "resize.visible": this.resizeVisible,
      };
    },
  },
  methods: {
    //   访问父实例
    findContainer() {
      let current = this;
      while (current.$parent) {
        current = current.$parent;
        if (ContainerList.has(current)) {
          return current;
        }
      }
      return null;
    },
  },
  mounted() {
    this.container = this.findContainer();
    if (!this.container) {
      throw new Error("Can not find container");
    }

    // register component on parent
    this.container.registerBox(this);

    // 拖拽移动 moving
    this.$dragHandle = this.$el || this.$refs.dragHandle;

    const startEvent = (evt) => {
      if (!utils.matchesSelector(evt.target, this.dragSelector)) {
        return;
      }

      evt.preventDefault();
      this.dragging = true;
      this.$emit("dragStart");
      //   初始位置
      let positionX = evt.clientX || evt.touches[0].pageX;
      let positionY = evt.clientY || evt.touches[0].pageY;

      const handleEndDrag = (evt) => {
        window.removeEventListener("mouseup", handleEndDrag, true);
        window.removeEventListener("touchend", handleEndDrag, true);
        window.removeEventListener("mousemove", handleMoveDrag, true);
        window.removeEventListener("touchmove", handleMoveDrag, true);

        this.dragging = false;
        // 差值
        var offset = {
          x: (evt.clientX || evt.changedTouches[0].pageX) - positionX,
          y: (evt.clientY || evt.changedTouches[0].pageY) - positionY,
        };
        this.$emit("dragEnd", { offset });
      };

      const handleMoveDrag = (evt) => {
        var offset = {
          x: (evt.clientX || evt.touches[0].pageX) - positionX,
          y: (evt.clientY || evt.touches[0].pageY) - positionY,
        };
        this.$emit("dragUpdate", { offset });
      };

      window.addEventListener("mouseup", handleEndDrag, true);
      window.addEventListener("touchend", handleEndDrag, true);
      window.addEventListener("mousemove", handleMoveDrag, true);
      window.addEventListener("touchmove", handleMoveDrag, true);
    };

    this.$dragHandle.addEventListener("mousedown", startEvent);
    this.$dragHandle.addEventListener("touchstart", startEvent);

    // 拖拽大小 resizing
    this.$resizeHandle = this.$refs.resizeHandle;
    if (this.$resizeHandle) {
      const resizeStart = (evt) => {
        evt.preventDefault();
        evt.stopPropagation();
        this.resizing = true;
        this.$emit("resizeStart");
        // 初始位置
        let positionX = evt.clientX || evt.touches[0].pageX;
        let positionY = evt.clientY || evt.touches[0].pageY;
        // 拖拽时取消鼠标移动事件
        const handleEndResize = (evt) => {
          window.removeEventListener("mouseup", handleEndResize, true);
          window.removeEventListener("touchend", handleEndResize, true);
          window.removeEventListener("mousemove", handleMoveResize, true);
          window.removeEventListener("touchmove", handleMoveResize, true);

          this.resizing = false;
          // 差值
          var offset = {
            x: (evt.clientX || evt.changedTouches[0].pageX) - positionX,
            y: (evt.clientY || evt.changedTouches[0].pageY) - positionY,
          };
          this.$emit("resizeEnd", { offset });
        };

        const handleMoveResize = (evt) => {
          var offset = {
            x: (evt.clientX || evt.touches[0].pageX) - positionX,
            y: (evt.clientY || evt.touches[0].pageY) - positionY,
          };
          this.$emit("resizeUpdate", { offset });
        };

        window.addEventListener("mouseup", handleEndResize, true);
        window.addEventListener("touchend", handleEndResize, true);
        window.addEventListener("mousemove", handleMoveResize, true);
        window.addEventListener("touchmove", handleMoveResize, true);
      };

      this.$resizeHandle.addEventListener("mousedown", resizeStart);
      this.$resizeHandle.addEventListener("touchstart", resizeStart);
    }
  },
  beforeDestroy() {
    // register component on parent
    if (this.container) {
      this.container.unregisterBox(this);
    }
  },
};
</script>
