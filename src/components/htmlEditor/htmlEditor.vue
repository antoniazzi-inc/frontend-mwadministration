<template>
  <div class="pl-0 pr-0 text-left fullHeight">
    <div class="col-md-12 pl-0 pr-0 form-group fullHeight">
      <trumbowyg v-model="selectedContent" :config="editorConfig" class="form-control fullHeight" name="contactInfo"></trumbowyg>
    </div>
  </div>
</template>
<script type="ts" src="./htmlEditor.component.ts"></script>
<style scoped>
  .mlbtns .btn-group > .btn-outline-primary {
    border: solid 1px #d0d0d0;
    background-color: #f2f4f8;
    border-left: 0px;
  }
  .mlbtns .btn-group > .btn-outline-primary.active {
    background-color: #007bff;
  }
  .fullHeight{
    height: 60vh;
  }
</style>
