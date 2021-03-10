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
  <div class="container-fluid group-ctrl-slot">
    <div class="row">
      <div class="col-auto">
        <div class="btn-group" role="group" aria-label="Button group with nested dropdown">
          <div class="btn-group" :class="{ show: expanded }" role="group">
            <button
              id="btnGroupDrop1"
              type="button"
              class="btn btn-primary dropdown-toggle"
              data-toggle="dropdown"
              aria-haspopup="true"
              :aria-expanded="String(expanded)"
              @click.prevent.stop="toggleExpanded"
            >{{ ruleName }}</button>
            <div class="dropdown-menu" :class="{ show: expanded }" aria-labelledby="btnGroupDrop1">
              <a @click.prevent.stop="setRule('')" class="dropdown-item" href="#">{{$t('labels.selectRule')}}</a>
              <a
                v-for="rule in groupCtrl.rules"
                :key="rule.identifier"
                @click.prevent.stop="setRule(rule.identifier)"
                class="dropdown-item"
                href="#"
              >{{ $t(`labels.${rule.name}Title`) }}</a>
            </div>
          </div>
          <!--<button
            type="button"
            class="btn btn-primary"
            :disabled="selectedRule === ''"
            @click="addRule"
          >{{$t('labels.addRule')}}</button>-->
        </div>
      </div>
      <div class="col-auto addGroupComplexSearch" v-if="!isSecondLevel">
        <button class="btn btn-primary" @click.prevent.stop="groupCtrl.newGroup" v-text="$t('labels.addGroup')"/>
      </div>
    </div>
  </div>
</template>
<script src="./groupControl.component.ts"/>
<style>
  .group-ctrl-slot {
    margin-top: 16px;
    margin-bottom: 16px;
  }
  .query-builder-group__control{
    padding-left: 2%;
  }
  .query-builder-child__component .addGroupComplexSearch{

  }
</style>
