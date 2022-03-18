<template>
  <div class="layer-panel-wrap">
    <el-tree
      ref="tree"
      v-loading="loading"
      :data="layerData"
      :props="defaultProps"
      node-key="id"
      highlight-current
      @node-click="handleNodeClick"
    >
      <div
        slot-scope="{ data }"
        class="layer-tree-node"
        draggable
        @dragstart="dragstart($event, data)"
      >
        <span class="tree-item__title" :title="data.name">{{ data.name }}</span>
      </div>
    </el-tree>
  </div>
</template>

<script>
/**
 * 图层面板
 */
export default {
  name: "LayerPanel",
  data() {
    return {
      loading: false,
      layerData: [
        {
          name: "图层组1",
        },
        {
          name: "图层组2",
        },
        {
          name: "图层组3",
        },
        {
          name: "图层组4",
        },
        {
          name: "图层组5",
        },
        {
          name: "图层组6",
        },
      ],
      defaultProps: {
        children: "children",
        label: "name",
      },
    };
  },
  methods: {
    handleNodeClick() {},
    dragstart(e, data) {
      //  const img = new Image();
      //  img.src = require("./assets/images/dragEffect.png");
      // e.dataTransfer.setDragImage(img, 20, 20);
      e.dataTransfer.setData("text/plain", data.name);
    },
  },
};
</script>
