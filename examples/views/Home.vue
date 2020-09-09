<template>
  <div class="content_view">
    <elCurdLayout
      :tableOptions="tableOptions"
      :fromOptions="fromOptions"
    >
      <template v-slot:tool>
        <!-- <Button type="success">新增</Button> -->
      </template>
      <template v-slot:pannel>
        <!-- <Button type="primary" ghost shape="circle" icon="ios-build">公式配置</Button> -->
      </template>
     
    </elCurdLayout>
  </div>
</template>

<script>
const tableOptions = {
  pageSize: 20,
  showPanelTool: true,
  params: {},
  dataUrl: "/data-project-management-service/project/getProject",
  columns: [
    { type: "index", label: "序号", align: "center", width: 80 },
    { label: "采集点名称", align: "center", prop: "creator" },
    { label: "电表名称", align: "center", prop: "userId" },
    { label: "用户名称", align: "center", prop: "userId" },
    { label: "三相电流电压", prop: "proflies", align: "center" },
    { label: "有功功率无功", prop: "proflies", align: "center" },
    { label: "功率功率因数", prop: "proflies", align: "center" },
  ],
};
const fromOptions = [
  { name: "userName", label: "采集点名称", type: "text" },
  { name: "userId", label: "电表名称", type: "text" },
  {
    name: "occurTime",
    label: "日期",
    span: 6,
    type: "date",
    format: "YYYY-MM-DD",
  },
];
export default {
  data() {
    return {
     tableOptions, fromOptions
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