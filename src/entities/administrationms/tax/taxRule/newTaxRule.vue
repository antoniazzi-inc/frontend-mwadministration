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
    <div class="row justify-content-center">
      <div class="col-md-8 mt-4 text-left">
        <form @submit.prevent.stop="save()">
          <h2 v-text="$t('labels.newTaxRule')"></h2>
          <div class="form-group">
            <label>{{$t('labels.customerType')}}</label>
            <select class="form-control" v-model="taxRule.customerType">
              <option :value="customerType.all">{{$t('labels.all')}}</option>
              <option :value="customerType.private">{{$t('labels.private')}}</option>
              <option :value="customerType.company">{{$t('labels.company')}}</option>
            </select>
          </div>
          <div class="form-group">
            <label>{{$t('labels.customerRegion')}}</label>
            <select :class="{'form-control':true, invalid: errors.has('region')}" v-model="taxRule.customerRegion"
                    name="region" v-validate="'required'">
              <option :value="customerRegion.all">{{$t('labels.all')}}</option>
              <option :value="customerRegion.sameCountry">{{$t('labels.sameCountry')}}</option>
              <option :value="customerRegion.otherCountryEu">{{$t('labels.otherCountryEU')}}</option>
              <option :value="customerRegion.otherCountryWorld">{{$t('labels.otherCountryWorld')}}</option>
            </select>
            <span class="text-danger small">{{errors.first('region')}}</span>
          </div>
          <div class="form-group">
            <label>{{$t('labels.ruleType')}}</label>
            <input type="text" name="ruleType" v-validate="'required'"
                   :class="{'form-control':true, invalid: errors.has('ruleType')}" v-model="taxRule.ruleType">
            <span class="text-danger small">{{errors.first('ruleType')}}</span>
          </div>
          <div class="form-group">
            <label>{{$t('labels.ruleJSON')}}</label>
            <input type="text" name="ruleJson" v-validate="'required'"
                   :class="{'form-control':true, invalid: errors.has('ruleJson')}" v-model="taxRule.ruleJson">
            <span class="text-danger small">{{errors.first('ruleJson')}}</span>
          </div>
          <div class="form-group">
            <label>{{$t('labels.country')}}</label>
            <searchable-select-component :config="searchableConfig"
                                         :options="$store.state.allCountries"
                                         :value="taxRule.country"
                                         @onChange="countryChanged"
                                         @onSelected="countryChanged"
                                         @onDelete="countryRemoved"
            ></searchable-select-component>
          </div>
              <button type="button" id="cancel-save" class="btn btn-secondary mr-2" v-on:click="cancel()">
                <span v-text="$t('buttons.cancel')">Cancel</span>
              </button>
              <button type="submit" id="save-entity" class="btn btn-primary ml-2">
                <span v-text="$t('buttons.save')">Save</span>
              </button>
        </form>
      </div>
      </div>
  </div>
</template>
<script type="ts" src="./newTaxRule.component.ts"></script>
