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
    <form>
      <template v-for="(item, index) in social">
      <div class="form-row" :key="index">
        <div class="col-2 mr-auto">
        <label>{{item.name}}</label>
        <toggle-switch :on-text="$t('labels.yes')"
                       :off-text="$t('labels.no')"
                       :value.sync="item.visible"></toggle-switch>
        </div>
        <div class="col">
          <label>{{$t('labels.url')}}</label>
          <input type="url" v-validate="'url'" v-model="item.url" :name="item.name"
                 @blur="validateUrl(index, item.name)" :class="{'form-control': true, invalid: errors.has(item.name)}">
          <span class="text-danger small">{{errors.first(item.name)}}</span>
        </div>
      </div>
      </template>
    </form>
  </div>
</template>
<script type="ts" src="./defaultTextsSocial.component.ts"></script>
