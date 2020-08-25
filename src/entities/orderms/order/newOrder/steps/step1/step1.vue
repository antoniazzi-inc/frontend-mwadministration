<template>
    <div class="row">
      <div class="col-md-7">
        <div class="form-group col-md-12">
          <label class="form-control-label">{{ $t('labels.customer') }}</label>
          <searchable-select-component :config="singleSelectConfig"
                                       :options="allRelations"
                                       :value="selectedRelation"
                                       @onChange="relationsChanged"
                                       @onSearch="searchRelation"
                                       @onDelete="removeRelation"/>
        </div>
        <div class="form-group col-md-12">
          <form class="form-inline" v-if="selectedRelation && selectedRelation.relationProfile">
            <label class="sr-only"> {{ $t('labels.email') }}</label>
            <input v-validate="'required|email'" name="email" v-model="selectedRelation.email"
                   :disabled="selectedRelation && selectedRelation.id"
                   :class="{'form-control mb-2 mt-2 mr-sm-1 mb-sm-0': true, invalid: errors.has('email')}"
                   :placeholder="$t('labels.email')" type="text">
            <label class="sr-only"> {{ $t('labels.title') }}</label>
            <input v-model="selectedRelation.relationProfile.title" style="width: 100px"
                   class="form-control mb-2 mt-2 mr-sm-1 mb-sm-0" :placeholder="$t('labels.title')" type="text">
            <label class="sr-only"> {{ $t('labels.firstName') }}</label>
            <input v-model="selectedRelation.relationProfile.firstName" class="form-control mt-2 mb-2 mr-sm-1 mb-sm-0"
                   :placeholder="$t('labels.firstName')" type="text">
            <label class="sr-only">{{ $t('labels.middleName') }}</label>
            <input v-model="selectedRelation.relationProfile.middleName" class="form-control mt-2 mb-2 mr-sm-1 mb-sm-0"
                   :placeholder="$t('labels.middleName')" type="text">
            <label class="sr-only"> {{ $t('labels.lastName') }}</label>
            <input v-model="selectedRelation.relationProfile.lastName" v-validate="'required'" name="lastName"
                   :class="{'form-control mb-2 mt-2 mr-sm-1 mb-sm-0': true, invalid: errors.has('lastName')}"
                   :placeholder="$t('labels.lastName')" type="text">
          </form>
          <span class="small text-danger">{{ errors.first('email') }} {{ errors.first('lastName') }}</span>
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
                             v-model="newCompany.vatNumber"/>
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
            <searchable-select-component :config="singleSelectConfigCompany"
                                         :options="allCompanies"
                                         :value="selectedCompany"
                                         @onCreate="createNewCompany"
                                         @onChange="companyChanged"
                                         @onDelete="removeCompany"/>
          </div>
          <div class="form-group col-md-6 mt-3" v-if="isCompany">
            <label class="form-control-label">{{ $t('labels.vatNumber') }}</label>
            <input v-model="selectedCompany.vatNumber" class="form-control mt-2 mb-2 mr-sm-1 mb-sm-0"
                   :placeholder="$t('labels.vatNumber')" type="text">
          </div>
          <div class="form-group col-md-6 mt-3" v-if="isCompany">
            <label class="form-control-label">{{ $t('labels.applicableTaxRulings') }}</label>
            <select class="form-control mt-2 mb-2 mr-sm-1 mb-sm-0" v-model="applicableTax">
              <option value="reverse">{{$t('labels.reverse')}}</option>
              <option value="normal">{{$t('labels.normal')}}</option>
              <option value="noVat">{{$t('labels.noVat')}}</option>
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
          <div class="col-md-4">
            <label class="form-control-label">{{ $t('labels.postalCode') }}</label>
            <input type="text" class="form-control" v-model="cartOrderCopy.customerBillingAddress.postalCode"/>
          </div>
          <div class="col-md-8" v-if="cartOrderCopy.customerBillingAddress">
            <label class="form-control-label">{{ $t('labels.city') }}</label>
            <input type="text" class="form-control" v-model="cartOrderCopy.customerBillingAddress.city"/>
          </div>
        </div>
        <div class="row pl-3 mt-2" v-if="cartOrderCopy.customerBillingAddress">
          <div class="col-md-12">
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
            <div class="col-md-4">
              <label class="form-control-label">{{ $t('labels.postalCode') }}</label>
              <input type="text" class="form-control" v-model="cartOrderCopy.customerDeliveryAddress.postalCode"/>
            </div>
            <div class="col-md-8" v-if="cartOrderCopy.customerBillingAddress">
              <label class="form-control-label">{{ $t('labels.city') }}</label>
              <input type="text" class="form-control" v-model="cartOrderCopy.customerDeliveryAddress.city"/>
            </div>
          </div>
          <div class="row pl-3 mt-2" v-if="cartOrderCopy.customerDeliveryAddress">
            <div class="col-md-12">
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
      <div class="col-md-5">
        <div class="row p-0 m-0">
          <div class="col-md-6"><span class="small"> *{{$t('labels.customerIsAlreadyABeneficiary')}}</span></div>
          <div class="col-md-6 p-0 m-0 align-self-center text-right">
            <div class="form-group m-0">
              <button type="button" @click="addNewBeneficiary" data-toggle="modal" data-target="#addNewBeneficiary" class="btn btn-outline-primary">{{$t('buttons.addNewBeneficiary')}}</button>
            </div>
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
                    <div class="form-check">
                      <label class="form-check-label">
                        {{ $t('labels.createNewBeneficiary')}}<input type="checkbox" v-model="createNewBeneficiary" class="form-check-input pl-2 ml-2" value="">
                      </label>
                    </div>
                    <div class="form-group" v-if="!createNewBeneficiary">
                      <label class="form-control-label">{{$t('labels.orderBeneficiary')}}</label>
                      <searchable-select-component :config="singleSelectConfig"
                                                   :options="allRelations"
                                                   :value="selectedBeneficiaryRelation"
                                                   @onChange="addBeneficiaryRelation"
                                                   @onSearch="searchRelation"
                                                   @onDelete="removeBeneficiaryRelation"/>
                    </div>
                    <form class="form-inline" v-if="selectedBeneficiaryRelation">
                      <label class="sr-only"> {{ $t('labels.email') }}</label>
                      <input v-validate="'required|email'" name="emailBeneficiary" v-model="selectedBeneficiaryRelation.email"
                             :disabled="selectedBeneficiaryRelation && selectedBeneficiaryRelation.id"
                             :class="{'form-control mb-2 mt-2 mr-sm-1 mb-sm-0': true, invalid: errors.has('emailBeneficiary')}"
                             :placeholder="$t('labels.email')" type="text">
                      <label class="sr-only"> {{ $t('labels.title') }}</label>
                      <input v-model="selectedBeneficiaryRelation.relationProfile.title" style="width: 100px"
                             class="form-control mb-2 mt-2 mr-sm-1 mb-sm-0" :placeholder="$t('labels.title')" type="text">
                      <label class="sr-only"> {{ $t('labels.firstName') }}</label>
                      <input v-model="selectedBeneficiaryRelation.relationProfile.firstName" class="form-control mt-2 mb-2 mr-sm-1 mb-sm-0"
                             :placeholder="$t('labels.firstName')" type="text">
                      <label class="sr-only">{{ $t('labels.middleName') }}</label>
                      <input v-model="selectedBeneficiaryRelation.relationProfile.middleName" class="form-control mt-2 mb-2 mr-sm-1 mb-sm-0"
                             :placeholder="$t('labels.middleName')" type="text">
                      <label class="sr-only"> {{ $t('labels.lastName') }}</label>
                      <input v-model="selectedBeneficiaryRelation.relationProfile.lastName" v-validate="'required'" name="lastNameBeneficiary"
                             :class="{'form-control mb-2 mt-2 mr-sm-1 mb-sm-0': true, invalid: errors.has('lastNameBeneficiary')}"
                             :placeholder="$t('labels.lastName')" type="text">
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
                      <div class="col-md-4">
                        <label class="form-control-label">{{ $t('labels.postalCode') }}</label>
                        <input type="text" class="form-control" v-model="beneficiaryAddress.postalCode"/>
                      </div>
                      <div class="col-md-8">
                        <label class="form-control-label">{{ $t('labels.city') }}</label>
                        <input type="text" class="form-control" v-model="beneficiaryAddress.city"/>
                      </div>
                    </div>
                    <div class="row pl-3 mt-2">
                      <div class="col-md-12">
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
                <button type="button" class="btn btn-primary" @click="saveNewBeneficiary()">
                  {{$t('buttons.confirm')}}
                </button>
                <button type="button" class="btn btn-secondary" data-dismiss="modal">{{$t('buttons.cancel')}}</button>
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
            <div class="row" v-for="(beneficiary, index) in beneficiaryList" :key="index">
              <div class="col-md-12" v-if="beneficiary">
                <div class="support-index show-ticket-content">
                  <div class="support-tickets m-0 pl-2 pt-2">
                    <div class="support-ticket">
                      <div class="st-body">
                        <div class="avatar"><i style="font-size: 2.5rem;" class="fa fa-plus"></i></div>
                        <div class="st-meta">
                          <i class="fas fa-edit text-warning" data-toggle="modal" data-target="#addNewBeneficiary" @click="editBeneficiary(beneficiary, index)"></i>
                          <div class="fas fa-trash-alt ml-2 text-danger" data-toggle="modal" data-target="#removeBeneficiaryConfirm" @click="deleteBeneficiary(index)"></div>
                        </div>
                        <div class="ticket-content">
                          <h6 class="ticket-title">
                            <span class="label">{{beneficiary.fullName}}</span>
                            <br/>
                            <span class="label">{{beneficiary.email ? beneficiary.email : beneficiary.website}}</span>
                          </h6>
                        </div>
                      </div>
                      <div class="st-foot">
                        <span class="label"><span class="value">{{getBeneficiaryAddress(beneficiary)}}</span></span><br/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
          <div class="row pl-3 mt-3">
            <div class="col-md-12">
              <div class="form-group" v-if="beneficiaryList.length">
                <label class="form-control-label">{{$t('labels.beneficiaryEmail')}}</label>
                <textarea cols="3" v-model="beneficiaryEmailContent" class="form-control"></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
<script src="./step1.component.ts" lang="ts"></script>
