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
  <div class="container-fluid">
    <form>
      <div class="form-group">
        <label class="form-control-label">{{$t('labels.chooseListManager')}}</label>
        <searchable-select-component :config="searchableSelectConfig"
                                     :options="$store.state.lookups.listManagers"
                                     :value="selectedValue"
                                     @onChange="updateValue"
                                     @onDelete="removeValue"/>
      </div>
    </form>
  </div>
</template>

<script src="./startListManager.component.ts" lang="ts"></script>

<style scoped>
</style>
