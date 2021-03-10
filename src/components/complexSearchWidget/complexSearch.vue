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
