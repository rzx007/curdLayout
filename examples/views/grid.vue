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
    >
      <grid-box boxId="settings" dragSelector="div.card-header">
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
        v-for="number in boxCount"
        :boxId="number"
        :key="number"
        dragSelector="div.card-header"
        :resizeVisible="true"
        @resizeEnd="event"
      >
        <div class="card demo-box">
          <div class="card-header">Box {{ number }}</div>
          <dynamic-component componentName="line-bar"></dynamic-component>
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
        w: 200,
        h: 120,
      },
      maxColumnCount: 10,
      maxRowCount: Infinity,
      bubbleUp: true,
      margin: 5,
      boxCount: 4,
      layout: [
        {
          id: "settings",
          hidden: false,
          pinned: true,
          position: {
            x: 0,
            y: 0,
            w: 4,
            h: 4,
          },
        },
        {
          id: 1,
          hidden: false,
          pinned: false,
          position: {
            x: 4,
            y: 0,
            w: 4,
            h: 3,
          },
        },
        {
          id: 2,
          hidden: false,
          pinned: false,
          position: {
            x: 4,
            y: 3,
            w: 4,
            h: 3,
          },
        },
        {
          id: 3,
          hidden: false,
          pinned: false,
          position: {
            x: 0,
            y: 4,
            w: 4,
            h: 3,
          },
        },
        {
          id: 4,
          hidden: false,
          pinned: false,
          position: {
            x: 4,
            y: 6,
            w: 4,
            h: 3,
          },
        },
      ],
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
};
</script>
