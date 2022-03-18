<template>
  <div class="demo-wrap">
    <TaskWorkflow />
  </div>
</template>

<script>
import TaskWorkflow from "@/components/TaskWorkflow";

export default {
  name: "WorkflowDemo",
  components: {
    TaskWorkflow,
  },
};
</script>

<style lang="scss">
.demo-wrap {
  width: 100%;
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
}
</style>