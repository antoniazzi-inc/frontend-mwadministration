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
      <input type="number" class="form-control mt-4" v-model="initialValue">
    </div>
  </form>
</template>
<script src="./OrderQuantityComplexSearch.component.ts"/>
