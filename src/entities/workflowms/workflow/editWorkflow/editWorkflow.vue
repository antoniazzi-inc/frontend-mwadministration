<template>
  <div class="container-fluid">

    <h2 id="page-heading" class="text-left mt-3">
      <span id="tag-heading">{{workflow.name}}</span>

      <button class="btn btn-outline-primary btn-sm ml-3 mb-1">change name</button>

      <span style="color: green; margin-left:100px; font-size:0.6em; padding: 6px;">Workflow is active</span>
      <button class="btn btn-outline-primary btn-sm ml-1">deactivate</button>

      <router-link to="/workflows" class="text-decoration-none text-white">
        <button tag="button" class="btn btn-primary float-right create-tag">
          <span>{{$t('buttons.backToList')}}</span>
        </button>
      </router-link>
    </h2>

    <div class="row">
      <div class="col-md-12 m-0">
        <flow-editor></flow-editor>
      </div>
    </div>

  </div>
</template>
<script type="ts" src="./editWorkflow.component.ts"></script>
<style scoped>

</style>
