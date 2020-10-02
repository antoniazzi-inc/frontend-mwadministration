<template>
  <form>
    <div class="form-group">
      <searchable-select-component :config="operatorsSingleSelectConfig"
                                   :options="allOperators"
                                   :value="selectedOperator"
                                   @onSelected="addOperator"
                                   @onDelete="removeOperator"/>
    </div>
    <div class="form-group">
      <searchable-select-component :config="groupsSingleSelectConfig"
                                   :options="$store.state.lookups.groups"
                                   :value="selectedGroup"
                                   @onSelected="addGroup"
                                   @onDelete="removeGroup"/>
    </div>
  </form>
</template>
<script src="./GroupsComplexSearch.component.ts"/>
