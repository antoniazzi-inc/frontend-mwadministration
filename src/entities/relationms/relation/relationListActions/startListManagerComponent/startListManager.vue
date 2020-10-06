<template>
  <div class="container-fluid">
    <form>
      <div class="form-group">
        <label class="form-control-label">{{$t('labels.chooseListManager')}}</label>
        <searchable-select-component :config="searchableSelectConfig"
                                     :options="$store.state.lookups.listManagers"
                                     :value="selectedValue"
                                     @onChange="updateValue"
                                     @onDelete="removeValue"/>
      </div>
    </form>
  </div>
</template>

<script src="./startListManager.component.ts" lang="ts"></script>

<style scoped>
</style>
