<template>
  <form>
    <div class="form-group">
      <searchable-select-component :config="freeFieldSingleSelectConfig"
                                   :options="$store.state.lookups.freeFields"
                                   :value="selectedFreeField"
                                   @onSelected="addFreeField"
                                   @onDelete="removeFreeField"/>
    </div>
    <div class="form-group" v-if="selectedFieldType!=='boolean'">
      <searchable-select-component :config="operatorsSingleSelectConfig"
                                   :options="allOperators"
                                   :value="selectedOperator"
                                   @onSelected="addOperator"
                                   @onDelete="removeOperator"/>
    </div>
    <div class="form-group" v-if="selectedFieldType==='optionList'">
      <searchable-select-component :config="freeFieldOptionSingleSelectConfig"
                                   :options="allFreeFieldOptions"
                                   :value="selectedFreeFieldOption"
                                   @onSelected="addFreeFieldOption"
                                   @onDelete="removeFreeFieldOption"/>
    </div>
    <div class="form-group" v-if="selectedFieldType==='text'">
      <input type="text" class="form-control" v-model="searchValue"/>
    </div>
    <div class="form-group" v-else-if="selectedFieldType==='boolean'">
      <toggle-switch id="productArchived"
                     :on-text="$t('labels.yes')"
                     :off-text="$t('labels.no')"
                     :value.sync="searchValue"></toggle-switch>
    </div>
  </form>
</template>
<script src="./relationFreeFIeldsComplexSearch.component.ts"/>
