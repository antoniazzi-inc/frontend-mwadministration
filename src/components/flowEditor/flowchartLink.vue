<template>
  <g @mouseover="handleMouseOver"
     @mouseleave="handleMouseLeave">
    <path :d="dAttr" :style="pathStyle"></path>
    <a v-if="show.delete" @click="deleteLink">
      <text
        text-anchor="middle"
        :transform="arrowTransform"
        font-size="22">&times;</text>
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
