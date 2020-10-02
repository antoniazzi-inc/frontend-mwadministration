<template>
  <form>
    <div class="form-group">
      <searchable-select-component :config="workflowSingleSelectConfig"
                                   :options="$store.state.lookups.products"
                                   :value="selectedWorkflow"
                                   @onSelected="addWorkflow"
                                   @onDelete="removeWorkflow"/>
    </div>
    <div class="form-group" v-if="allWorkflowSteps && allWorkflowSteps.length">
      <searchable-select-component :config="productAttributeSingleSelectConfig"
                                   :options="allWorkflowSteps"
                                   :value="selectedWorkflowStep"
                                   @onSelected="addWorkflowStep"
                                   @onDelete="removeWorkflowStep"/>
    </div>
    <div class="form-group">
      <searchable-select-component :config="operatorsSingleSelectConfig"
                                   :options="allOperators"
                                   :value="selectedOperator"
                                   @onSelected="addOperator"
                                   @onDelete="removeOperator"/>
    </div>
    <div class="form-group">
      <div class="dateHolder date-input">
        <flat-pickr :config="dateConfig" class="single-daterange form-control" v-model="dateValue"/>
        <i class="fa fa-times clearDate cursor-pointer" @click="dateValue=null">
          <span aria-hidden="true" class="sr-only">X</span>
        </i>
      </div>
    </div>
  </form>
</template>
<script src="./WorkflowSelectComplexSearch.component.ts"/>
