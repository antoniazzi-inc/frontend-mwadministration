<template>
  <form>
    <div class="form-group">
      <searchable-select-component :config="relationFieldSingleSelectConfig"
                                   :options="allRelationFields"
                                   :value="selectedRelationField"
                                   @onSelected="addRelationField"
                                   @onDelete="removeRelationField"/>
    </div>
    <div class="form-group">
      <searchable-select-component :config="operatorsSingleSelectConfig"
                                   :options="allOperators"
                                   :value="selectedOperator"
                                   @onSelected="addOperator"
                                   @onDelete="removeOperator"/>
    </div>
    <div class="form-group" v-if="outputElement === 'text'">
      <input type="text" class="form-control" v-model="searchValue"/>
    </div>
    <div class="form-group" v-else-if="outputElement === 'date'">
      <div class="dateHolder date-input">
        <flat-pickr :config="dateConfig" class="single-daterange form-control" v-model="searchValue"/>
        <i class="fa fa-times clearDate cursor-pointer" @click="searchValue=null">
          <span aria-hidden="true" class="sr-only">X</span>
        </i>
      </div>
    </div>
    <div class="form-group" v-else-if="outputElement === 'singleSelect'">
      <searchable-select-component :config="genderSingleSelectConfig"
                                   :options="outputElementOptions"
                                   :value="selectedGeneder"
                                   @onSelected="addGender"
                                   @onDelete="removeGender"/>
    </div>
  </form>
</template>
<script src="./relationFIeldsComplexSearch.component.ts"/>
