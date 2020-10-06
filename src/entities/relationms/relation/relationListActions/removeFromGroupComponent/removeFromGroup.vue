<template>
  <div class="container-fluid">
      <form>
        <div class="form-group">
          <label class="form-control-label">{{$t('labels.chooseGroupToRemove')}}</label>
          <searchable-select-component :config="groupsSelectConfig"
                                       :options="$store.state.lookups.groups"
                                       :value="selectedGroup"
                                       @onChange="updateGroup"
                                       @onDelete="removeGroup"/>
        </div>
      </form>
  </div>
</template>

<script src="./removeFromGroup.component.ts" lang="ts"></script>

<style scoped>
</style>
