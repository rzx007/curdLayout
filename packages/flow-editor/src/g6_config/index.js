import {config} from './styleConfig';

// 节点样式配置
export const nodeBasicMethod = {
    createNodeBox: (group, text) => {
        /* 最外面的大矩形 */
        const container = group.addShape("rect", {
            attrs: {
                x: 0,
                y: 0,
                width: config.width,
                heigh: config.height
            },
            name: "big-rect-type",
            draggable: true
        });
        group.addShape("rect", {
            attrs: {
                x: 0,
                y: 0,
                width: config.width,
                height: config.height,
                fill: config.bgColor,
                stroke: config.borderColor,
                radius: 3,
                cursor: "pointer",
                lineWidth: 1,
            },
            name: "rect-type",
            draggable: true
        });
        group.addShape("text", {
            attrs: {
                x: 35,
                y: 20,
                text: text,
                fontSize: 10,
                fontWeight: 100,
                textAlign: "center",
                textBaseline: "middle",
                fill: config.fontColor,
                cursor: "pointer"
            },
            name: "name-text-type"
        });
        return container;
    },
    /* 加号节点*/
    createNodeMarker: (group) => {
        const marker = group.addShape('circle', {
            attrs: {
                x: 0,
                y: 0,
                r: 4,
                fill: config.bgColor,
                stroke: config.borderColor,
                cursor: "pointer",
                lineWidth: 1,
                opacity: 0,
            },
            name: "circle-point"
        })
        marker.set("className", "collapse-icon");

    },
    afterDraw: (cfg, group, mode) => {
        /* 操作 marker 的背景色显示隐藏 */
        const react = group.find(
            element => element.get("name") === "rect-type"
        );
        if (react && mode == 'dev') {
            const point = group.find(
                element => element.get("name") === "circle-point"
            );
            const onMouseEnter = () => {
                point.attr("opacity", 1)
            }
            const onMouseLeave = () => {
                point.attr("opacity", 0)
            }
            react.on("mouseenter", () => {
                console.log('moving');
                onMouseEnter()

            });
            react.on("mouseleave", () => {
                console.log('moving');
                onMouseLeave()
            });
            point.on("mouseenter", () => {
                console.log('moving');
                onMouseEnter()

            });
            point.on("mouseleave", () => {
                console.log('moving');
                onMouseLeave()
            });
        }

    }
};

export const getNodeConfig = node => {
    let config = {
        basicColor: "#5B8FF9",
        fontColor: "#726a95",
        borderColor: "#1890ff",
        bgColor: "#e7f7fe"
    };
    if (!node.isRela) {
        config = {
            basicColor: "#F5222D",
            fontColor: "#FFF",
            borderColor: "#F5222D",
            bgColor: "#E66A6C"
        };
    }
    return config;
};