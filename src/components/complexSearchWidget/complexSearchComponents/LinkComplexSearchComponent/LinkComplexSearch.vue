<template>
  <form>
    <div class="form-group">
      <div class="form-group">
        <searchable-select-component :config="linkSingleSelectConfig"
                                     :options="$store.state.lookups.links"
                                     :value="selectedLink"
                                     @onSelected="addLink"
                                     @onDelete="removeLink"/>
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
    <div class="form-group" v-else-if="selectedOperator && selectedOperator.labelValue === 'freeSearch'">
      <input type="text" class="form-control" v-model="searchValue">
    </div>
  </form>
</template>
<script src="./LinkComplexSearch.component.ts"/>
