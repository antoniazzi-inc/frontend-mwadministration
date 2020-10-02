<template>
  <form>
    <div class="form-group">
      <div class="form-group">
        <searchable-select-component :config="listManagerSingleSelectConfig"
                                     :options="$store.state.lookups.listManagers"
                                     :value="selectedListManager"
                                     @onSelected="addListManager"
                                     @onDelete="removeListManager"/>
      </div>
      <searchable-select-component :config="operatorsSingleSelectConfig"
                                   :options="allOperators"
                                   :value="selectedOperator"
                                   @onSelected="addOperator"
                                   @onDelete="removeOperator"/>
    </div>
    <div class="form-group" v-if="selectedOperator && selectedOperator.labelValue.match('before') || selectedOperator && selectedOperator.labelValue.match('after')">
      <div class="dateHolder date-input">
        <flat-pickr :config="dateConfig" class="single-daterange form-control" v-model="dateValue"/>
        <i class="fa fa-times clearDate cursor-pointer" @click="dateValue=null">
          <span aria-hidden="true" class="sr-only">X</span>
        </i>
      </div>
    </div>
  </form>
</template>
<script src="./ListManagerComplexSearch.component.ts"/>
