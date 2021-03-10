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
    <div class="row">
      <div class="col-md-6">
        <div class="form-group col-md-12">
          <h3 class="form-control-label">{{ $t('labels.customer') }}</h3>
          <searchable-select-component :config="singleSelectConfig"
                                       :options="allRelations"
                                       :value="selectedRelation"
                                       @onChange="relationsChanged"
                                       @onSearch="searchRelation"
                                       @onDelete="removeRelation"/>
        </div>
        <div class="form-group col-md-12" v-if="selectedRelation && selectedRelation.relationProfile">
          <label class="sr-only"> {{ $t('labels.email') }}</label>
          <input v-validate="'required|email'" name="email" v-model="selectedRelation.email"
                 :disabled="selectedRelation && selectedRelation.id"
                 :class="{'form-control mb-2 mt-2 mr-sm-1 mb-sm-0': true, invalid: errors.has('email')}"
                 :placeholder="$t('labels.email')" type="text"/>
          <span class="small text-danger">{{ errors.first('email') }}</span>
        </div>
        <div class="form-group col-md-12">
          <form class="form-inline" v-if="selectedRelation && selectedRelation.relationProfile">
            <label class="sr-only"> {{ $t('labels.title') }}</label>
            <input v-model="selectedRelation.relationProfile.title" style="width: 100px"
                   class="form-control mb-2 mt-2 mr-sm-1 mb-sm-0" :placeholder="$t('labels.title')" type="text">
            <label class="sr-only"> {{ $t('labels.firstName') }}</label>
            <input v-model="selectedRelation.relationProfile.firstName" class="form-control mt-2 mb-2 mr-sm-1 mb-sm-0"
                   :placeholder="$t('labels.firstName')" style="min-width:10em" type="text">
            <label class="sr-only">{{ $t('labels.middleName') }}</label>
            <input v-model="selectedRelation.relationProfile.middleName" class="form-control mt-2 mb-2 mr-sm-1 mb-sm-0"
                   placeholder="" type="text" style="max-width: 6em">
            <label class="sr-only"> {{ $t('labels.lastName') }}</label>
            <input v-model="selectedRelation.relationProfile.lastName" v-validate="'required'" name="lastName"
                   :class="{'form-control mb-2 mt-2 mr-sm-1 mb-sm-0': true, invalid: errors.has('lastName')}"
                   :placeholder="$t('labels.lastName')" style="min-width:20em" type="text">
          </form>
          <span class="small text-danger">{{ errors.first('lastName') }}</span>
        </div>
        <div class="row pl-3">
          <div class="modal" data-backdrop="static" data-keyboard="false" id="addCompany" tabindex="-1" role="dialog" ref="addCompany">
            <div class="modal-dialog modal-lg" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5>{{$t('labels.addNewCompany')}}</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <form data-vv-scope="newCompanyForm">
                    <div class="form-row mt-3">
                      <label>{{$t('labels.companyName')}}</label>
                      <input v-validate="'required'" name="company-name"
                             type="text" :class="{'form-control': true, invalid: errors.has('newCompanyForm.company-name')}"
                             v-model="newCompany.name"/>
                      <span class="text-danger small">{{errors.first('newCompanyForm.company-name')}}</span>
                    </div>
                    <div class="form-row mt-3">
                      <label>{{$t('labels.website')}}</label>
                      <input v-validate="{url: {require_protocol: false }}" name="company-website" @blur="urlValidate"
                             type="url" :class="{'form-control': true, invalid: errors.has('newCompanyForm.company-website')}"
                             v-model="newCompany.website"/>
                      <span class="text-danger small">{{errors.first('newCompanyForm.company-website')}}</span>
                    </div>
                    <div class="form-row mt-3">
                      <label>{{$t('labels.description')}}</label>
                      <textarea cols="5" rows="4" :class="{'form-control': true}" v-model="newCompany.description"/>
                    </div>
                    <div class="form-row mt-3">
                      <label>{{$t('labels.vatNumber')}}</label>
                      <input @blur="validateVat" type="text" :class="{'form-control': true}"
                             v-model="cartOrderCopy.orderCustomer.vatNumber"/>
                    </div>
                    <div class="form-row mt-3">
                      <label class="control-label">{{$t('labels.companyPhone')}}</label>
                      <div :class="{'input-group': true}">
                        <div class="dropdown">
                          <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton"
                                  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {{newCompany.phoneType}}
                          </button>
                          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <a class="dropdown-item" v-on:click="newCompany.phoneType=phoneTypes.home" href="#">{{phoneTypes.home}}</a>
                            <a class="dropdown-item" v-on:click="newCompany.phoneType=phoneTypes.mobile"
                               href="#">{{phoneTypes.mobile}}</a>
                            <a class="dropdown-item" v-on:click="newCompany.phoneType=phoneTypes.work" href="#">{{phoneTypes.work}}</a>
                          </div>
                        </div>
                        <input type="text" :class="{'form-control': true}" v-model="newCompany.phoneNumber">
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
                            <input type="text" :class="{'form-control': true}" name="street" v-model="newCompany.addressStreet">
                          </div>
                          <div :class="{'input-group':true, 'col-md-6': true, 'pr-0': true}">
                            <div class="input-group-prepend">
                              <span class="input-group-text">{{$t('labels.houseNumber')}}</span>
                            </div>
                            <input type="text" :class="{'form-control': true}" name="number" v-model="newCompany.addressHouseNumber">
                          </div>
                        </div>
                        <div class="row pl-0 pr-0 pt-3 m-0">
                          <div :class="{'input-group':true, 'col-md-6': true, 'pl-0': true}">
                            <div class="input-group-prepend">
                              <span class="input-group-text">{{$t('labels.postalCode')}}</span>
                            </div>
                            <input type="text" :class="{'form-control': true}" name="postalCode" v-model="newCompany.postalCode">
                          </div>
                          <div :class="{'input-group':true, 'col-md-6': true, 'pr-0': true}">
                            <div class="input-group-prepend">
                              <span class="input-group-text">{{$t('labels.city')}}</span>
                            </div>
                            <input type="text" :class="{'form-control': true}" name="city" v-model="newCompany.city">
                          </div>
                        </div>
                        <div class="row pl-0 pr-0 pt-3 m-0">
                          <div class="col-md-12 p-0 m-0">
                            <label>{{$t('labels.country')}}</label>
                            <searchable-select-component :config="searchableConfig"
                                                         :options="$store.state.allCountries"
                                                         :value="newCompanyCountry"
                                                         @onChange="companyCountryChanged"
                                                         @onDelete="companyCountryRemoved"/>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                  <div class="row">
                    <div class="col-md-12 mt-4 text-right">
                      <span class="text-danger small">{{newCompanyError}}</span>
                    </div>
                  </div>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-primary" @click="saveNewCompany">
                    {{$t('buttons.confirm')}}
                  </button>
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">{{$t('buttons.cancel')}}</button>
                </div>
              </div>
            </div>
          </div>
          <div class="form-group col-md-2">
            <label>{{ $t('labels.isCompany') }}</label>
            <toggle-switch
              :on-text="$t('labels.yes')"
              :off-text="$t('labels.no')"
              :value.sync="isCompany"/>
          </div>
          <div class="col-md-10" v-if="isCompany">
            <label class="form-control-label">{{ $t('labels.company') }}</label>
            <input type="text" class="form-control" v-model="companyName">
          </div>
          <div class="form-group col-md-6 mt-3" v-if="isCompany">
            <label class="form-control-label">{{ $t('labels.vatNumber') }}</label>
            <input v-model="cartOrderCopy.orderCustomer.vatNumber" class="form-control mt-2 mb-2 mr-sm-1 mb-sm-0"
                   :placeholder="$t('labels.vatNumber')" type="text">
          </div>
          <div class="form-group col-md-6 mt-3" v-if="isCompany">
            <label class="form-control-label">{{ $t('labels.applicableTaxRulings') }}</label>
            <select class="form-control mt-2 mb-2 mr-sm-1 mb-sm-0" v-model="cartOrderCopy.orderCustomer.taxRulesJson">
              <option value="vat">{{ $t('labels.vat') }}</option>
              <option value="reverse">{{ $t('labels.reverseCharged') }}</option>
              <option value="notApplicable">{{ $t('labels.notApplicable') }}</option>
              <option value="noVat">{{ $t('labels.noVat') }}</option>
              <option value="euVat">{{ $t('labels.euvat') }}</option>
            </select>
          </div>
        </div>
        <div class="row pl-3">
          <div class="form-group col-md-12">
            <label class="form-control-label">{{ $t('labels.addressToUse') }}</label>
            <select class="form-control mt-2 mb-2 mr-sm-1 mb-sm-0" v-model="addressToUseInInvoice">
              <option value="relation">{{$t('labels.relationAddress')}}</option>
              <option v-if="isCompany" value="company">{{$t('labels.companyAddress')}}</option>
              <option value="new">{{$t('labels.newAddress')}}</option>
            </select>
          </div>
        </div>
        <div class="row pl-3 mt-2" v-if="cartOrderCopy.customerBillingAddress">
          <div class="col-md-8">
            <label class="form-control-label">{{ $t('labels.street') }}</label>
            <input type="text" class="form-control" v-model="cartOrderCopy.customerBillingAddress.street"/>
          </div>
          <div class="col-md-4">
            <label class="form-control-label">{{ $t('labels.houseNumber') }}</label>
            <input type="text" class="form-control" v-model="cartOrderCopy.customerBillingAddress.houseNumber"/>
          </div>
        </div>
        <div class="row pl-3 mt-2" v-if="cartOrderCopy.customerBillingAddress">
          <div class="col-md-2">
            <label class="form-control-label">{{ $t('labels.postalCode') }}</label>
            <input type="text" class="form-control" v-model="cartOrderCopy.customerBillingAddress.postalCode"/>
          </div>
          <div class="col-md-5" v-if="cartOrderCopy.customerBillingAddress">
            <label class="form-control-label">{{ $t('labels.city') }}</label>
            <input type="text" class="form-control" v-model="cartOrderCopy.customerBillingAddress.city"/>
          </div>
          <div class="col-md-5" v-if="cartOrderCopy.customerBillingAddress">
            <label class="form-control-label">{{ $t('labels.country') }}</label>
            <searchable-select-component :config="searchableConfig"
               :options="$store.state.allCountries"
               :value="selectedBillingCountry"
               @onChange="billingCountryChanged"
               @onDelete="billingCountryRemoved"/>
          </div>
        </div>
        <div class="col-md-12 mt-3">
        <div class="form-group">
          <label class="control-label">{{$t('labels.isDeliverSameAsBilling')}}</label>
          <toggle-switch
            :on-text="$t('labels.yes')"
            :off-text="$t('labels.no')"
            :value.sync="isDeliveryBilling"/>
        </div>
        </div>
        <div class="col-md-12 pl-3" v-if="!isDeliveryBilling">
          <div class="row pl-3 mt-2" v-if="cartOrderCopy.customerDeliveryAddress">
            <div class="col-md-8">
              <label class="form-control-label">{{ $t('labels.street') }}</label>
              <input type="text" class="form-control" v-model="cartOrderCopy.customerDeliveryAddress.street"/>
            </div>
            <div class="col-md-4">
              <label class="form-control-label">{{ $t('labels.houseNumber') }}</label>
              <input type="text" class="form-control" v-model="cartOrderCopy.customerDeliveryAddress.houseNumber"/>
            </div>
          </div>
          <div class="row pl-3 mt-2" v-if="cartOrderCopy.customerBillingAddress">
            <div class="col-md-2">
              <label class="form-control-label">{{ $t('labels.postalCode') }}</label>
              <input type="text" class="form-control" v-model="cartOrderCopy.customerDeliveryAddress.postalCode"/>
            </div>
            <div class="col-md-5" v-if="cartOrderCopy.customerBillingAddress">
              <label class="form-control-label">{{ $t('labels.city') }}</label>
              <input type="text" class="form-control" v-model="cartOrderCopy.customerDeliveryAddress.city"/>
            </div>
            <div class="col-md-5" v-if="cartOrderCopy.customerBillingAddress">
              <label class="form-control-label">{{ $t('labels.country') }}</label>
              <searchable-select-component :config="searchableConfig"
                 :options="$store.state.allCountries"
                 :value="selectedDeliveryCountry"
                 @onChange="deliveryCountryChanged"
                 @onDelete="deliveryCountryRemoved"/>
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-1">
      </div>

      <div class="col-md-5">
        <div class="row p-0 m-0">
          <div class="col-md-12">
            <h3 class="form-control-label">{{ $t('labels.beneficiary') }}</h3>
          </div>
        </div>
        <div class="row p-0 m-0">
          <div class="col-md-12">{{$t('labels.customerIsAlreadyABeneficiary')}}</div>
          <div class="col-auto mt-3">
            <button type="button" @click="addNewBeneficiary" data-toggle="modal" data-target="#addNewBeneficiary" class="btn btn-outline-primary">{{$t('buttons.addNewBeneficiary')}}</button>
          </div>
        </div>
        <div class="modal" data-backdrop="static" data-keyboard="false" id="addNewBeneficiary" tabindex="-1" role="dialog" ref="addNewBeneficiary">
          <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5>{{$t('labels.beneficiary')}}</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div class="mt-4">
                  <div class="mt-4">
                    <div class="form-group" v-if="!createNewBeneficiary">
                      <label class="form-control-label">{{$t('labels.orderBeneficiary')}}</label>
                      <searchable-select-component :config="singleSelectConfig"
                         :options="allRelations"
                         :value="selectedBeneficiaryRelation"
                         @onChange="addBeneficiaryRelation"
                         @onSearch="searchRelation"
                         @onDelete="removeBeneficiaryRelation"/>
                    </div>
                    <div class="form-group">
                      <button class="btn btn-outline-primary" type="button" v-if="createNewBeneficiary === false" @click.prevent="(createNewBeneficiary) ? createNewBeneficiary = false : createNewBeneficiary = true"> {{$t('labels.createNewBeneficiary')}}</button>
                      <button class="btn btn-outline-primary" type="button" v-if="createNewBeneficiary === true" @click.prevent="createNewBeneficiary = false"> {{$t('buttons.cancel')}}</button>
                    </div>
                    <label class="sr-only"> {{ $t('labels.email') }}</label>
                    <input v-validate="'required|email'" name="emailBeneficiary" v-model="selectedBeneficiaryRelation.email"
                           :disabled="selectedBeneficiaryRelation && selectedBeneficiaryRelation.id"
                           :class="{'form-control mb-2 mt-2 mr-sm-1 mb-sm-0': true, invalid: errors.has('emailBeneficiary')}"
                           :placeholder="$t('labels.email')" type="text">
                    <form class="form-inline" v-if="selectedBeneficiaryRelation">
                      <label class="sr-only"> {{ $t('labels.title') }}</label>
                      <input v-model="selectedBeneficiaryRelation.relationProfile.title" style="width: 4em"
                             class="form-control mb-2 mt-2 mr-sm-1 mb-sm-0" :placeholder="$t('labels.title')" type="text">
                      <label class="sr-only"> {{ $t('labels.firstName') }}</label>
                      <input v-model="selectedBeneficiaryRelation.relationProfile.firstName" class="form-control mt-2 mb-2 mr-sm-1 mb-sm-0"
                             :placeholder="$t('labels.firstName')" type="text" style="min-width:10em">
                      <label class="sr-only">{{ $t('labels.middleName') }}</label>
                      <input v-model="selectedBeneficiaryRelation.relationProfile.middleName" class="form-control mt-2 mb-2 mr-sm-1 mb-sm-0"
                             placeholder="" type="text" style="max-width:6em">
                      <label class="sr-only"> {{ $t('labels.lastName') }}</label>
                      <input v-model="selectedBeneficiaryRelation.relationProfile.lastName" v-validate="'required'" name="lastNameBeneficiary"
                             :class="{'form-control mb-2 mt-2 mr-sm-1 mb-sm-0': true, invalid: errors.has('lastNameBeneficiary')}"
                             :placeholder="$t('labels.lastName')" type="text" style="width:30em">
                    </form>
                    <div class="form-group mt-3" v-if="!createNewBeneficiary">
                      <label class="form-control-label">{{$t('labels.addressToUseInInvoice')}}</label>
                      <select class="form-control" v-model="addressToUseInInvoiceBeneficiary">
                        <option value="relation">{{$t('labels.relationAddress')}}</option>
                        <option value="new">{{$t('labels.newAddress')}}</option>
                      </select>
                    </div>
                    <div class="mb-0 mt-3">
                      <label class="form-control-label">{{$t('labels.beneficiaryDeliveryAddress')}}</label>
                    </div>
                    <div class="row pl-3 mt-2">
                      <div class="col-md-8">
                        <label class="form-control-label">{{ $t('labels.street') }}</label>
                        <input type="text" class="form-control" v-model="beneficiaryAddress.street"/>
                      </div>
                      <div class="col-md-4">
                        <label class="form-control-label">{{ $t('labels.houseNumber') }}</label>
                        <input type="text" class="form-control" v-model="beneficiaryAddress.houseNumber"/>
                      </div>
                    </div>
                    <div class="row pl-3 mt-2">
                      <div class="col-md-2">
                        <label class="form-control-label">{{ $t('labels.postalCode') }}</label>
                        <input type="text" class="form-control" v-model="beneficiaryAddress.postalCode"/>
                      </div>
                      <div class="col-md-5">
                        <label class="form-control-label">{{ $t('labels.city') }}</label>
                        <input type="text" class="form-control" v-model="beneficiaryAddress.city"/>
                      </div>
                      <div class="col-md-5">
                        <label class="form-control-label">{{ $t('labels.country') }}</label>
                        <searchable-select-component :config="searchableConfig"
                           :options="$store.state.allCountries"
                           :value="selectedCountryBeneficiary"
                           @onChange="addCountryBeneficiary"
                           @onDelete="removeCountryBeneficiary"/>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-12 text-right mt-4">
                    <span class="text-danger small text-right">{{newBeneficiaryError}}</span>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">{{$t('buttons.cancel')}}</button>
                <button type="button" class="btn btn-primary" @click="saveNewBeneficiary()">{{$t('buttons.confirm')}}</button>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="modal" data-backdrop="static" data-keyboard="false" id="removeBeneficiaryConfirm" tabindex="-1" role="dialog" ref="removeBeneficiaryConfirm">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5>{{$t('labels.confirmDelete')}}</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <div class="mt-4">
                    <h5>{{$t('labels.areYouSureToDelete')}}</h5>
                  </div>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-primary" @click="deleteBeneficiaryConfirmed">
                    {{$t('buttons.confirm')}}
                  </button>
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">{{$t('buttons.cancel')}}</button>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-12 pt-3">
            <div class="scrollable-medium pb-1" v-if="beneficiaryList.length">
              <div class="pipeline-item mt-2" v-for="(beneficiary, index) in beneficiaryList" :key="index">
                <div class="pi-body" style="padding:0.6em">
                  <div class="pi-info">
                    <div class="h6 pi-name">
                      {{getFullName(beneficiary)}}
                    </div>
                    <div class="pi-sub" style="padding-top:5px;">
                      {{getBeneficiaryAddress(beneficiary)}}
                      {{beneficiary.email ? beneficiary.email : beneficiary.website}}
                    </div>
                  </div>
                </div>
                <div class="pi-foot" style="padding:2px;">
                  <div class="tags">
                    <i class="text-success fas fa-edit m-2" data-toggle="modal" data-target="#addNewBeneficiary" @click="editBeneficiary(beneficiary, index)" style="cursor: pointer"></i>
                    <i class="fas fa-trash-alt m-2 text-danger" data-toggle="modal" data-target="#removeBeneficiaryConfirm" @click="deleteBeneficiary(index)" style="cursor: pointer"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row pl-3 mt-3">
            <div class="col-md-11">
              <div class="form-group" v-if="beneficiaryList.length">
                <label class="form-control-label">{{$t('labels.beneficiaryEmail')}}</label>
                <textarea rows="4" v-model="beneficiaryEmailContent" class="form-control"></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
<script src="./step1.component.ts" lang="ts"></script>

<style scoped>
  .pipeline-item {
    background-color: #fff;
    margin: 20px;
    margin-left: 10px;
    border-radius: 4px;
    position: relative;
    -webkit-box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.4);
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.4);
  }
  .pipeline-item .pi-foot {
    background-color: #f1f4f8;
    padding: 10px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    border-radius: 0px 0px 4px 4px;
  }
</style>
