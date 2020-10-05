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
      <searchable-select-component :config="categoriesSingleSelectConfig"
                                   :options="$store.state.lookups.categories"
                                   :value="selectedCategory"
                                   @onSelected="addCategory"
                                   @onDelete="removeCategory"/>
    </div>
  </form>
</template>
<script src="./CategoriesComplexSearch.component.ts"/>
