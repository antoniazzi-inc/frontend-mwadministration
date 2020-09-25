<template>
  <div>

    <div class="pipeline-item" v-if="!editMode && !newAddress" style="margin-bottom:12px;">
      <div class="pi-body">
        <div class="avatar">
          <i class="fa fa-home" v-if="addressCopy.addressType === addressTypes.home"></i>
          <i class="fa fa-envelope" v-if="addressCopy.addressType === addressTypes.postal"></i>
          <i class="fa fa-question" v-if="addressCopy.addressType === addressTypes.other"></i>
          <i class="fa fa-building" v-if="addressCopy.addressType === addressTypes.work"></i>
        </div>
        <div class="pi-info">
          <div class="h6 pi-name">
            {{addressCopy.street}} {{addressCopy.houseNumber}}<br/>
            {{addressCopy.postalCode}} {{addressCopy.city}}
          </div>
          <div class="pi-sub">
            <span v-if="selectedCountry">{{selectedCountry.enName}}</span>
          </div>
        </div>
      </div>
      <div class="pi-foot" style="padding:0px;">
        <div class="tags">
          <i class="text-success fas fa-edit m-2" @click="edit" style="cursor: pointer"></i>
          <div class="fas fa-trash-alt m-2 text-danger" @click="remove" style="cursor: pointer"></div>
        </div>
      </div>
    </div>

    <div v-else class="pipeline-item" >
      <div class="pi-body">
        <form role="form" style="width:100%">
          <div class="row">
            <div class="col-md-9">
              <div :class="{'form-group': true}">
                <label class="control-label">{{$t('labels.street')}}</label>
                <input type="text" :class="{'form-control': true, invalid: errors.has('street')}" v-validate="'required'"
                       v-model="addressCopy.street" name="street"/>
                <span class="text-danger small">{{errors.first('street')}}</span>
              </div>
            </div>
            <div class="col-md-3">
              <div :class="{'form-group': true}">
                <label class="control-label">{{$t('labels.houseNumber')}}</label>
                <input type="text" :class="{'form-control': true, 'invalid': errors.has('number') }"
                       v-model="addressCopy.houseNumber" v-validate="'required'" name="number"/>
                <span class="text-danger small">{{errors.first('number')}}</span>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="form-group col-md-4">
              <label class="control-label">{{$t('labels.postalCode')}}</label>
              <input type="text" :placeholder="$t('labels.postalCode')" v-validate="'required'" @blur="validatePostalCode"
                     :class="{'form-control': true, 'invalid': errors.has('postalCode')}"
                     v-model="addressCopy.postalCode" name="postalCode"/>
              <span class="text-danger small">{{errors.first('postalCode')}}</span>
            </div>
            <div class="form-group col-md-8">
              <label class="control-label">{{$t('labels.city')}}</label>
              <input type="text" :placeholder="$t('city')" v-validate="'required'"
                     :class="{'form-control': true, 'invalid':errors.has('city')}" v-model="addressCopy.city"
                     name="city"/>
              <span class="text-danger small">{{errors.first('city')}}</span>
            </div>
          </div>
          <div class="form-group">
            <label class="control-label">{{$t('labels.country')}}</label>
            <searchable-select-component :config="searchableConfig"
                                         :options="$store.state.allCountries"
                                         :value="selectedCountry"
                                         @onChange="countryChanged"
                                         @onSelected="countryChanged"
            />
          </div>
          <div class="form-group row">
            <div class="col-md-4">
              <label class="control-label text-left">{{$t('labels.addressType')}}</label>
              <select v-validate="'required'" name="address-type" :class="{'form-control': true, invalid: errors.has('address-type') }"
                      v-model="addressCopy.addressType">
                <option value="OTHER">{{$t('labels.other')}}</option>
                <option value="WORK">{{$t('labels.work')}}</option>
                <option value="HOME">{{$t('labels.home')}}</option>
                <option value="POSTAL">{{$t('labels.postal')}}</option>
              </select>
              <span class="text-danger small">{{errors.first('address-type')}}</span>
            </div>
            <div class="col-md-4">
              <label>{{$t('labels.usedForBilling')}}</label>
              <toggle-switch
                id="usedForBilling"
                name="usedForBilling"
                :on-text="$t('labels.yes')"
                :off-text="$t('labels.no')"
                :value.sync="addressCopy.usedForBilling"></toggle-switch>
            </div>
            <div class="col-md-4">
              <label>{{$t('labels.usedForDelivery')}}</label>
              <toggle-switch
                id="usedForDelivery"
                name="usedForDelivery"
                :on-text="$t('labels.yes')"
                :off-text="$t('labels.no')"
                :value.sync="addressCopy.usedForDelivery"></toggle-switch>
            </div>
          </div>
          <div v-if="showMore">
            <div class="form-group row">
              <div class="col-md-6">
                <label class="control-label">{{$t('labels.apartmentNumber')}}</label>
                <input type="text" :class="{'form-control': true}" v-model="addressCopy.appartmentNumber"/>
              </div>
              <div class="col-md-6">
                <label class="control-label">{{$t('labels.entranceNumber')}}</label>
                <input type="text" :class="{'form-control': true}" v-model="addressCopy.entranceNumber"/>
              </div>
            </div>
            <div class="form-group">
              <label class="control-label">{{$t('labels.description')}}</label>
              <textarea rows="2" class="form-control" v-model="addressCopy.description"/>
            </div>
          </div>
          <router-link class="showMoreLink" to="" style="cursor: pointer" @click.native="showMore = !showMore">
            <b v-if="!showMore"><i class="os-icon os-icon-arrow-down"></i>{{$t('labels.showMore')}}</b>
            <b v-if="showMore"><i class="os-icon os-icon-arrow-up2"></i>{{$t('labels.showLess')}}</b>
          </router-link>
          <div class="form-buttons-w text-right">
            <button class="btn btn-outline-primary" @click.prevent="cancel" type="submit"> {{$t('buttons.cancel')}}
            </button>
            <button class="btn btn-primary ml-2" @click.prevent="save" type="submit"><span>{{$t('buttons.save')}}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script lang="ts" src="./addressWidget.component.ts"></script>
<style scoped>
</style>
