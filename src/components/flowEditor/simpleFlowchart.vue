<template>
  <div class="flowchart-container"
       @mousemove="handleMove"
       @mouseup="handleUp"
       @click="handleDoubleClick"
       @mousedown="handleDown">

    <div class="fc-controls">scene center: {{scene.centerX}},{{scene.centerY}}</div>

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
                    :options="nodeOptions"
                    @linkingStart="linkingStart(node.id, 'output')"
                    @yesLinkingStart="linkingStart(node.id, 'output_yes')"
                    @noLinkingStart="linkingStart(node.id, 'output_no')"
                    @linkingStop="linkingStop(node.id)"
                    @nodeSelected="nodeSelected(node.id, $event)">
    </flowchart-node>

  </div>
</template>

<script type="ts" src="./simpleFlowChart.component.ts"></script>

<style scoped>
  .flowchart-container {
    margin: 0;
    background: #fff;
    border: solid 1px #f0f0f0;
    border-radius: 6px;
    position: relative;
    overflow: hidden;
    height: 100%;
  }
  .flowchart-container svg {
    cursor: grabbing;
  }
  .fc-controls {
    position: absolute;
    left: 10px;
    top: 10px;
    color: #e8e8e8;
    font-size:5em;
  }

</style>
