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
      <searchable-select-component :config="tagsSingleSelectConfig"
                                   :options="$store.state.lookups.tags"
                                   :value="selectedTag"
                                   @onSelected="addTag"
                                   @onDelete="removeTag"/>
    </div>
  </form>
</template>
<script src="./TagsComplexSearch.component.ts"/>
