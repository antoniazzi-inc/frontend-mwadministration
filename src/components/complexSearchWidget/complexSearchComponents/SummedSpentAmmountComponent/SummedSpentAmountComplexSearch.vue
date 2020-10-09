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
      <money type="text" class="form-control" v-bind="moneyConfig" v-model="initialValue"/>
    </div>
  </form>
</template>
<script src="./SummedSpentAmountComplexSearch.component.ts"/>
