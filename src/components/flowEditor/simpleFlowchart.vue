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
