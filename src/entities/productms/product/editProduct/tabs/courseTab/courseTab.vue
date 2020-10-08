<template>
  <div class="tab-form-panel">
    <div class="row">
      <div class="col-md-12">
        <new-course-component :courseId="courseId" @onSave="courseSaved"/>
      </div>
    </div>
  </div>
</template>
<script lang="ts" src="./courseTab.component.ts"></script>
