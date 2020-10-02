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
      <searchable-select-component :config="mailingSingleSelectConfig"
                                   :options="$store.state.lookups.mailings"
                                   :value="selectedMailing"
                                   @onSelected="addMailing"
                                   @onDelete="removeMailing"/>
    </div>
  </form>
</template>
<script src="./MailingComplexSearch.component.ts"/>
