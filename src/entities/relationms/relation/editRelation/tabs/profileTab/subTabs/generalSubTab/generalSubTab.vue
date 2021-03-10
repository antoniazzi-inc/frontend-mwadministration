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
  <div class="tab-form-panel">
    <form @submit.prevent.stop="saveRelation" v-if="relationProfile">
      <div class="form-row mt-3">
        <div class="col-sm-2">
          <label>{{$t('labels.title')}}</label>
          <input type="text" :class="{'form-control': true, invalid: errors.has('title')}" v-model="relationProfile.title"
                name="title" v-validate="{max:225, regex:validationRegEx}" :placeholder="$t('labels.title')">
          <span class="text-danger small">{{errors.first('title')}}</span>
        </div>
        <div class="col-sm-4">
          <label>{{$t('labels.firstName')}}</label>
          <input type="text" :class="{'form-control': true, invalid: errors.has('firstName')}" v-model="relationProfile.firstName"
                 name="firstName" v-validate="{max:100, regex:validationRegEx}" :placeholder="$t('labels.firstName')">
          <span class="text-danger small">{{errors.first('firstName')}}</span>
        </div>
        <div class="col-sm-2">
          <label>{{$t('labels.middleName')}}</label>
          <input type="text" :class="{'form-control': true, invalid: errors.has('middleName')}" v-model="relationProfile.middleName"
                 name="middleName" v-validate="{max:20, regex:validationRegEx}" :placeholder="$t('labels.middleName')">
          <span class="text-danger small">{{errors.first('middleName')}}</span>
        </div>
        <div class="col-sm-4">
          <label>{{$t('labels.lastName')}}</label>
          <input type="text" :class="{'form-control': true, invalid: errors.has('lastName')}" v-model="relationProfile.lastName"
                 name="lastName" v-validate="{max:225, regex:validationRegEx}" :placeholder="$t('labels.lastName')">
          <span class="text-danger small">{{errors.first('lastName')}}</span>
        </div>
      </div>
      <div class="form-row mt-3">
        <div class="col">
          <label>{{$t('labels.email')}}</label>
          <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text">@</span>
            </div>
            <input type="email" :class="{'form-control': true, invalid: errors.has('email')}" v-model="relation.email"
                   name="email" v-validate="'email|max:225|required'" :placeholder="$t('labels.email')">
          </div>
            <span class="text-danger small">{{errors.first('email')}}</span>
        </div>
        <div class="col">
          <label>{{$t('labels.website')}}</label>
          <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text">
                <i class="fas fa-globe"></i>
              </span>
            </div>
            <input type="url" @blur="validateUrl" :class="{'form-control': true, invalid: errors.has('website')}" v-model="relationProfile.website"
                   name="website" v-validate="'url|max:225'" :placeholder="$t('labels.website')">
          </div>
            <span class="text-danger small">{{errors.first('website')}}</span>
        </div>
      </div>
      <div class="form-row mt-3">
        <div class="col">
          <label>{{$t('labels.category')}}</label>
          <searchable-select-component :config="searchableConfigCat"
                                       :options="$store.state.lookups.categories"
                                       :value="relationCategory"
                                       @onChange="categoryUpdated"
                                       @onSelected="categoryUpdated"
                                       @onDelete="categoryRemoved"
          ></searchable-select-component>
        </div>
        <div class="col">
          <label>{{$t('labels.preferredLanguage')}}</label>
          <select class="form-control" v-model="relation.languageKey">
            <option></option>
            <option v-for="(lang, ind) in allLanguages" :key="ind" :value="lang.value">{{lang.label}}</option>
          </select>
        </div>
        <div class="col">
          <label>{{$t('labels.points')}}</label>
          <input type="number" :class="{'form-control': true, invalid: errors.has('points')}" v-model="relationProfile.points"
                 name="points" v-validate="'numeric|min_value:0'" :placeholder="$t('labels.points')">
          <span class="text-danger small">{{errors.first('points')}}</span>
        </div>
        <div class="col">
          <label>{{$t('labels.blacklisted')}}</label>
          <toggle-switch :on-text="$t('labels.yes')"
                         :off-text="$t('labels.no')"
                         :value.sync="relationProfile.blackListed"></toggle-switch>
        </div>
      </div>
      <div class="form-row mt-3">
        <div class="col-sm-3">
          <label v-html="$t('labels.birthDate')"></label>
          <div class="dateHolder date-input">
            <flat-pickr :config="dateConfig" v-model="birthDate" class="single-daterange form-control"/>
            <i class="fa fa-times clearDate cursor-pointer" @click="birthDate=null">
              <span aria-hidden="true" class="sr-only">X</span>
            </i>
          </div>
        </div>
        <div class="col-sm-2">
          <label v-html="$t('labels.gender')"></label>
          <select class="form-control" v-model="relationProfile.gender">
            <option></option>
            <option value="M">{{$t('labels.male')}}</option>
            <option value="F">{{$t('labels.female')}}</option>
            <option value="-">{{$t('labels.unspecified')}}</option>
          </select>
        </div>
        <div class="col">
          <label>{{$t('labels.company')}}</label>
          <input v-model="relationProfile.companyName" type="text" :class="{'form-control': true, invalid: errors.has('companyName')}" name="companyName"/>
          <span class="text-danger small">{{errors.first('companyName')}}</span>
        </div>
      </div>
      <div class="form-row mt-3">
        <div class="col">
          <label>{{$t('labels.remarks')}}</label>
          <textarea cols="3" rows="4" class="form-control" v-model="relationProfile.description"></textarea>
        </div>
      </div>
      <div class="form-buttons-w text-right mt-3">
        <button type="button" @click="goBack" class="btn btn-outline-primary ml-3">{{$t('buttons.backToList')}}</button>
        <button type="button" @click="resetRel" class="btn btn-primary ml-3">{{$t('buttons.cancel')}}</button>
        <button type="submit" class="btn btn-primary ml-3">{{$t('buttons.save')}}</button>
      </div>
    </form>
  </div>
</template>
<script type="ts" src="./generalSubTab.component.ts"></script>
<style scoped>
</style>
