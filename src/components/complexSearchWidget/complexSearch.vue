<template>
  <div class="complexSearchWrapper">
    <query-builder :config="config" v-model="query">
      <template #groupOperator="props">
        <group-operator-slot :group-operator="props"/>
      </template>

      <template #groupControl="props">
        <group-ctrl-slot :group-ctrl="props"/>
      </template>

      <template #rule="props">
        <rule-slot :rules="config.rules" :ruleCtrl="props"/>
      </template>
    </query-builder>
  </div>
</template>
<script src="./complexSearch.component.ts"/>
<style scoped>
  .complexSearchWrapper{
    margin: 30px auto;
    padding: 10px;
    border: 1px solid hsl(0, 0%, 75%);
  }
</style>
