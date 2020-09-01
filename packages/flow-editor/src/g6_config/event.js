import G6 from "@antv/g6";
const mixin = {
    methods: {
        resgistEvent() {
            var that = this;
            let addedCount = 0;
            var sourceId = "";
            G6.registerBehavior("click-add-node", {
                getEvents() {
                    return {
                        "canvas:click": "onClick"
                    };
                },
                // Click event
                onClick(ev) {
                    const self = this;
                    const graph = self.graph;
                    // Add a new node
                    graph.addItem("node", {
                        label: `表-${addedCount}`,
                        description: "描述信息，如果没有该字段则不展示",
                        x: ev.canvasX,
                        y: ev.canvasY,
                        id: `node-${addedCount}` // Generate the unique id
                    });
                    addedCount++;
                    console.log(self.graph.save());
                    that.nodeData = self.graph.save();
                }
            });
            G6.registerBehavior("click-add-edge", {
                getEvents() {
                    return {
                        "node:click": "onClick",
                        mousemove: "onMousemove",
                        "edge:click": "onEdgeClick"
                    };
                },
                onClick(ev) {
                    const self = this;
                    const node = ev.item;
                    const graph = self.graph;
                    const model = node.getModel();
                    console.log(model);
                    // console.log(ev.item._cfg.model);
                    if (self.addingEdge && self.edge) {
                        let targetId = model.id;
                        console.log("寻找目标结束");
                        if (sourceId == targetId) {
                            return
                        }
                        graph.updateItem(self.edge, {
                            target: targetId
                        });
                        self.edge = null;
                        self.addingEdge = false;
                    } else {
                        console.log("寻找目标");
                        sourceId = model.id;
                        self.edge = graph.addItem("edge", {
                            source: sourceId,
                            target: sourceId
                        });
                        self.addingEdge = true;
                    }
                },
                onMousemove(ev) {
                    const self = this;
                    // The current position the mouse clicks
                    const point = {
                        x: ev.x,
                        y: ev.y
                    };
                    if (self.addingEdge && self.edge) {
                        self.graph.updateItem(self.edge, {
                            target: point
                        });
                    }
                },
                onEdgeClick(ev) {
                    // 关联是，点击边取消
                    const self = this;
                    const currentEdge = ev.item;
                    if (self.addingEdge && self.edge === currentEdge) {
                        self.graph.removeItem(self.edge);
                        self.edge = null;
                        self.addingEdge = false;
                    }
                }
            });
        },
        addG6Event() {
            var that = this;
            if (that.mode === 'dev') {
                // 较好hover效果
                that.graph.on("node:mouseenter", evt => {
                    const item = evt.item;
                    const node = item._cfg.model;
                    that.graph.updateItem(item, {
                        style: {
                            cursor: 'move',
                        },
                        linkPoints: {
                            top: true,
                            bottom: true,
                            left: true,
                            right: true,
                            size: 8,
                            fill: '#fff',
                        },
                    })
                    const po = that.graph.findById(node.id)
                    console.log(po);
                    //    console.log( po.getLinkPoints());
                    that.graph.setItemState(item, "hover", true);
                });
                that.graph.on("node:mouseleave", evt => {
                    const item = evt.item;
                    that.graph.updateItem(item, {
                        linkPoints: {
                            top: false,
                            bottom: false,
                            left: false,
                            right: false,
                            size: 8,
                            fill: '#fff',
                        },
                    })
                    that.graph.setItemState(item, "hover", false);
                });
            }

        }
    },
}
export default mixin;