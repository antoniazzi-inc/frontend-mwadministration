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
    <div class="p-3 text-left tab-form-panel">
        <div class="row justify-content-center">
            <div class="col-12">
                    <div>
                        <div class="row">
                            <table class="table table-striped">
                                <thead>
                                <tr>
                                    <th>{{$t('labels.fullName')}}</th>
                                    <th>{{$t('labels.email')}}</th>
                                    <th>{{$t('labels.product')}}</th>
                                    <th>{{$t('labels.quantity')}}</th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item, index) in beneficiaryList" :key="index">
                                        <td>{{item.orderLineBeneficiary ? item.orderLineBeneficiary.title ? item.orderLineBeneficiary.title + ' ' : '' + item.orderLineBeneficiary.fullName :  orderCopy.orderCustomer.title ? orderCopy.orderCustomer.title + ' ' : '' + orderCopy.orderCustomer.fullName}}</td>
                                        <td>{{item.orderLineBeneficiary ? item.orderLineBeneficiary.email : orderCopy.orderCustomer.email}}</td>
                                        <td>{{item.orderProduct.productName}} {{item.additionalProducts && item.additionalProducts.length > 0 ? item.additionalProducts.join() : ''}}</td>
                                        <td>{{item.quantity}}</td>
                                        <td class="text-center">
                                            <div class="btn-group flex-btn-group-container" v-if="item.orderLineBeneficiary || (item.orderLineBeneficiary && item.orderLineBeneficiary.beneficiaryRelationId)">
                                                <div @click.prevent="editBeneficiary(item)" data-target="#editBeneficiary" data-toggle="modal"  class="ml-3 text-success cursor-pointer">
                                                    <i class="fas fa-edit"></i>
                                                </div>
                                                <div class="text-danger ml-3 cursor-pointer" data-target="#removeBeneficiary" data-toggle="modal" @click.prevent="prepareRemove(item, index)">
                                                    <i class="fas fa-trash-alt"></i>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
            </div>
        </div>
      <div class="modal" data-backdrop="static" data-keyboard="false" id="removeBeneficiary" tabindex="-1" role="dialog" ref="removeBeneficiary">
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
              <button type="button" class="btn btn-primary" @click="removeBeneficiary">
                {{$t('buttons.confirm')}}
              </button>
              <button type="button" class="btn btn-secondary" data-dismiss="modal">{{$t('buttons.cancel')}}</button>
            </div>
          </div>
        </div>
      </div>
      <div class="modal" data-backdrop="static" data-keyboard="false" id="editBeneficiary" tabindex="-1" role="dialog" ref="editBeneficiary">
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5>{{$t('labels.edit')}}</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form>
                <div class="row mt-3" v-if="selectedBeneficiary">
                  <div class="col-md-3">
                    <div class="form-group">
                      <label class="form-control-label">{{$t('labels.title')}}</label>
                      <input type="text" v-model="selectedBeneficiary.title" class="form-control"/>
                    </div>
                  </div>
                  <div class="col-md-5">
                    <div class="form-group">
                      <label class="form-control-label">{{$t('labels.fullName')}}</label>
                      <input type="text" v-model="selectedBeneficiary.fullName" class="form-control"/>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group">
                      <label class="form-control-label">{{$t('labels.email')}}</label>
                      <input type="email" v-model="selectedBeneficiary.email" class="form-control"/>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-12">
                    <label class="form-control-label">{{$t('labels.address')}}</label>
                    <form class="form-inline">
                      <label class="sr-only"> {{$t('labels.street')}}</label>
                      <input v-model="selectedBeneficiaryAddress.street" class="form-control mb-2 mr-sm-2 mb-sm-0" :placeholder="$t('labels.street')" type="text">
                      <label class="sr-only"> {{$t('labels.houseNumber')}}</label>
                      <input v-model="selectedBeneficiaryAddress.houseNumber" class="form-control mb-2 mr-sm-2 mb-sm-0" :placeholder="$t('labels.houseNumber')" type="text">
                      <label class="sr-only"> {{$t('labels.city')}}</label>
                      <input v-model="selectedBeneficiaryAddress.city" class="form-control mb-2 mr-sm-2 mb-sm-0" :placeholder="$t('labels.city')" type="text">
                      <label class="sr-only"> {{$t('labels.postalCode')}}</label>
                      <input v-model="selectedBeneficiaryAddress.postalCode" class="form-control mb-2 mr-sm-2 mb-sm-0" :placeholder="$t('labels.postalCode')" type="text">
                      <label class="sr-only"> {{$t('labels.country')}}</label>
                      <searchable-select-component :config="multiSelectConfigCountry"
                                                   :options="$store.state.allCountries"
                                                   :value="selectedCountry"
                                                   @onChange="addCountry"
                                                   @onDelete="removeCountry" style="margin-top:1em;"/>
                    </form>
                  </div>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary" @click="saveBeneficiary">
                {{$t('buttons.save')}}
              </button>
              <button type="button" class="btn btn-secondary" data-dismiss="modal">{{$t('buttons.cancel')}}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
<script lang="ts" src="./beneficiaries.component.ts">
</script>
<style scoped>

</style>
