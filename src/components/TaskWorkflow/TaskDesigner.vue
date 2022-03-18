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
        layout: {
          type: "compactBox",
          options: {
            direction: "TB", // H / V / LR / RL / TB / BT
            getHeight() {
              return 60;
            },
            getWidth() {
              return 120;
            },
            getHGap() {
              return 20;
            },
            getVGap() {
              return 80;
            },
          },
        },
        theme: {
          edge: {
            arrow: true, //线条默认是否带箭头
            shapeType: "Manhattan",
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
    },
    dragover(e) {
      e.dataTransfer.dropEffect = "link";
      e.preventDefault();
    },
    dropend(e) {
      const { dataTransfer, offsetX, offsetY } = e;
      const layer = dataTransfer.getData("text/plain");
      const pos = { top: offsetY, left: offsetX };
      this.addTaskNode(layer, pos);
    },
    addTaskNode(layer, pos) {
      const node = {
        id: layer,
        top: pos.top,
        left: pos.left,
        label: layer,
        Class: Node,
        endpoints: [
          {
            id: "top",
            orientation: [0, -1],
            pos: [0.5, 0],
          },
          {
            id: "right",
            orientation: [1, 0],
            pos: [0, 0.5],
          },
          {
            id: "bottom",
            orientation: [0, 1],
            pos: [0.5, 0],
          },
          {
            id: "left",
            orientation: [-1, 0],
            pos: [0, 0.5],
          },
        ],
      };
      this.canvas.addNode(node);
    },
  },
};
</script>

