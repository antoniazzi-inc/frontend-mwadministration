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
      <searchable-select-component :config="emailSingleSelectConfig"
                                   :options="$store.state.lookups.emails"
                                   :value="selectedEmail"
                                   @onSelected="addEmail"
                                   @onDelete="removeEmail"/>
    </div>
  </form>
</template>
<script src="./EmailComplexSearch.component.ts"/>
