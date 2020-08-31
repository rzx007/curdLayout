<template>
  <div class="container-fluid">
    <link
      rel="stylesheet"
      href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
      integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
      crossorigin="anonymous"
    />
    <grid-container
      :layout.sync="layout"
      :cellSize="cellSize"
      :maxColumnCount="maxColumnCount"
      :maxRowCount="maxRowCount"
      :margin="margin"
      :bubbleUp="bubbleUp"
      :isEditable="isEditable"
    >
      <grid-box   @resizeEnd="event" boxId="settings" dragSelector="div.card-header">
        <div class="card demo-box">
          <div class="card-header">Settings</div>
          <div class="card-body">
            <div class="form-group row">
              <label for="settings-margin-input" class="col-sm-4 col-form-label">Margin</label>
              <div class="col-sm-8">
                <input
                  class="form-control"
                  type="number"
                  v-model.number="margin"
                  id="settings-margin-input"
                />
              </div>
            </div>
            <div class="form-group row">
              <label for="settings-grid-size-w-input" class="col-sm-4 col-form-label">Cell Size</label>
              <div class="col-sm-4">
                <input
                  class="form-control"
                  type="number"
                  v-model.number="cellSize.w"
                  id="settings-grid-size-w-input"
                />
              </div>
              <div class="col-sm-4">
                <input class="form-control" type="number" v-model.number="cellSize.h" />
              </div>
            </div>
            <div class="form-group row">
              <label for="settings-bubble-up-input" class="col-sm-4 col-form-label">Bubble Up</label>
              <div class="col-sm-8">
                <input type="checkbox" v-model="bubbleUp" id="settings-bubble-up-input" />
              </div>
            </div>
            <button class="btn btn-success" @click="boxCount++">Add Box</button>
            <button class="btn btn-danger" @click="boxCount = Math.max(0, boxCount-1)">Remove Box</button>
          </div>
        </div>
      </grid-box>
      <grid-box
        v-for="(item,index) in boxContainer"
        :boxId="item.id"
        :key="index"
        :resizeVisible="true"
        @resizeEnd="event"
        ref="boxs"
      >
        <div class="box-mian">
          <div class="box-tool" v-if="isEditable"></div>
          <dynamic-component
            :componentName="item.componentName"
            :isEdited="isEditable"
            :key="index"
          ></dynamic-component>
        </div>
      </grid-box>
    </grid-container>
  </div>
</template>

<style>
.demo-box {
  width: 100%;
  height: 100%;
}
</style>

<script>
export default {
  data() {
    return {
      cellSize: {
        w: 205, // 174
        h: 120,
      },
      maxColumnCount: 10,
      maxRowCount: Infinity,
      bubbleUp: true,
      margin: 25,
      boxCount: 5,
      isEditable: true,
      layout: [
        //Box的布局位置
        {
          id: "settings",
          hidden: false,
          pinned: false,
          position: {
            x: 0,
            y: 0,
            w: 4,
            h: 4,
          },
        },
      ],
      // Box组件的组件信息
      boxContainer: [{ id: 0, componentName: "lineBar" }],
    };
  },

  computed: {
    layoutWithoutSettings() {
      return this.layout.filter((box) => {
        return box.id !== "settings";
      });
    },
  },

  methods: {
    onLayoutUpdate(evt) {
      this.layout = evt.layout;
    },
    event(event) {
      console.log(event);
    },
  },
  watch: {
    // eslint-disable-next-line no-unused-vars
    layout: function (val, oldVal) {
      console.log(val);
    },
  },
  mounted() {
    console.log(this.$refs.boxs);
  },
};
</script>
<style lang="scss">
.box-mian {
  height: 100%;
  .box-tool {
    background-color: burlywood;
    border-radius: 4px;
    height: 32px;
  }
}
</style>
