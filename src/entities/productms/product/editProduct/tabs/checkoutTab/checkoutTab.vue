<template>
  <div class="tab-form-panel">
    <p>{{$t('labels.productCheckoutSettings')}}</p>
    <ul class="nav nav-tabs" id="myTab" role="tablist">
      <li class="nav-item tab-nav smaller-tab" @click="tabIndex = 0">
        <a :class="{'nav-link': true, 'active': tabIndex === 0}" id="relFields-tab" data-toggle="tab"
           href="#relFields" role="tab" aria-controls="relFields" aria-selected="true">{{$t('labels.relFields')}}</a>
      </li>
      <li class="nav-item tab-nav smaller-tab" @click="tabIndex = 1">
        <a :class="{'nav-link': true, 'active': tabIndex === 1}" id="freeFields-tab" data-toggle="tab"
           href="#freeFields" role="tab" aria-controls="freeFields" aria-selected="true">{{$t('labels.freeFields')}}</a>
      </li>
      <li class="nav-item tab-nav smaller-tab" @click="tabIndex = 2">
        <a :class="{'nav-link': true, 'active': tabIndex === 2}" id="companyAndTaxes-tab" data-toggle="tab"
           href="#companyAndTaxes" role="tab" aria-controls="companyAndTaxes" aria-selected="true">{{$t('labels.companyAndTaxes')}}</a>
      </li>
      <li class="nav-item tab-nav smaller-tab" @click="tabIndex = 3">
        <a :class="{'nav-link': true, 'active': tabIndex === 3}" id="termsAndConditions-tab" data-toggle="tab"
           href="#termsAndConditions" role="tab" aria-controls="termsAndConditions" aria-selected="true">{{$t('labels.termsAndConditions')}}</a>
      </li>
    </ul>
    <div class="tab-content">
      <div :class="{'tab-pane': true, 'active': tabIndex === 0}" id="relFields" role="tabpanel"
           aria-labelledby="relFields-tab">
        <div class="row mt-4">
          <div class="col-md-6">
            <h4>{{$t('labels.billingAddress')}}</h4>
            <table class="table table-striped">
              <thead>
              <th>{{$t('labels.name')}}</th>
              <th>{{$t('labels.visible')}}</th>
              <th>{{$t('labels.required')}}</th>
              </thead>
              <tbody>
              <tr v-for="(item, index) in registrationSettingsJson.billingAddress" :key="index">
                <td>{{$t('labels.' + item.name)}}</td>
                <td>
                  <toggle-switch
                    :on-text="$t('labels.yes')"
                    :off-text="$t('labels.no')"
                    :value.sync="item.visible"/>
                </td>
                <td>
                  <toggle-switch
                    :on-text="$t('labels.yes')"
                    :off-text="$t('labels.no')"
                    :value.sync="item.required"/>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
          <div class="col-md-6">
            <h4>{{$t('labels.deliveryAddress')}}</h4>
            <table class="table table-striped">
              <thead>
              <th>{{$t('labels.name')}}</th>
              <th>{{$t('labels.visible')}}</th>
              <th>{{$t('labels.required')}}</th>
              </thead>
              <tbody>
              <tr v-for="(item, index) in registrationSettingsJson.deliveryAddress" :key="index">
                <td>{{$t('labels.' + item.name)}}</td>
                <td>
                  <toggle-switch
                    :on-text="$t('labels.yes')"
                    :off-text="$t('labels.no')"
                    :value.sync="item.visible"/>
                </td>
                <td>
                  <toggle-switch
                    :on-text="$t('labels.yes')"
                    :off-text="$t('labels.no')"
                    :value.sync="item.required"/>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
        <hr/>
        <div class="row mt-3">
          <div class="col-md-12">
            <h4>{{$t('labels.relationFields')}}</h4>
            <table class="table table-striped">
              <thead>
              <th>{{$t('labels.name')}}</th>
              <th>{{$t('labels.visible')}}</th>
              <th>{{$t('labels.required')}}</th>
              </thead>
              <tbody>
              <tr v-for="(item, index) in registrationSettingsJson.relationFields" :key="index">
                <td>{{$t('labels.' + item.name)}}</td>
                <td>
                  <toggle-switch
                    :on-text="$t('labels.yes')"
                    :off-text="$t('labels.no')"
                    :value.sync="item.visible"/>
                </td>
                <td>
                  <toggle-switch
                    :on-text="$t('labels.yes')"
                    :off-text="$t('labels.no')"
                    :value.sync="item.required"/>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="form-buttons-w text-right mt-3">
          <button type="button" @click="goBack" class="btn btn-outline-primary ml-3">{{$t('buttons.backToList')}}</button>
          <button class="btn btn-primary" @click.prevent="save">{{$t('buttons.save')}}</button>
        </div>
      </div>
      <div :class="{'tab-pane': true, 'active': tabIndex === 1}" id="freeFields" role="tabpanel"
           aria-labelledby="freeFields-tab">
        <table class="table table-striped" style="margin-top:2em;">
          <thead>
          <th>{{$t('labels.name')}}</th>
          <th>{{$t('labels.visible')}}</th>
          <th>{{$t('labels.required')}}</th>
          <th>{{$t('labels.usseInInvoice')}}</th>
          </thead>
          <tbody>

          <tr v-for="(item, index) in registrationSettingsJson.freeFields" :key="index">
            <td>{{item.label}}</td>
            <td>
              <toggle-switch
                :on-text="$t('labels.yes')"
                :off-text="$t('labels.no')"
                :value.sync="item.visible"/>
            </td>
            <td>
              <toggle-switch
                :on-text="$t('labels.yes')"
                :off-text="$t('labels.no')"
                :value.sync="item.required"/>
            </td>
            <td>
              <toggle-switch
                :on-text="$t('labels.yes')"
                :off-text="$t('labels.no')"
                :value.sync="item.useInInvoice"/>
            </td>
          </tr>
          </tbody>
        </table>
        <div v-if="registrationSettingsJson.freeFields && registrationSettingsJson.freeFields.length"
             class="row align-items-center h-100 mt-3 mb-3">
          <div class="col-md-7">
            <div class="form-inline pull-right">
              <label class="form-control-label items-per-page"> {{ $t('labels.itemsPerPage') }}</label>
              <select class="form-control input-sm -page-size-select ml-2" v-model="itemsPerPage"
                      @change="page = 1">
                <option :value=10>10</option>
                <option :value=20>20</option>
                <option :value=50>50</option>
                <option :value=100>100</option>
              </select>
            </div>
          </div>
        </div>
        <div class="form-buttons-w text-right mt-3">
          <button type="button" @click="goBack" class="btn btn-outline-primary ml-3">{{$t('buttons.backToList')}}</button>
          <button class="btn btn-primary" @click.prevent="save">{{$t('buttons.save')}}</button>
        </div>
      </div>
      <div :class="{'tab-pane': true, 'active': tabIndex === 2}" id="companyAndTaxes" role="tabpanel"
           aria-labelledby="companyAndTaxes-tab">
        <form>
          <div class="row mt-4">
            <div class="form-group col-md-6">
              <label class="form-control-label">{{$t('labels.orderAsCompany')}}</label>
              <toggle-switch
                :on-text="$t('labels.yes')"
                :off-text="$t('labels.no')"
                :value.sync="registrationSettingsJson.companyAndTaxes.orderAsCompany"/>
            </div>
          </div>

          <div class="form-row align-items-left" v-show="registrationSettingsJson.companyAndTaxes.orderAsCompany">
            <div class="col-auto" style="padding-top:2em; margin-right:20px;">
              {{$t('labels.companyName')}}
            </div>
            <div class="form-group col-auto">
              <label class="form-control-label">{{$t('labels.visible')}}</label>
              <toggle-switch
                :on-text="$t('labels.yes')"
                :off-text="$t('labels.no')"
                :value.sync="registrationSettingsJson.companyAndTaxes.companyName.visible"/>
            </div>
            <div class="form-group col-auto">
              <label class="form-control-label">{{$t('labels.required')}}</label>
              <toggle-switch
                :on-text="$t('labels.yes')"
                :off-text="$t('labels.no')"
                :value.sync="registrationSettingsJson.companyAndTaxes.companyName.required"/>
            </div>
          </div>

          <div class="form-row align-items-left" style="margin-top:2em; margin-bottom:3em; " v-show="registrationSettingsJson.companyAndTaxes.orderAsCompany">
            <div class="col-auto" style="padding-top:2em; margin-right:40px;">
              {{$t('labels.vatNumber')}}
            </div>
            <div class="col-auto">
              <label class="form-control-label">{{$t('labels.visible')}}</label>
              <toggle-switch
                :on-text="$t('labels.yes')"
                :off-text="$t('labels.no')"
                :value.sync="registrationSettingsJson.companyAndTaxes.vatNumber.visible"/>
            </div>
            <div class="col-auto">
              <label class="form-control-label">{{$t('labels.required')}}</label>
              <toggle-switch
                :on-text="$t('labels.yes')"
                :off-text="$t('labels.no')"
                :value.sync="registrationSettingsJson.companyAndTaxes.vatNumber.required"/>
            </div>
          </div>

          <div class="row" v-show="registrationSettingsJson.companyAndTaxes.orderAsCompany">
            <div class="form-group col-md-6">
              <label class="form-control-label">{{$t('labels.vatCalculation')}}</label>
              <input type="text" class="form-control"
                     v-model="registrationSettingsJson.companyAndTaxes.vatCalculation"/>
            </div>
          </div>

          <div class="form-buttons-w text-right mt-3">
            <button type="button" @click="goBack" class="btn btn-outline-primary ml-3">{{$t('buttons.backToList')}}</button>
            <button class="btn btn-primary" @click.prevent="save">{{$t('buttons.save')}}</button>
          </div>

        </form>
      </div>
      <div :class="{'tab-pane': true, 'active': tabIndex === 3}" id="termsAndConditions" role="tabpanel"
           aria-labelledby="termsAndConditions-tab">
        <form>
          <div class="row mt-4">
            <div class="form-group col-md-6">
              <label class="form-control-label">{{$t('labels.agreeConditions')}}</label>
              <toggle-switch
                :on-text="$t('labels.yes')"
                :off-text="$t('labels.no')"
                :value.sync="termsAndConditions.agreeConditions"/>
            </div>
            <div class="form-group col-md-6">
              <label class="form-control-label">{{$t('labels.agreePrivacyStatement')}}</label>
              <toggle-switch
                :on-text="$t('labels.yes')"
                :off-text="$t('labels.no')"
                :value.sync="termsAndConditions.agreePrivacyStatement"/>
            </div>
          </div>
          <div class="row">
            <div class="form-group col-md-6">
              <label class="form-control-label">{{$t('labels.linkToConditions')}}</label>
              <input type="text" class="form-control" @blur="checkForHttps($event, 'linkToPrivacyStatement')"
                     v-model="termsAndConditions.linkToPrivacyStatement"/>
            </div>
            <div class="form-group col-md-6">
              <label class="form-control-label">{{$t('labels.linkToPrivacyStatement')}}</label>
              <input type="text" class="form-control" @blur="checkForHttps($event, 'privacyStatement')"
                     v-model="termsAndConditions.privacyStatement"/>
            </div>
          </div>
          <div class="row">
            <div class="form-group col-md-6">
              <multi-language-component
                :config="multiLangConfig"
                :value="termsAndConditions.conditionsLinkText"
                @onAdd="addNewConditionsLinkText"
                @onChange="changeConditionsLinkText"
                @onRemove="removeConditionsLinkText"/>
            </div>
            <div class="form-group col-md-6">
              <multi-language-component
                :config="multiLangConfig"
                :value="termsAndConditions.privacyStatementLinkText"
                @onAdd="addNewPrivacyStatementLinkText"
                @onChange="changePrivacyStatementLinkText"
                @onRemove="removePrivacyStatementLinkText"/>
            </div>
          </div>
          <div class="form-buttons-w text-right mt-3">
            <button type="button" @click="goBack" class="btn btn-outline-primary ml-3">{{$t('buttons.backToList')}}</button>
            <button class="btn btn-primary" @click.prevent="saveTermsAndConditions">{{$t('buttons.save')}}</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script lang="ts" src="./checkoutTab.component.ts"></script>
<style>
  .switch {
    margin: 0 !important;
  }
  .smaller-tab {
    font-size:1.1em;
  }
</style>
