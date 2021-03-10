<!--
  - /*
  -  * Copyright 2018-2021 Antoniazzi Holding BV
  -  *
  -  * This program is free software: you can redistribute it and/or modify it
  -  * under the terms of the GNU General Public License as published by
  -  * the Free Software Foundation, either version 3 of the License,
  -  * or (at your option) any later version.
  -  *
  -  * This program is distributed in the hope that it will be useful,
  -  * but WITHOUT ANY WARRANTY; without even the implied warranty of
  -  * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
  -  * GNU General Public License for more details.
  -  *
  -  * You should have received a copy of the GNU General Public License
  -  * along with this program. If not, see <https://www.gnu.org/licenses/>.
  -  */
  -->

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
