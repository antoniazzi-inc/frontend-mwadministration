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
