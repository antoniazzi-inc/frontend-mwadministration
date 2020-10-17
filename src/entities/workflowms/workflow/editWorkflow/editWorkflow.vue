<template>
  <div class="container-fluid">

    <h2 id="page-heading" class="text-left mt-3">
      <span id="tag-heading">{{workflow.name}}</span>
      <router-link to="/workflows" class="text-decoration-none text-white">
        <button tag="button" class="btn btn-primary float-right create-tag">
          <span>{{$t('buttons.backToList')}}</span>
        </button>
      </router-link>
    </h2>

    <div class="row">
      <div class="col-md-12 pr-0 m-0">
        <flow-editor></flow-editor>
    </div>
    </div>

  </div>
</template>
<script type="ts" src="./editWorkflow.component.ts"></script>
<style scoped>
</style>
