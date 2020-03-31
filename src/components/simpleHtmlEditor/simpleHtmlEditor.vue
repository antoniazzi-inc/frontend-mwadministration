<template>
  <div>
        <trumbowyg v-model="selectedContent" :config="editorConfig" class="form-control" name="contactInfo"></trumbowyg>
  </div>
</template>
<script type="ts" src="./simpleHtmlEditor.component.ts"></script>
