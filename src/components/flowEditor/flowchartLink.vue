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
  <g @mouseover="handleMouseOver"
     @mouseleave="handleMouseLeave">
    <path :d="dAttr" :style="pathStyle"></path>
    <a v-if="show.delete" @click="deleteLink">
      <text
        text-anchor="middle"
        :transform="arrowTransform"
        font-size="28">&times;</text>
    </a>

    <path v-else d="M -1 -1 L 0 1 L 1 -1 z"
          :style="arrowStyle"
          :transform="arrowTransform"></path>

  </g>
</template>

<script type="ts" src="./flowChartLink.component.ts"></script>

<style scoped>
  g {
    cursor: pointer;
  }
</style>
