<!--
  - /*
  -  * Copyright 2018-2021 Antoniazzi Holding BV
  -  *
  -  * This program is free software: you can redistribute it and/or modify it
  -  * under the terms of the GNU General Public License as published by
  -  * the Free Software Foundation, either version 3 of the License,
  -  * or (at your option) any later version.
  -  *
  -  * This program is distributed in the hope that it will be useful,
  -  * but WITHOUT ANY WARRANTY; without even the implied warranty of
  -  * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
  -  * GNU General Public License for more details.
  -  *
  -  * You should have received a copy of the GNU General Public License
  -  * along with this program. If not, see <https://www.gnu.org/licenses/>.
  -  */
  -->

<template>

  <div class="flowchart-node" :style="nodeStyle"
       @mousedown="handleMousedown"
       @mouseover="handleMouseOver"
       @mouseleave="handleMouseLeave"
       v-bind:class="{selected: options.selected === id}">

    <div v-if="type != 'start'" class="node-port node-input"
         @mousedown="inputMouseDown"
         @mouseup="inputMouseUp">
    </div>

    <div class="node-main">
      <div v-text="label" class="node-label"></div>
    </div>

    <div v-if="type === 'action'" class="node-wait">
      wait 15 days
    </div>

    <div v-if="type != 'condition'" class="node-port node-output"
         @mouseup="portClick"
         @mousedown="outputMouseDown">
    </div>
    <div v-if="type === 'condition'" class="node-port node-output-no"
         @mousedown="outputNoMouseDown">
    </div>
    <div v-if="type === 'condition'" class="node-port node-output-yes"
         @mousedown="outputYesMouseDown">
    </div>

    <div v-show="show.delete" class="control-node node-delete"><i class="fa fa-times do-del"></i></div>
    <div v-show="show.delete" class="control-node node-edit"><i class="fas fa-edit do-edit"></i></div>

    <div v-show="show.delete" class="control-node node-info">
      <span style="font-weight:800;">{{label}}</span><br/>
      type: send email<br/>
      details where a new email XY that is sent and ik weet niet wat iik nog meer kan zeggen...
    </div>

  </div>
</template>

<script type="ts" src="./flowChartNode.component.ts"></script>

<style scoped>
  .flowchart-node {
    -webkit-box-sizing:border-box;
    -webkit-transform-origin:top left;
    background:#fff;
    border: solid 1px #9babeb;
    border-radius: 4px;
    border-radius-topright: 18px;
    box-sizing:border-box;
    cursor:pointer;
    height:45px;
    margin:0;
    opacity:1;
    padding: 10px;
    padding-top: 13px;
    position:absolute;
    transform-origin:top left;
    width:200px;
    z-index: 10;
  }
  .flowchart-node .node-main {
    text-align:left;
    font-size:13px;
  }
  .flowchart-node .node-wait {
    border: 1px solid #ccc;
    background-color: white;
    border-radius:12px;
    height: 26px;
    width: 160px;
    line-height: 22px;
    cursor: grabbing;
    position:absolute;
    top: -40px;
    left: 20px;
  }
  .flowchart-node .node-port {
    -webkit-transform:translate(-50%);
    background:#fff;
    border: 1px solid #ccc;
    border-radius:100px;
    height:20px;
    width:20px;
    left:50%;
    color:#fff;
    position:absolute;
    transform:translate(-50%);
    z-index:1;
  }
  .flowchart-node .node-port:hover {
    background:#f85;
    border:1px solid #f85;
    z-index:1050;
  }
  .flowchart-node .node-input {
    top:-11px
  }
  .flowchart-node .node-output{
    bottom:-11px
  }
  .flowchart-node .node-output-no {
    bottom:-11px;
    left: 20%;
  }
  .flowchart-node .node-output-yes {
    bottom:-11px;
    left: 80%;
  }
  .flowchart-node .control-node {
    background:#fff;
    border-radius:100px;
    border:1px solid red;
    color:red;
    cursor:pointer;
    font-size:12px;
    height:24px;
    width:24px;
    position:absolute;
    text-align:center;
    line-height: 22px;
    top:4px;
    right:4px;
  }

  .node-delete {
    right:4px!important;
    border:1px solid red!important;
    color:red!important;
  }

  .node-edit {
    right:32px!important;
    border:1px solid #047bf8!important;
    color:#047bf8!important;
  }

  .node-info {
    right: -260px!important;
    padding: 0.5em;
    font-size: 0.9em!important;
    min-height:100px;
    top: -1px!important;
    color:#6e6446!important;
    background-color: #fcedbe!important;
    text-align: left!important;
    border: 1px solid #fbe6a8!important;
    min-width:250px!important;
    border-radius: 6px!important;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .flowchart-node .node-delete:hover{
    background:red;
    color:#fff!important;
  }
  .flowchart-node .node-edit:hover{
    background:#047bf8;
    color:#fff!important;
  }

  .selected {
    -webkit-box-shadow:0 0 0 0px #6b7bbb;
    box-shadow:0 0 0 0px #6b7bbb;
    border: solid 1px #6b7bbb;
  }
</style>
