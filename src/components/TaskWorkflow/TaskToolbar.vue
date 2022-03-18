<template>
  <div class="task-toolbar-wrap">
    <i class="icon-item el-icon-zoom-in" title="放大" @click="zoomIn"></i>
    <i class="icon-item el-icon-zoom-out" title="缩小" @click="zoomOut"></i>
    <i class="icon-item el-icon-aim" title="自适应" @click="autoLayout"></i>
    <i
      class="icon-item el-icon-full-screen"
      title="全屏"
      @click="fullScreen"
    ></i>
  </div>
</template>

<script>
/**
 * 工具栏
 */
export default {
  name: "TaskToolbar",
  inject: ["designer"],
  methods: {
    zoom(ratio) {
      if (this.designer) {
        const { canvas } = this.designer;
        const zoom = canvas.getZoom();
        canvas.zoom(zoom * ratio);
      }
    },
    zoomIn() {
      this.zoom(1.2);
    },
    zoomOut() {
      this.zoom(0.8);
    },
    autoLayout() {
      this.designer && this.designer.canvas.autoLayout();
    },
    fullScreen() {},
  },
};
</script>