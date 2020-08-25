<template>
  <div class="content_view">
    <curdLayout
      :tableOptions="tableOptions"
      @on-change="getInputParams"
      @on-select-change="selectOption"
    >
      <template v-slot:tool>
        <!-- <Button type="success">新增</Button> -->
      </template>
      <template v-slot:pannel>
        <!-- <Button type="primary" ghost shape="circle" icon="ios-build">公式配置</Button> -->
      </template>
      <template v-slot:operation="Props">
        <Button type="primary" size="small" icon="ios-barcode-outline" @click="getRow(Props,1,2)">曲线</Button>
        <Button
          style="margin-left: 8px;"
          icon="ios-trending-up"
          type="default"
          size="small"
          @click="getRow(Props,2,2)"
        >结果</Button>
      </template>
    </curdLayout>
  </div>
</template>

<script>
const tableOptions = {
  pageSize: 20,
  showPanelTool: true,
  dataUrl: "",
  isCurd: false,
  param: {},
  columns: [
    {
      type: "expand",
      width: 50,
      render: (h, params) => {
        return h(
          "span",
          {
            props: {
              row: params.row,
            },
          },
          params.row.formulaString
        );
      },
    },
    { key: "index", title: "序号", width: 70, align: "center" },
    { key: "objId", title: "母线ID", align: "center", width: 180 },
    { key: "formulaName", title: "母线名称", align: "center", width: 220 },
    { key: "voltAgeName", title: "电压等级", align: "center", width: 120 },
    // { key: "formulaId", title: "公式ID", align: "center" },
    // { key: "formulaName", title: "公式名称", align: "center" },
    { key: "startStName", title: "所属厂站", align: "center" },
    // { key: "formulaString", title: "分量", align: "center" },
    { title: "操作", slot: "operation", width: 180, align: "center" },
  ],
  searchDynamic: [
    { name: "busName", label: "母线名称", type: "text" },
    { name: "stName", label: "厂站名称", type: "text" },
    // { name: "time", label: "日期", type: "date", format: "yyyy-MM-dd" }
    {
      name: "code",
      label: "电压等级",
      type: "select",
      options: [],
    },
  ],
};
export default {
  data() {
    return {
      tableOptions,
    };
  },
  methods: {
    getInputParams(params) {
      console.log(params);
    },
    getRow(data, type, device) {
      this.$emit("on-operation", { type, data, device });
    },
    selectOption({ nodeArr, item }) {
      console.log(nodeArr);
      console.log(item);
      this.tableOptions.param.id = 1;
    },
  },
  created() {},
};
</script>
<style lang='less'>
</style>