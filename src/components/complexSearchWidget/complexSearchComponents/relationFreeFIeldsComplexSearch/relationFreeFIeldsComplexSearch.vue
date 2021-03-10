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
