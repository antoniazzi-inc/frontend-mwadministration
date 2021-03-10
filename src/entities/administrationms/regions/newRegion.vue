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
          <h2 v-text="$t('labels.newRegion')"></h2>
          <div class="form-group">
            <label>{{$t('labels.name')}}</label>
            <input type="text" name="name" :class="{'form-control':true, invalid:errors.has('name')}"
                   v-validate="'required'" v-model="region.name">
            <span class="text-danger small">{{errors.first('name')}}</span>
          </div>
          <div class="form-group">
            <div class="row p-0 m-0">
              <div class="col-md-3 p-0 m-0">
                <label>{{$t('labels.home')}}</label>
                <toggle-switch :on-text="$t('labels.yes')"
                               :off-text="$t('labels.no')"
                               :value.sync="region.home"></toggle-switch>
              </div>
              <div class="col-md-3 p-0 m-0">
                <label>{{$t('labels.abroad')}}</label>
                <toggle-switch :on-text="$t('labels.yes')"
                               :off-text="$t('labels.no')"
                               :value.sync="region.abroad"></toggle-switch>
              </div>
              <div class="col-md-3 p-0 m-0">
                <label>{{$t('labels.insideEu')}}</label>
                <toggle-switch :on-text="$t('labels.yes')"
                               :off-text="$t('labels.no')"
                               :value.sync="region.insideEu"></toggle-switch>
              </div>
              <div class="col-md-3 p-0 m-0">
                <label>{{$t('labels.outsideEu')}}</label>
                <toggle-switch :on-text="$t('labels.yes')"
                               :off-text="$t('labels.no')"
                               :value.sync="region.outsideEu"></toggle-switch>
              </div>
            </div>
          </div>
          <div class="form-group">
            <label>{{$t('labels.country')}}</label>
            <searchable-select-component :config="searchableConfig"
                                         :options="$store.state.allCountries"
                                         :value="countries"
                                         @onChange="countryChanged"
                                         @onSelected="countryChanged"
                                         @onDelete="removeCountry"
            ></searchable-select-component>
          </div>
          <div>
            <button type="button" id="cancel-save" class="btn btn-secondary mr-2" v-on:click="cancel()">
              <span v-text="$t('buttons.cancel')">Cancel</span>
            </button>
            <button type="submit" id="save-entity" class="btn btn-primary ml-2">
              <span v-text="$t('buttons.save')">Save</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script type="ts" src="./newRegion.component.ts"></script>
