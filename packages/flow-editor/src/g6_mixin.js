import G6 from "@antv/g6";
import {
    nodeBasicMethod
} from "./g6_config";
import event_mixin from "./g6_config/event";
import {
    config
} from './g6_config/styleConfig';
import Bus from './bus/index'
const mixins = {
    data() {
        return {

        }
    },
    props: {
        mode: {
            type: String,
            default: 'dev'
        }
    },
    mixins: [event_mixin],
    methods: {
        // 关系图
        initG6() {
            var that = this;
            that.resgistEvent();
            const grid = new G6.Grid();
            // const minimap = new G6.Minimap();
            const width = document.getElementById("mountNode").scrollWidth;
            const height = document.getElementById("mountNode").scrollHeight - 20 || 500;
            that.graph = new G6.Graph({
                container: "mountNode",
                width,
                height,
                modes: {
                    default: [
                        "drag-node",
                        "zoom-canvas",
                        "drag-canvas",
                        "click-add-edge",
                        {
                            type: "tooltip",
                            formatText: function formatText(model) {
                                if (!model) {
                                    return
                                }
                                var text = `数据源: 
                                ${model.dataSourceName}
                                <div></div>
                                数据库: 
                                ${model.dataDbName}`;
                                if (model.targeTable) {
                                    text += ` <div></div>关联表: ${model.targeTable}`;
                                }
                                return text;
                            },
                            offset: 60
                        }
                    ],
                },
                defaultNode: {
                    size: config.size,
                    style: {
                        fill: config.bgColor,
                        stroke: config.borderColor,
                        lineWidth: 1,
                        radius: 3,
                    },
                    labelCfg: {
                        offset: 20,
                        style: {
                            fontSize: 10,
                            fill: config.fontColor,
                            cursor: "pointer"
                        },
                    },
                },
                defaultEdge: {
                    size: 4,
                    type: "polyline",
                    color: "#e2e2e2",
                    style: {
                        radius: 10,
                        offset: 30,
                        cursor: "pointer",
                        endArrow: true,
                        stroke: '#F6BD16',
                        lineWidth: 1
                    },
                },
                plugins: [grid],
            });
            // 注册节点
            that.registerCustomNode();
            const canvas = that.graph.get("canvas");
            canvas.set("localRefresh", false);
            that.graph.data(that.nodeData);
            that.graph.render();
            that.addG6Event()
            Bus.$emit("afterG6Render", {
                graph: this.graph
            }) //把当前G6实例广播出去
        },
        registerCustomNode() {
            var that = this;
            G6.registerNode("card-node1", {
                draw: (cfg, group) => {
                    const container = nodeBasicMethod.createNodeBox(group, cfg.dataTableName);
                    nodeBasicMethod.createNodeMarker(group);
                    return container;
                },
                afterDraw(cfg, group) {
                    nodeBasicMethod.afterDraw(cfg, group, that.mode)
                }
            });

        },
    },
    mounted() {
        this.initG6();
    },
}
export default mixins;