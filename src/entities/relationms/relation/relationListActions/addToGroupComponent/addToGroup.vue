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
      <div class="form-group" v-if="!addNewGroup">
        <label class="form-control-label">{{$t('labels.chooseGroup')}}</label>
        <searchable-select-component :config="groupsSelectConfig"
                                     :options="$store.state.lookups.groups"
                                     :value="selectedGroup"
                                     @onCreate="createNewGroup"
                                     @onChange="updateGroup"
                                     @onDelete="removeGroup"/>
      </div>
      <div class="form-group" v-else>
        <label class="form-control-label">{{$t('labels.groupName')}}</label>
        <div class="input-group">
          <input type="text" class="form-control"  aria-label="Input group example" aria-describedby="btnGroupAddon" v-model="newGroupName">
          <div class="input-group-append">
            <div class="input-group-text cursor-pointer" id="btnGroupAddon" @click.prevent.stop="cancelNewGroup">
              <span>{{$t('buttons.close')}}</span>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script src="./addToGroup.component.ts" lang="ts"></script>

<style scoped>
</style>
