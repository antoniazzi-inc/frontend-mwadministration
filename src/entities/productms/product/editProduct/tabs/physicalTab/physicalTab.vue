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
  <div class="tab-form-panel">
    <p>{{$t('labels.productPhysicalTypeSettings')}}</p>
    <form>
        <div class="form-row mt-4">
            <div class="form-group col-md-6">
                <label class="form-control-label">{{$t('labels.fulfilmentParty')}}</label>
                <searchable-select-component :config="multiSelectConfig" style="max-width:90%" :options="allFulfilments" :value="selectedFulfilments"
                              @onCreate="fulfilmentChanged"
                              @onDelete="removeFulfilment"/>
            </div>
            <div class="form-group col-md-6">
                <div class="row">
                    <div class="form-group col-md-6">
                        <label class="form-control-label">{{$t('labels.weight')}}</label>
                        <input  type="number" class="form-control" style="max-width:150px" v-model="typePhysical.weight"/>

                    </div>
                    <div class="form-group col-md-6">
                        <label class="form-control-label">{{$t('labels.height')}}</label>
                        <input  type="number" class="form-control" style="max-width:150px" v-model="typePhysical.height"/>
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-md-6">
                        <label class="form-control-label">{{$t('labels.length')}}</label>
                        <input type="number" class="form-control" style="max-width:150px" v-model="typePhysical.length"/>

                    </div>
                    <div class="form-group col-md-6">
                        <label class="form-control-label">{{$t('labels.depth')}}</label>
                        <input type="number" class="form-control" style="max-width:150px" v-model="typePhysical.depth"/>
                    </div>
                </div>
            </div>
        </div>
        <div class="form-row">
            <div class="col-md-12">
                <label class="form-control-label">{{$t('labels.shippingMethod')}}</label>
                <button type="button" class="btn btn-primary ml-2" data-toggle="modal" data-target="#createProductPayment" @click="addNewShipping">{{$t('buttons.add')}}</button>
                <table class="table table-striped">
                    <thead>
                    <tr>
                        <th>{{$t('labels.method')}}</th>
                        <th>{{$t('labels.region')}}</th>
                        <th>{{$t('labels.basePrice')}}</th>
                        <th>{{$t('labels.itemPrice')}}</th>
                        <th>{{$t('labels.actions')}}</th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in selectedShippingMethods" :key="index">
                            <td>{{getMethodName(item)}}</td>
                            <td>{{getRegionName(item)}}</td>
                            <td>{{item.basePrice}}</td>
                            <td>{{item.itemPrice}}</td>
                            <td>
                                <div class="btn-group flex-btn-group-container">
                                    <div @click.prevent="editItem(item)" data-toggle="modal" data-target="#createProductPayment" class="ml-3 text-primary cursor-pointer">
                                        <i class="os-icon os-icon-ui-49"></i>
                                    </div>
                                    <div class="text-danger ml-3 cursor-pointer" data-toggle="modal" data-target="#removeEntityShipping" @click.prevent="prepareRemove(index)">
                                        <i class="fas fa-trash-alt"></i>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="form-buttons-w text-right">
          <button type="button" @click="goBack" class="btn btn-outline-primary ml-3">{{$t('buttons.backToList')}}</button>
          <button class="btn btn-outline-primary" @click.prevent="cancel">{{$t('buttons.cancel')}}</button>
          <button class="btn btn-primary ml-2" @click.prevent="save">{{$t('buttons.save')}}</button>
        </div>
      </form>
    <div class="modal" data-backdrop="static" data-keyboard="false" id="removeEntityShipping" tabindex="-1" role="dialog" ref="removeEntityShipping">
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
            <button type="button" class="btn btn-primary" @click="removeShipping">
              {{$t('buttons.confirm')}}
            </button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">{{$t('buttons.cancel')}}</button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal" data-backdrop="static" data-keyboard="false" id="createProductPayment" tabindex="-1" role="dialog" ref="createProductPayment">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5>{{$t('labels.createLabel')}}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <label class="form-control-label">{{$t('labels.shippingMethod')}}</label>
                <searchable-select-component :config="singleSelectConfig"
                                             :options="$store.state.lookups.deliveryMethods"
                                             :value="selectedShippingMethod"
                                             @onChange="shippingMethodChanged"
                                             @onDelete="removeShippingMethod"/>
              </div>
              <div class="form-group">
                <label class="form-control-label">{{$t('labels.region')}}</label>
                <searchable-select-component :config="singleSelectRegionConfig"
                                             :options="$store.state.lookups.regions"
                                             :value="selectedRegion"
                                             @onChange="regionChanged"
                                             @onDelete="removeRegion"/>
              </div>
              <div class="form-group">
                <label class="form-control-label">{{$t('labels.basePrice')}}</label>
                <money v-model="basePrice" class="form-control" name="priceAmount"  v-bind="money"></money>
              </div>
              <div class="form-group">
                <label class="form-control-label">{{$t('labels.itemPrice')}}</label>
                <money v-model="itemPrice" class="form-control" name="priceAmount"  v-bind="money"></money>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="addNewShippingMethod">
              {{$t('buttons.confirm')}}
            </button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">{{$t('buttons.cancel')}}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" src="./physicalTab.component.ts"></script>
