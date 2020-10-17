<template>
  <div class="complexSearchWrapper">
    <query-builder :config="config" v-model="query">
      <template #groupOperator="props">
        <group-operator-slot :group-operator="props"/>
      </template>

      <template #groupControl="props">
        <group-ctrl-slot :group-ctrl="props"  :query="query" :isSecondLvl="secondLvl"/>
      </template>

      <template #rule="props">
        <rule-slot :rules="config.rules" :query="query" :ruleCtrl="props"/>
      </template>
    </query-builder>
    <div class="justify-content-center mt-5">
      <button @click="loadQueries" class="btn btn-sm btn-outline-primary" v-if="!saving">{{$t('buttons.savedQueries')}}</button>
      <button @click="dosave" v-if="showsave && !saving" class="btn btn-sm btn-outline-primary ml-2" v-html="$t('buttons.saveSearch')">Save Search</button>
      <button @click="clear" class="btn btn-outline-danger ml-2 btn-sm" v-html="$t('buttons.clear')">Clear</button>
      <button @click="doSearch" :disabled="query.children.length === 0" class="btn btn-sm btn-primary ml-2" v-if="!saving" v-html="$t('buttons.search')">Search</button>
    </div>
  </div>
</template>
<script src="./complexSearch.component.ts"/>
<style scoped>
  .complexSearchWrapper{
    margin: 30px auto;
    padding: 10px;
    border: 1px solid hsl(0, 0%, 75%);
    overflow-y: auto;
    min-height: 70vh;
  }
</style>
