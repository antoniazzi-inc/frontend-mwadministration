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
    <div>
        <div v-if="componentType === 'text'">
            <input type="text" v-model="localValue" class="form-control"/>
        </div>
        <div v-if="componentType === 'email'">
            <input type="email" v-model="localValue" class="form-control"/>
        </div>
        <div v-if="componentType === 'number'">
            <input type="number" v-model="localValue" class="form-control"/>
        </div>
        <div v-if="componentType === 'money'">
            <money class="form-control" v-model="localValue" name="amount" v-bind="money"></money>
        </div>
        <div v-if="componentType === 'date'">
            <flat-pickr class="form-control" :config="dateConfig" v-model="localValue" format="dd-mm-yyyy"></flat-pickr>
        </div>
        <div v-if="componentType === 'singleSelect'">
          <searchable-select-component :config="singleSelectConfig"
                                       :options="options"
                                       :value="localValue"
                                       @onChange="addSingleValue"
                                       @onDelete="removeSingleValue"
          ></searchable-select-component>
        </div>
        <div v-if="componentType === 'multiSelect'">
          <searchable-select-component :config="multiSelectConfig"
                                       :options="options"
                                       :value="localValue"
                                       @onChange="addMultipleValues"
                                       @onDelete="removeMultipleValues"
          ></searchable-select-component>
        </div>
    </div>
</template>
<script lang="ts" src="./conditionComponent.component.ts"></script>
