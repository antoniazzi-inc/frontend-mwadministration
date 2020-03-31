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
            <flat-pickr :config="validToConfig" class="single-daterange form-control"
                        id="validToDate" v-model="validToDate"></flat-pickr>
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
