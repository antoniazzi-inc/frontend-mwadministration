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
    <div class="row">
      <div class="element-wrapper col-md-6" v-if="!editMode">
        <div v-for="(item, index) in allBundles" :key="index" @click="selectedBundleIndex = index">
          <div class="support-index show-ticket-content col-md-12 mt-4">
            <div class="support-tickets ml-3 mr-0">
              <div :class="{'support-ticket': true}">
                <div class="st-body">
                  <div class="avatar"><i style="font-size: 3em" class="fas fa-box-open"></i></div>
                  <div class="st-meta">
                    <i class="fas fa-edit" @click="editBundle(item, index)"></i>
                    <div class="ui-icon-copy text-primary" @click="copyBundle(item, index)"></div>
                    <div v-if="allBundles && allBundles.length > 1" class="fas fa-trash-alt" data-toggle="modal" data-target="#removeEntity" @click="prepareDeleteBundle(item)"></div>
                  </div>
                  <div class="ticket-content">
                                <span class="label">
                                    <br/>
                                    <p>{{getProductName(item)}}</p>
                                    <p>{{getAttributeName(item)}}</p>
                                    <p>{{$t('labels.discount')}}: {{getBundleDiscount(item)}}</p>
                                </span><br/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="!editMode" class="element-wrapper col-md-6">
        <div class="element-wrapper col-md-6 mt-4">
          <button type="button" class="btn btn-outline-primary" @click="addNewBundle">{{$t('labels.addNewBundle')}}</button>
        </div>
      </div>
      <div v-if="editMode" class="element-wrapper col-md-12 mt-4">
        <button type="button" class="btn btn-outline-primary" @click="addNewBundleItem">{{$t('labels.AddNewItem')}}</button>
        <template v-for="(item, index) in allItems">
          <form class=" mt-4 form-inline" :key="index">
            <div class="form-group-inline ml-4" :key="index">
              <label class="form-control-label-inline">{{$t('labels.selectProduct')}}</label>
              <searchable-select-component :config="multiSelectConfigProduct"
                                           :options="item.allProducts"
                                           :value="allItems[index].selectedProducts"
                                           @onSelected="addProduct($event, index)"
                                           @onDelete="removeProduct($event, index)"/>
            </div>
            <div class="form-group-inline ml-4">
              <label class="form-control-label">{{$t('labels.selectProductFeature')}}</label>
              <searchable-select-component :config="multiSelectConfigAttribute"
                                           :options="item.allAttributes"
                                           :value="allItems[index].selectedAttributes"
                                           @onSelected="addAttribute($event, index)"
                                           @onDelete="removeAttribute($event, index)"/>
            </div>
            <div class="form-group-inline ml-4">
              <label class="form-control-label">{{$t('labels.selectProductFeatureValue')}}</label>
              <searchable-select-component :config="multiSelectConfigAttributeValue"
                                           :options="item.allAttributeValues"
                                           :value="allItems[index].selectedAttributeValues"
                                           @onSelected="addAttributeValue($event, index)"
                                           @onDelete="removeAttributeValue($event, index)"/>
            </div>
            <div class="form-group-inline ml-4">
              <label class="form-control-label">{{$t('labels.quantity')}}</label>
              <input type="number" name="selectedBundleQuantity" v-model="item.selectedBundleQuantity" :class="{'form-control':true, 'invalid': errors.has('selectedBundleQuantity')}"/> <br/>
              <small class="text-danger" v-if="errors.has('selectedBundleQuantity')">{{errors.first('selectedBundleQuantity')}}</small>
            </div>
            <div class="form-group-inline ml-4 mt-3">
              <i class="fas fa-trash-alt text-danger cursor-pointer" @click="removeBundleItem(item, index)" style="font-size: 0.8em;" ></i>
            </div>
            <hr/>
            <br/>
          </form>
        </template>
        <div class="row">
          <div class="col-md-6">
            <div class="discount">
              <div class="form-group mt-3 row">
                <div class="col-md-3">
                  <label>{{ $t('labels.discountType') }}</label>
                  <select class="form-control" style="max-width:200px;" v-model="selectedDiscountType">
                    <option v-for="(item, index) in allDiscountTypes" :key="index" v-bind:value=item.id>{{ item.label }}
                    </option>
                  </select>
                </div>
                <div class="col-md-6 mt-1 pr-0 disc-details">
                  <div :class="{'form-group': true}" v-if="selectedDiscountType===1 || selectedDiscountType===2">
                    <label class="control-label" v-if="selectedDiscountType===1">{{ $t('labels.percentageAmount') }}</label>
                    <label class="control-label" v-if="selectedDiscountType===2">{{ $t('labels.fixedAmount') }}</label>
                    <money v-if="selectedDiscountType===1" style="max-width:200px;" v-model="discountPriceAmount"
                           class="form-control" name="discountAmount1" v-bind="moneyPercentage"></money>
                    <money v-else-if="selectedDiscountType===2" style="max-width:200px;" v-model="discountPriceAmount"
                           class="form-control" name="discountAmount" v-bind="money"></money>
                    <div v-else-if="selectedDiscountType === 2" class="form-group">
                      <label class="control-label">{{ $t('labels.useThreeDecimals') }}</label>
                      <toggle-switch id="productArchived"
                                     :on-text="$t('labels.yes')"
                                     :off-text="$t('labels.no')"
                                     :value.sync="useMoreDecimalst"></toggle-switch>
                    </div>
                  </div>
                  <div :class="{'form-group': true}" v-if="selectedDiscountType===4">
                    <label class="control-label">{{ $t('labels.FreeItem') }}</label>
                    <searchable-select-component :config="singleSelectConfig"
                                                 :options="$store.state.lookups.products"
                                                 :value="selectedProduct"
                                                 @onChange="addDiscountProduct"
                                                 @onDelete="removeDiscountProduct"
                                                 style="max-width:80%"/>
                  </div>
                  <div :class="{'form-group': true}" v-if="selectedDiscountType===4">
                    <label class="control-label">{{ $t('labels.quantityAmount') }}</label>
                    <input type="number" style="max-width:200px;" class="form-control" name="discountAmount"
                           v-model="discountQuantityAmount"/>
                  </div>
                  <div class="col-md-6">
                    <div class="col-md-12">
                      <div v-if="selectedDiscountType !== 3 && selectedDiscountType !== 4">
                        <label class="control-label">{{ $t('labels.applyToWholeOrder') }}</label>
                        <toggle-switch
                          :on-text="$t('labels.yes')"
                          :off-text="$t('labels.no')"
                          :value.sync="wholeOrder"/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="buttons-w text-right mb-4 mt-3">
          <button type="button" class="btn btn-outline-primary" @click.prevent="previousState">{{$t('buttons.cancel')}}</button>
          <button type="button" @click="saveBundle" class="btn btn-primary ml-2">{{$t('buttons.save')}}</button>
        </div>
      </div>
    </div>
    <div class="form-buttons-w text-right">
      <button type="button" @click="goBack" class="btn btn-outline-primary ml-3">{{$t('buttons.backToList')}}</button>
    </div>
    <div class="modal" data-backdrop="static" data-keyboard="false" :id="'removeEntity'" tabindex="-1" role="dialog" ref="removeEntity">
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
            <button type="button" class="btn btn-primary" @click="removeBundle()">
              {{$t('buttons.confirm')}}
            </button>
            <button type="button" class="ml-2 btn btn-secondary" data-dismiss="modal">{{$t('buttons.cancel')}}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" src="./bundleBasedTab.component.ts"></script>
