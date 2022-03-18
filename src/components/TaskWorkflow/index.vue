<template>
  <div class="task-workflow-wrap">
    <layer-panel />
    <task-designer ref="designer" />
  </div>
</template>

<script>
import LayerPanel from "./LayerPanel";
import TaskDesigner from "./TaskDesigner";

/**
 * 任务流程设计器
 */
export default {
  name: "TaskWorkflow",
  components: {
    LayerPanel,
    TaskDesigner,
  },
  methods: {

  },
};
</script>

<style lang="scss">
@import "./style/index.scss";
</style>