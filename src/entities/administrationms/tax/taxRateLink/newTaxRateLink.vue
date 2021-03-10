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
          <h2 v-text="$t('labels.newTaxRateLink')"></h2>
          <div class="form-group">
            <label>{{$t('labels.validFrom')}}</label>
            <flat-pickr :config="validFromConfig" class="single-daterange form-control"
                        id="validFromDate" v-model="validFromDate"></flat-pickr>
          </div>
          <div class="form-group">
            <label>{{$t('labels.validTo')}}</label>
            <div class="dateHolder date-input">
              <flat-pickr :config="validToConfig" v-model="validToDate" class="single-daterange form-control"/>
              <i class="fa fa-times clearDate cursor-pointer" @click="validToDate=null">
                <span aria-hidden="true" class="sr-only">X</span>
              </i>
            </div>
          </div>
          <div class="form-group">
            <label>{{$t('labels.fromTaxRate')}}</label>
            <searchable-select-component :config="searchableConfigFrom"
                                         :options="$store.state.lookups.taxRates"
                                         :value="taxRateLink.fromTaxRate"
                                         @onChange="fromTaxLinkChanged"
                                         @onSelected="fromTaxLinkChanged"
                                         @onDelete="fromTaxLinkRemoved"
            ></searchable-select-component>
          </div>
          <div class="form-group">
            <label>{{$t('labels.toTaxRate')}}</label>
            <searchable-select-component :config="searchableConfigTo"
                                         :options="$store.state.lookups.taxRates"
                                         :value="taxRateLink.toTaxRate"
                                         @onChange="toTaxLinkChanged"
                                         @onSelected="toTaxLinkChanged"
                                         @onDelete="toTaxLinkRemoved"
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
<script type="ts" src="./newTaxRateLink.component.ts"></script>
