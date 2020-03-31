<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-md-8 mt-4 text-left">
        <form @submit.prevent.stop="save()">
          <h2 v-text="$t('labels.newTaxRate')"></h2>
          <div class="form-group">
            <label>{{$t('labels.level')}}</label>
            <input type="number" name="level" :class="{'form-control':true, invalid: errors.has('level')}"
                   v-model="taxRate.level" v-validate="'required|min_value:0|max_value:5'">
          </div>
          <span class="text-danger small">{{errors.first('level')}}</span>
          <div class="form-group">
            <label>{{$t('labels.rate')}}</label>
            <money type="text" class="form-control" v-bind="moneyConfig" v-model="taxRate.rate"/>
          </div>
          <div class="form-group">
            <label>{{$t('labels.validFrom')}}</label>
            <flat-pickr :config="validFromConfig" class="single-daterange form-control"
                        id="validFromDate" v-model="validFromDate"></flat-pickr>
          </div>
          <div class="form-group">
            <label>{{$t('labels.validTo')}}</label>
            <flat-pickr :config="validToConfig" class="single-daterange form-control"
                        id="validToDate" v-model="validToDate"></flat-pickr>
          </div>
          <div class="form-group">
            <label>{{$t('labels.country')}}</label>
            <searchable-select-component :config="searchableConfig"
                                         :options="$store.state.allCountries"
                                         :value="taxRate.country"
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
<script type="ts" src="./newTaxRate.component.ts"></script>
