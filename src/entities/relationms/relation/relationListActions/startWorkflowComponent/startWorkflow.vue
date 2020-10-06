<template>
  <div class="container-fluid">
    <form>
      <div class="form-group">
        <label class="form-control-label">{{$t('labels.chooseWorkflow')}}</label>
        <searchable-select-component :config="searchableSelectConfig"
                                     :options="$store.state.lookups.mailings"
                                     :value="selectedValue"
                                     @onChange="updateValue"
                                     @onDelete="removeValue"/>
      </div>
    </form>
  </div>
</template>

<script src="./startWorkflow.component.ts" lang="ts"></script>

<style scoped>
</style>
