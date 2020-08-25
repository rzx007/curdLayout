<template>
  <div>
    <div class="chart-list">
      <h5 class="chart-title">
        {{name}}
        <Icon type="ios-alert-outline" class="chart-icon" />
        <DatePicker
          :value="date"
          :format="format"
          :type="dataType"
          placeholder="选择日期"
          style="width: 200px"
          size="small"
          @on-change="changeGetData"
        ></DatePicker>
      </h5>
      <div :id="randomClass" class="chart-item"></div>
    </div>
  </div>
</template>

<script>
// 按需映入
// 引入 ECharts 主模块
import echarts from "echarts/lib/echarts"
// 引入柱状图
import "echarts/lib/chart/line";
// 引入提示框和标题组件
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
export default {
  name: "LineBar",
  data() {
    return {
      randomClass: "chart" + Math.random(),
      format: "yyyy-MM-dd",
      date: "2020-08-24",
      charts: {},
      apiName: "",
      isDialogTable: false,
      isDialogWarning: false,
      detailDate: "",
      warningDate: "",
    };
  },
  props: {
    name: {
      type: String,
      default: "",
    },
    options: {
      type: Object,
      default: function () {
        return { legend: [] };
      },
    },
    dataType: {
      type: String,
      default: "date",
    },
  },
  methods: {
    getData() {},
    getCharts() {
      var that = this;
      that.chart = echarts.init(document.getElementById(that.randomClass));
      var option = {
        tooltip: {
          trigger: "axis",
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "7%",
          top: "7%",
          containLabel: true,
        },
        xAxis: {
          axisLabel: {
            textStyle: {
              fontSize: 15,
            },
          },
          type: "category",
          boundaryGap: false,
          nameTextStyle: { fontSize: 20 },
          nameGap: 26,
          nameLocation: "middle",
           data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {
          axisLabel: {
            textStyle: {
              fontSize: 15,
            },
          },
          type: "value",
          nameTextStyle: { fontSize: 20 },
          min: 0,
        },
        series: [
          {
            name: "",
            type: "line",
            smooth: true,
            symbol: "star",
            symbolSize: 8,
            // markPoint: {
            //   symbolSize: 80,
            //   data: [{ type: "min", name: "最小值" }],
            //   itemStyle: {
            //     normal: {
            //       label: {
            //         show: true,
            //         fontSize: 15
            //       }
            //     }
            //   }
            // },
            data: [5, 20, 36, 10, 10, 20]
          },
        ],
      };
      that.chart.setOption(option);
      that.chart.on("click", function (params) {
        if (that.name != "异常告警") {
          that.isDialogTable = true;
          // that.$emit("clickEvent", {
          //   typeName: params.name,
          //   date: that.date
          // });
          that.detailDate = params.name;
          console.log(params);
        } else {
          that.isDialogWarning = true;
          that.warningDate = params.name;
        }
      });
      window.addEventListener(
        "resize",
        function () {
          that.chart.resize();
        },
        false
      );
    },
    changeGetData(data) {
      this.date = data;
      this.getData();
    },
  },
  created() {
    switch (this.dataType) {
      case "date":
        this.format = "yyyy-MM-dd";
        this.date = "2020-08-24";
        break;
      case "month":
        this.format = "yyyy-MM";
        this.date = "2020-08";
        break;
      case "year":
        this.format = "yyyy";
        this.date = "2020";
        break;
      default:
        break;
    }
  },
  beforeMount() {
    this.getData();
  },
  mounted() {
    this.getCharts();
  },
};
</script>
<style lang='less'>
.chart-list {
  background-color: #f4f4ff;
  box-sizing: border-box;
  border-radius: 4px;
  padding: 16px;
  position: relative;
  margin-bottom: 18px;
  .chart-icon {
    cursor: pointer;
  }
  .chart-title {
    text-align: start;
    font-size: 14px;
  }
  .chart-item {
    height: 220px;
    width: 100%;
  }
}
</style>