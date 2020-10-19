<template>
  <div id="wflEditor">
    <div class="tool-wrapper">
      <select class="form-control" v-model="newNodeType" style="max-width:100px;">
        <option v-for="(item, index) in nodeCategory" :key="index" :value="index">{{item}}</option>
      </select>
      <input class="form-control" type="text" v-model="newNodeLabel" style="max-width:200px;">
      <button class="btn btn-primary" @click="addNode">ADD</button>
    </div>

    <simple-flowchart :scene.sync="scene"
        @nodeClick="nodeClick"
        @nodeDelete="nodeDelete"
        @linkBreak="linkBreak"
        @linkAdded="linkAdded"
        @canvasClick="canvasClick"
     />
  </div>
</template>
<script type="ts" src="./flowEditor.component.ts"></script>

<style scoped>

  #wflEditor {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin: 0;
    overflow: hidden;
    height: 800px;
  }
  .tool-wrapper {
    position: relative;
  }

</style>
