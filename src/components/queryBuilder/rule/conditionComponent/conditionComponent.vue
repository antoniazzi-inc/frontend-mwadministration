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
