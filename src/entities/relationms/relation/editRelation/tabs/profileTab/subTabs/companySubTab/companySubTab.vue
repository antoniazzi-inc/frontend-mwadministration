<template>
  <div class="p-3">
    <div class="row" v-if="companies.length && !editMode && !addNewCompany">
      <div class="col-md-6">
        <div class="row" v-for="(item, index) in companies" :key="index">
          <div class="col-md-12">
            <div class="support-index support-tickets">
              <div class="support-ticket">
                <div class="st-body">
                  <div class="avatar"><i style="font-size: 2rem;" class="dashicons dashicons-building"></i></div>
                  <div class="st-meta">
                    <i class="os-icon os-icon-edit" @click="editCompany(item, index)"></i>
                    <div class="os-icon os-icon-trash" @click="deleteCompany(item)"></div>
                  </div>
                  <div class="ticket-content">
                    <h6 class="ticket-title">
                      {{item.name}}
                    </h6>
                    <div class="ticket-description">
                      <span class="label">{{item.description}}</span>
                    </div>
                  </div>
                </div>
                <div class="st-foot">
                  <span class="value">{{getCompanyAddress(item).label}}</span>
                  <br/>
                  <span class="value">{{getCompanyPhone(item)}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row m-3" v-if="companies.length === 0 && !editMode && !addNewCompany">
      <p><b>{{$t('labels.noRelationCompanies')}}</b></p>
    </div>
    <div class="row  m-3" v-if="!addNewCompany">
      <div class="col-md-6">
        <button class="btn btn-outline-primary" @click="createNewCompany">{{$t('buttons.createNewCompany')}}</button>
      </div>
    </div>
    <div class="row m-3" v-if="addNewCompany && !editMode">
      <div class="col-md-12">
        <label>{{$t('labels.company')}}</label>
        <searchable-select-component :config="searchableConfigCompany"
                                     :options="$store.state.lookups.companies"
                                     :value="companyToEdit"
                                     @onChange="companyChanged"
                                     @onSelected="companyChanged"
                                     @onDelete="companyRemoved"
                                     @onCreate="onAddCompany"
        ></searchable-select-component>
      </div>
      <div class="col-md-12 text-right mt-3">
        <button class="btn btn-outline-primary" @click="cancelNewComp">{{$t('buttons.cancel')}}</button>
        <button class="btn btn-primary ml-4" v-if="companyToEdit.id" @click="saveRelationCompany(companyToEdit)">{{$t('buttons.add')}}</button>
      </div>
    </div>
    <div class="row m-3" v-if="addNewCompany && editMode">
      <div class="col">
        <form>
          <div class="form-row mt-3">
            <label>{{$t('labels.companyName')}}</label>
            <input v-validate="'required'" name="company-name"
                   type="text" :class="{'form-control': true, invalid: errors.has('company-name')}"
                   v-model="companyToEdit.name"/>
            <span class="text-danger small">{{errors.first('company-name')}}</span>
          </div>
          <div class="form-row mt-3">
            <label>{{$t('labels.website')}}</label>
            <input v-validate="{url: {require_protocol: false }}" name="company-website" @blur="urlValidate"
                   type="url" :class="{'form-control': true, invalid: errors.has('company-website')}"
                   v-model="companyToEdit.website"/>
            <span class="text-danger small">{{errors.first('company-website')}}</span>
          </div>
          <div class="form-row mt-3">
            <label>{{$t('labels.description')}}</label>
            <textarea cols="5" rows="4" :class="{'form-control': true}" v-model="companyToEdit.description"/>
          </div>
          <div class="form-row mt-3">
            <label>{{$t('labels.vatNumber')}}</label>
            <input @blur="validateVat" type="text" :class="{'form-control': true}"
                   v-model="companyToEdit.vatNumber"/>
            <span class="text-danger small">{{vatError}}</span>
          </div>
          <div class="form-row mt-3">
            <label class="control-label">{{$t('labels.companyPhone')}}</label>
            <div :class="{'input-group': true}">
              <div class="dropdown">
                <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  {{phone.phoneType}}
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <a class="dropdown-item" v-on:click="phone.phoneType=phoneTypes.home" href="#">{{phoneTypes.home}}</a>
                  <a class="dropdown-item" v-on:click="phone.phoneType=phoneTypes.mobile"
                     href="#">{{phoneTypes.mobile}}</a>
                  <a class="dropdown-item" v-on:click="phone.phoneType=phoneTypes.work" href="#">{{phoneTypes.work}}</a>
                </div>
              </div>
              <input type="text" :class="{'form-control': true}" v-model="phone.number">
            </div>
          </div>
          <div class="form-row mt-3">
            <div class="col-md-12">
              <label class="control-label mt-3">{{$t('labels.companyAddress')}}</label>
              <div class="row pl-0 pr-0 m-0">
                <div :class="{'input-group':true, 'col-md-6': true, 'pl-0': true}">
                  <div class="input-group-prepend">
                    <span class="input-group-text">{{$t('labels.street')}}</span>
                  </div>
                  <input type="text" :class="{'form-control': true}" name="street" v-model="address.street">
                </div>
                <div :class="{'input-group':true, 'col-md-6': true, 'pr-0': true}">
                  <div class="input-group-prepend">
                    <span class="input-group-text">{{$t('labels.houseNumber')}}</span>
                  </div>
                  <input type="text" :class="{'form-control': true}" name="number" v-model="address.houseNumber">
                </div>
              </div>
              <div class="row pl-0 pr-0 pt-3 m-0">
                <div :class="{'input-group':true, 'col-md-6': true, 'pl-0': true}">
                  <div class="input-group-prepend">
                    <span class="input-group-text">{{$t('labels.postalCode')}}</span>
                  </div>
                  <input type="text" :class="{'form-control': true}" name="postalCode" v-model="address.postalCode">
                </div>
                <div :class="{'input-group':true, 'col-md-6': true, 'pr-0': true}">
                  <div class="input-group-prepend">
                    <span class="input-group-text">{{$t('labels.city')}}</span>
                  </div>
                  <input type="text" :class="{'form-control': true}" name="city" v-model="address.city">
                </div>
              </div>
              <div class="row pl-0 pr-0 pt-3 m-0">
                <div class="col-md-12 p-0 m-0">
                  <label>{{$t('labels.country')}}</label>
                  <searchable-select-component :config="searchableConfigCountry"
                                               :options="$store.state.allCountries"
                                               :value="selectedCountry"
                                               @onChange="countryChanged"
                                               @onSelected="countryChanged"
                                               @onDelete="countryRemoved"
                  ></searchable-select-component>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-12 text-right mt-3">
            <button class="btn btn-outline-primary" @click="cancelNewComp">{{$t('buttons.cancel')}}</button>
            <button class="btn btn-primary ml-4" @click.prevent.stop="saveCompany">{{$t('buttons.save')}}</button>
          </div>
        </form>
      </div>
    </div>
    <div>
    </div>
  </div>
</template>
<script type="ts" src="./companySubTab.component.ts"></script>
