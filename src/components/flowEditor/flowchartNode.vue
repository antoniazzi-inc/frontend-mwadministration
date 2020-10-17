<template>
  <div class="flowchart-node" :style="nodeStyle"
       @mousedown="handleMousedown"
       @mouseover="handleMouseOver"
       @mouseleave="handleMouseLeave"
       v-bind:class="{selected: options.selected === id}">
    <div class="node-port node-input"
         @mousedown="inputMouseDown"
         @mouseup="inputMouseUp">
    </div>
    <div class="node-main">
      <div v-text="type" class="node-type"></div>
      <div v-text="label" class="node-label"></div>
    </div>
    <div class="node-port node-output"
         @mousedown="outputMouseDown">
    </div>
    <div v-show="show.delete" class="node-delete">&times;</div>
  </div>
</template>

<script type="ts" src="./flowChartNode.component.ts"></script>

<style scoped>
  .flowchart-node {
    -webkit-box-sizing:border-box;
    -webkit-transform-origin:top left;
    background:#fff;
    border:none;
    box-sizing:border-box;
    cursor:move;
    height:80px;
    margin:0;
    opacity:.9;
    position:absolute;
    transform-origin:top left;
    width:80px;
    z-index:1
  }
  .flowchart-node .node-main{
    text-align:center
  }
  .flowchart-node .node-main .node-type {
    background:#585;
    color:#fff;
    font-size:13px;
    padding:6px
  }
  .flowchart-node .node-main .node-label{
    font-size:13px
  }
  .flowchart-node .node-port{
    -webkit-transform:translate(-50%);
    background:#fff;
    border:1px solid #ccc;
    border-radius:100px;
    height:12px;
    left:50%;
    position:absolute;
    transform:translate(-50%);
    width:12px
  }
  .flowchart-node .node-port:hover{
    background:#f85;
    border:1px solid #f85
  }
  .flowchart-node .node-input{
    top:-8px
  }
  .flowchart-node .node-output{
    bottom:-8px
  }
  .flowchart-node .node-delete{
    background:#fff;
    border:1px solid #f85;
    border-radius:100px;
    color:#f85;
    cursor:pointer;
    font-size:12px;
    height:12px;
    position:absolute;
    right:-6px;
    text-align:center;
    top:-6px;
    width:12px
  }
  .flowchart-node .node-delete:hover{
    background:#f85;
    color:#fff
  }
  .selected {
    -webkit-box-shadow:0 0 0 2px #f85;
    box-shadow:0 0 0 2px #f85
  }
</style>
