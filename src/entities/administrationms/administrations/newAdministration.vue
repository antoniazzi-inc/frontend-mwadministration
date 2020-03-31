<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-md-8 mt-4 text-left">
        <form @submit.prevent.stop="save()">
          <h2 v-text="$t('labels.newAdministration')"></h2>
          <div class="form-group">
            <label>{{$t('labels.name')}}</label>
            <input type="text" class="form-control" name="name" v-validate="'required'" v-model="administration.name">
            <span class="text-danger small">{{ errors.first('name') }}</span>
          </div>
          <div class="form-group">
            <label>{{$t('labels.accessCode')}}</label>
            <input type="text" class="form-control" name="accessCode" v-validate="'required'" v-model="administration.accessCode">
            <span class="text-danger small">{{ errors.first('accessCode') }}</span>
          </div>
          <div class="form-group">
            <div class="row p-0 m-0">
              <div class="col-md-3 p-0 m-0">
                <label>{{$t('labels.locked')}}</label>
                <toggle-switch :on-text="$t('labels.yes')"
                               :off-text="$t('labels.no')"
                               :value.sync="administration.locked"></toggle-switch>
              </div>
              <div class="col-md-3 p-0 m-0">
                <label>{{$t('labels.useShop')}}</label>
                <toggle-switch :on-text="$t('labels.yes')"
                               :off-text="$t('labels.no')"
                               :value.sync="administration.useShop"></toggle-switch>
              </div>
              <div class="col-md-3 p-0 m-0">
                <label>{{$t('labels.useAutomation')}}</label>
                <toggle-switch :on-text="$t('labels.yes')"
                               :off-text="$t('labels.no')"
                               :value.sync="administration.useAutomation"></toggle-switch>
              </div>
              <div class="col-md-3 p-0 m-0">
                <label>{{$t('labels.trial')}}</label>
                <toggle-switch :on-text="$t('labels.yes')"
                               :off-text="$t('labels.no')"
                               :value.sync="administration.trial"></toggle-switch>
              </div>
            </div>
          </div>
          <div class="form-group">
            <label>{{$t('labels.relationsLimit')}}</label>
            <input type="number" class="form-control" name="relationsLimit" v-validate="'required|min_value:1|decimal:0'"
                   v-model="administration.relationsLimit">
            <span class="text-danger small">{{ errors.first('relationsLimit') }}</span>
          </div>
          <div class="form-group">
            <div class="row p-0 m-0">
              <div class="col-md-6 pl-0 ml-0">
                <label>{{$t('labels.validFrom')}}</label>
                <flat-pickr :config="validFromConfig" class="single-daterange form-control"
                            id="validFromDate" v-model="validFrom"></flat-pickr>
              </div>
              <div class="col-md-6 pr-0 mr-0">
                <label>{{$t('labels.validTo')}}</label>
                <flat-pickr :config="validToConfig" class="single-daterange form-control"
                            id="validToDate" v-model="validTo"></flat-pickr>
              </div>
            </div>
          </div>
          <!--<div class="form-group">
            <label>{{$t('labels.settingKey')}}</label>
            <input type="text" class="form-control" v-model="administration.administrationSettings.settingKey">
          </div>
          <div class="form-group">
            <label>{{$t('labels.settingValueJson')}}</label>
            <input type="text" class="form-control" v-model="administration.administrationSettings.settingValueJson">
          </div>-->
          <div class="form-group">
            <label>{{$t('labels.language')}}</label>
            <searchable-select-component :config="searchableConfigLang"
                                         :options="allLanguages"
                                         :value="selectedLanguage"
                                         @onChange="langChanged"
                                         @onDelete="langRemoved"
            ></searchable-select-component>
          </div>
          <div class="form-group">
            <label>{{$t('labels.country')}}</label>
            <searchable-select-component :config="searchableConfig"
                                         :options="$store.state.allCountries"
                                         :value="administration.country"
                                         @onChange="countryChanged"
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
<script type="ts" src="./newAdministration.component.ts"></script>
