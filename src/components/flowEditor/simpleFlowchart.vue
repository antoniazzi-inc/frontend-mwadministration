<template>
  <div class="flowchart-container"
       @mousemove="handleMove"
       @mouseup="handleUp"
       @mousedown="handleDown">
    <svg width="100%" :height="`${height}`">
      <flowchart-link v-bind.sync="link"
                      v-for="(link, index) in lines"
                      :key="`link${index}`"
                      @deleteLink="linkDelete(link.id)">
      </flowchart-link>
    </svg>
    <flowchart-node v-bind.sync="node"
                    v-for="(node, index) in scene.nodes"
                    :key="`node${index}`"
                    @linkingStart="linkingStart(node.id)"
                    @linkingStop="linkingStop(node.id)"
                    @nodeSelected="nodeSelected(node.id, $event)">
    </flowchart-node>
  </div>
</template>

<script type="ts" src="./simpleFlowChart.component.ts"></script>

<style scoped>
  .flowchart-container {
    margin: 0;
    background: #ddd;
    position: relative;
    overflow: hidden;
    height: 100%;
  }
  .flowchart-container svg {
    cursor: grab;
  }
</style>
