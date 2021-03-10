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
      <div class="col-md-12 mt-2 text-left">
        <form @submit.prevent.stop="save()">
          <h2 v-text="$t('labels.newAdministration')"></h2>
          <div class="form-group">
            <div class="row p-0 m-0">
              <div class="col-md-6 pl-0 ml-0">
                <label>{{$t('labels.validFrom')}}</label>
                <flat-pickr :config="validFromConfig" class="single-daterange form-control"
                            id="validFromDate" v-model="validFrom"></flat-pickr>
              </div>
              <div class="col-md-6 pr-0 mr-0">
                <label>{{$t('labels.validTo')}}</label>
                <div class="dateHolder date-input">
                  <flat-pickr :config="validToConfig" v-model="validTo" class="single-daterange form-control"/>
                  <i class="fa fa-times clearDate cursor-pointer" @click="validTo=null">
                    <span aria-hidden="true" class="sr-only">X</span>
                  </i>
                </div>
              </div>
            </div>
          </div>
          <div class="form-group">
            <div class="row p-0 m-0">
              <div class="col-md-6 pl-0 m-0">
                <label>{{$t('labels.accessCode')}}</label>
                <input type="text" class="form-control" name="accessCode" v-validate="'required'" v-model="administration.accessCode">
                <span class="text-danger small">{{ errors.first('accessCode') }}</span>
              </div>
              <div class="col-md-6 pr-0 m-0">
                <label>{{$t('labels.name')}}</label>
                <input type="text" class="form-control" name="name" v-validate="'required'" v-model="administration.name">
                <span class="text-danger small">{{ errors.first('name') }}</span>
              </div>
            </div>
          </div>
          <div class="form-group">
            <div class="row p-0 m-0 text-center">
              <div class="col-md-3 p-0 m-0">
                <label>{{$t('labels.canUseShop')}}</label>
                <toggle-switch :on-text="$t('labels.yes')"
                               :off-text="$t('labels.no')"
                               :value.sync="administration.useShop"></toggle-switch>
              </div>
              <div class="col-md-3 p-0 m-0">
                <label>{{$t('labels.canUseAutomation')}}</label>
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
              <div class="col-md-3 p-0 m-0">
                <label>{{$t('labels.locked')}}</label>
                <toggle-switch :on-text="$t('labels.yes')"
                               :off-text="$t('labels.no')"
                               :value.sync="administration.locked"></toggle-switch>
              </div>
            </div>
          </div>
          <div class="form-group">
            <div class="row p-0 m-0">
              <div class="col-md-4 pl-0 m-0">
                <label>{{$t('labels.relationsLimit')}}</label>
                <input type="number" class="form-control" name="relationsLimit" v-validate="'required|min_value:1|decimal:0'"
                       v-model="administration.relationsLimit">
                <span class="text-danger small">{{ errors.first('relationsLimit') }}</span>
              </div>
              <div class="col-md-4 pl-0 m-0">
                <label>{{$t('labels.language')}}</label>
                <searchable-select-component :config="searchableConfigLang"
                                             :options="allLanguages"
                                             :value="selectedLanguage"
                                             @onChange="langChanged"
                                             @onDelete="langRemoved"
                ></searchable-select-component>
              </div>
              <div class="col-md-4 pr-0 m-0">
                <label>{{$t('labels.country')}}</label>
                <searchable-select-component :config="searchableConfig"
                                             :options="$store.state.allCountries"
                                             :value="administration.country"
                                             @onChange="countryChanged"
                                             @onDelete="removeCountry"
                ></searchable-select-component>
              </div>
            </div>
          </div>
          <div class="form-group">
            <div class="row p-0 m-0">
              <div class="col-md-4 pl-0 m-0">
                <label>{{$t('labels.emailFirstUser')}}</label>
                <input type="text" :class="{'form-control': true, invalid: errors.has('first-User-Email')}"
                       name="first-User-Email" v-validate="'required|email'" v-model="administrationUser.email">
                <span class="text-danger small">{{errors.first('first-User-Email')}}</span>
              </div>
              <div class="col-md-4 pl-0 m-0">
                <label>{{$t('labels.loginCodeFirstUser')}}</label>
                <input type="text" :class="{'form-control': true, invalid: errors.has('Access-Code')}"
                       name="Access-Code" v-validate="'required'" v-model="administrationUser.accessCode">
                <span class="text-danger small">{{errors.first('Access-Code')}}</span>
              </div>
              <div class="col-md-4 pl-0 m-0">
                <label>{{$t('labels.passwordFirstUser')}}</label>
                <input type="password" :class="{'form-control': true, invalid: errors.has('Password')}" name="Password"
                       v-validate="'required|min:6'" v-model="administrationUser.password" autocomplete="none">
                <span class="text-danger small">{{errors.first('Password')}}</span>
              </div>
            </div>
          </div>
          <div class="form-group" v-if="administration.administrationBusiness">
            <div class="row p-0 m-0">
              <div class="col-md-6 pl-0 m-0">
                <label>{{$t('labels.companyName')}}</label>
                <input type="text" :class="{'form-control': true}"
                       name="companyName" v-model="administration.administrationBusiness.name">
              </div>
              <div class="col-md-6 pl-0 m-0">
                <label>{{$t('labels.companyWebsite')}}</label>
                <input @blur="validateUrl" type="text" v-validate="{url: {require_protocol: false }}" :class="{'form-control': true, invalid: errors.has('Company-Website')}"
                       name="Company-Website" v-model="administration.administrationBusiness.website">
                <span class="text-danger small">{{errors.first('Company-Website')}}</span>
              </div>
            </div>
          </div>
          <div class="text-right">
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
