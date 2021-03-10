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
  <form class="text-left" @submit.prevent.stop="onChangeVal()">
    <div class="form-group" v-if="$props.config.showName">
      <label>{{$t($props.config.nameLabel)}}</label>
      <input type="text" v-validate="$props.config.requiredName ? 'required' : ''" :class="{'form-control':true, invalid: errors.has('name')}" name="name" v-model="selectedValue.name"/>
      <span class="small text-danger" v-if="$props.isValidating">{{errors.first('name')}}</span>
    </div>
    <div class="form-group" v-if="$props.config.showDescription">
      <label>{{$t($props.config.descriptionLabel)}}</label>
      <textarea cols="5" v-validate="$props.config.requiredDescription ? 'required' : ''" :class="{'form-control':true, invalid: errors.has('description')}" name="description" v-model="selectedValue.description"/>
    </div>
    <div class="form-group flex-row mlbtns">
      <div class="btn-group" v-show="$props.config.showLangs">
                <span :key="index" to="" v-for="(lang, index) in $store.state.languages" @click="changeLanguage(index)"
                      :class="{btn: true, 'btn-outline-primary ml-0 btn-small btn-rounded': true,
                      'active': selectedLanguage === index}">
                    <span style="font-size:0.8em">
                 <img class="img-fluid" :src="`./assets/images/flags/${index}.png`"/>
                      <i class="ml-1 fa fa-check" v-if="checkIfHasValue(index)"></i>
              </span>
                </span>
      </div>
      <div class="btn-group" v-if="!$props.config.showLangs && availableLangs">
                <span :key="index" to="" v-for="(lang, index) in availableLangs" @click="changeLanguage(index)"
                      :class="{btn: true, 'btn-outline-primary btn-outline-languages ml-0 btn-small btn-rounded': true,
                      'active': selectedLanguage === index}">
                    <span style="font-size:0.8em">
                 <img class="img-fluid" :src="`./assets/images/flags/${index}.png`"/>
                      <i class="ml-1 fa fa-check" v-if="checkIfHasValue(index)"></i>
              </span>
                </span>
      </div>
      <div class="float-right">
        <button type="button" class="btn btn-danger" v-if="$props.value && $props.value.length > 1 && checkIfHasValue(selectedLanguage) && $props.config.enableRemoveBtn">
          <i class="fa fa-trash-alt" @click="removeLanguage()"/>
        </button>
      </div>
    </div>
  </form>
</template>
<script type="ts" src="./multiLanguage.component.ts"></script>

<style scoped>
 .mlbtns .btn-group > .btn-outline-primary {
   border: solid 1px #d0d0d0;
   background-color: #f2f4f8;
   border-left: 0px;
 }
 .mlbtns .btn-group > .btn-outline-primary.active {
   background-color: #007bff;
 }
</style>
