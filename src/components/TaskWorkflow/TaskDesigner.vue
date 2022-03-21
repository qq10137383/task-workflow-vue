<template>
  <div class="task-designer-wrap">
    <div class="designer-toolbar">
      <task-toolbar />
    </div>
    <div class="designer-canvas" @dragover="dragover" @drop="dropend"></div>
  </div>
</template>

<script>
import { Canvas } from "butterfly-dag/pack";
import Node from "./node";
// import mockData from "./data.js";
import TaskToolbar from "./TaskToolbar";

/**
 * 流程设计器
 */
export default {
  name: "TaskDesigner",
  components: {
    TaskToolbar,
  },
  provide() {
    return {
      designer: this,
    };
  },
  mounted() {
    this.initDesigner();
  },
  methods: {
    initDesigner() {
      const root = this.$el.querySelector(".designer-canvas");
      this.canvas = new Canvas({
        root: root,
        disLinkable: true, // 可删除连线
        linkable: true, // 可连线
        draggable: true, // 可拖动
        zoomable: true, // 可放大
        moveable: true, // 可平移
        theme: {
          edge: {
            arrow: true, // 线条默认是否带箭头
            shapeType: "Manhattan", // 线条类型
          },
          endpoint: {
            linkableHighlight: true, //连线时会触发point.linkable的方法，可做高亮
            expandArea: {
              //锚点过小时，可扩大连线热区
              left: 15,
              right: 15,
              top: 15,
              botton: 15,
            },
          },
        },
      });
      // this.canvas.draw(mockData, () => {
      //   // this.canvas.setGridMode(true, {
      //   //   theme: {
      //   //     shapeType: "line", // 展示的类型，支持line & circle
      //   //     gap: 50, // 网格间隙
      //   //     adsorbGap: 8, // 吸附间距
      //   //     background: "#fff", // 网格背景颜色
      //   //     lineColor: "#eee", // 网格线条颜色
      //   //     lineWidth: 1, // 网格粗细
      //   //     circleRadiu: 1, // 圆点半径
      //   //     circleColor: "#000", // 圆点颜色
      //   //   },
      //   // });
      // });
      // 设置辅助线
      this.canvas.setGuideLine(true, {
        adsorp: {
          enable: true,
          gap: 5,
        },
      });
      this.canvas.on("events", (data) => {
        if (data.type === "custom:edit") {
          this.editNode(data);
        } else if (data.type === "custom:remove") {
          this.deleteNode(data);
        }
        this.$emit("events", data);
      });
    },
    editNode(node) {
      const nodeRef = this.canvas.getNode(node.data.id);
      nodeRef.updateNode({
        label: "1234",
        layers: [{}],
        enableSymbol: true,
        enableSkip: true
      });
      console.log(node);
    },
    deleteNode(node) {
      const id = node.data.id;
      this.canvas.removeNode(id);
    },
    dragover(e) {
      e.dataTransfer.dropEffect = "link";
      e.preventDefault();
    },
    dropend(e) {
      const { dataTransfer, offsetX, offsetY } = e;
      const layer = dataTransfer.getData("text/plain");
      const pos = {
        top: offsetY - 144 / 2,
        left: offsetX - 273 / 2,
      };
      this.addTaskNode(layer, pos);
    },
    addTaskNode(layer, pos) {
      let id = layer + new Date().getTime();
      const node = {
        id,
        top: pos.top,
        left: pos.left,
        icon: "default",
        name: "采集",
        label: id,
        layers: [],
        enableSymbol: true,
        skipSymbol: true,
        status: "success",
        Class: Node,
      };
      this.canvas.addNode(node);
    },
  },
};
</script>

