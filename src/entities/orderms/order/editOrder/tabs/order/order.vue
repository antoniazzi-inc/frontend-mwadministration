<template>
  <div class="tab-form-panel">
    <div class="row p-3 text-left">
        <div class="col-md-12">

          <div class="form-row p-0 m-0" v-if="!addProduct && !addNewPromotion">
            <div class="col-auto">
              <button type="button" @click="selectProduct" class="btn-primary btn">{{$t('labels.addProduct')}}</button>
            </div>
            <div class="col-auto mr-5" v-if="orderLines && orderLines.length && !addNewPromotion">
              <button type="button" class="btn-primary btn" @click="addPromotion">{{$t('labels.addPromotion')}}</button>
            </div>
            <div class="col-auto ml-5">
              <searchable-select-component :config="singleSelectPaymentMethod"
                 :options="$store.state.lookups.paymentMethods"
                 :value="selectedPaymentMethod"
              />
            </div>
          </div>

            <div v-if="addProduct && !addNewPromotion" id="add-prod-form">
              <form>

                <div class="row">
                  <div class="form-group col-md-12">
                    <label>{{$t('labels.selectProduct')}}</label>
                    <searchable-select-component :config="singSelectConfigProduct"
                                                 :options="$store.state.lookups.products"
                                                 :value="selectedProduct"
                                                 @onChange="addProductSelect"
                                                 @onDelete="removeProduct"/>
                  </div>
                </div>

                <div class="row">
                  <div class="form-group col-md-12" v-if="selectedProductFeature && selectedProductFeature.length">
                    <label>{{$t('labels.selectProductAttribute')}}</label>
                    <searchable-select-component :config="singleSelectConfigAttribute"
                                                 :options="allProductFeatures"
                                                 :value="selectedProductFeature"
                                                 @onChange="addProductFeatureSelect"
                                                 @onDelete="removeProductFeature"/>
                  </div>
                </div>

                <div class="row" v-if="selectedProduct">
                  <div class="form-group col-md-6">
                    <label class="form-control-label">{{$t('labels.price')}}</label>
                    <money v-model="selectedProduct.value.price" :disabled="selectedProduct ? !selectedProduct.value.userDefinedPrice : true" class="form-control" name="loyaltyAmountEarlier"  v-bind="moneyFixed"></money>
                  </div>
                  <div class="form-group col-md-6">
                    <label class="form-control-label">{{$t('labels.quantity')}}</label>
                    <input type="number" v-validate="'required|min_value:1|decimal:0'" name="quantityProd" min="1" :class="{'form-control': true, invalid: errors.has('quantityProd')}" v-model="productQuantity"/>
                    <span class="small text-danger">{{errors.first('quantityProd')}}</span>
                  </div>
                </div>

                <div class="form-group">
                  <label class="form-control-label">{{$t('labels.additionalInfo')}}</label>
                  <textarea cols="3" class="form-control" maxlength="256" v-model="productAdditionalInfo"/>
                </div>

                <div class="row" v-if="selectedProduct">
                  <div class="form-group col-md-6">
                    <label class="form-control-label">{{$t('labels.affiliate')}}</label>
                    <searchable-select-component :config="singleSelectConfigAffiliate"
                                               :options="$store.state.lookups.affiliates"
                                               :value="selectedAffiliate"
                                               @onSelected="changeAffiliate"
                                               @onDelete="removeAffiliate"/>
                  </div>
                  <div class="form-group col-md-6">
                    <label class="form-control-label">{{$t('labels.beneficiary')}}</label>
                    <input type="text" class="form-control" name="beneficary" placeholder="TODO search / select beneficiary"/>
                  </div>
                </div>

                <div class="form-group" v-show="selectedProduct && selectedProduct.value.productType === 'PHYSICAL'">
                  <label class="form-control-label">{{$t('labels.shippingTitle')}}</label>
                  <searchable-select-component :config="singleSelectConfigDeliveryMethod"
                                               :options="$store.state.lookups.deliveryMethods"
                                               :value="selectedShippingMethods"
                                               @onChange="addNewShippingMethod"
                                               @onDelete="removeShippingMethod"/>
                </div>
                <div class="form-group" v-if="selectedProduct && selectedProduct.value.paymentSchedules && selectedProduct.value.paymentSchedules.length">
                  <label class="form-control-label">{{$t('labels.paymentSchedules')}}</label>
                  <toggle-switch
                    :on-text="$t('labels.yes')"
                    :off-text="$t('labels.no')"
                    :value.sync="usePaymentSchedule"/>
                </div>
                <div class="form-group" v-if="selectedProduct && selectedProduct.value.paymentSchedules && selectedProduct.value.paymentSchedules.length && usePaymentSchedule">
                  <label class="form-control-label">{{$t('labels.paymentSchedules')}}</label>
                  <select class="form-control" v-model="selectedPaymentSchedule">
                    <option v-for="(item, index) in selectedProduct.value.paymentSchedules" :key="index" :value="index">{{item.name}}</option>
                  </select>
                </div>
                <div class="form-group" v-if="selectedProduct && selectedProduct.value.productSubscription">
                  <label class="form-control-label">{{$t('labels.orderSubscription')}}</label>
                  <toggle-switch id="repeatSubscription"
                                 :on-text="$t('labels.yes')"
                                 :off-text="$t('labels.no')"
                                 :value.sync="useProductSubscription"></toggle-switch>
                </div>
                <div v-if="useProductSubscription">
                  <label class="form-control-label">{{$t('labels.periodStartDate')}}</label>
                  <form name="searchForm" class="form-inline">
                    <div class="input-group w-100 mt-3">
                      <select class="form-control" v-model="selectedProduct.value.productSubscription.period">
                        <option value="weekly">{{$t('labels.weekly')}}</option>
                        <option value="bi-weekly">{{$t('labels.bi-weekly')}}</option>
                        <option value="month">{{$t('labels.month')}}</option>
                        <option value="quarter">{{$t('labels.quarter')}}</option>
                        <option value="half-Year">{{$t('labels.halfYear')}}</option>
                        <option value="year">{{$t('labels.year')}}</option>
                      </select>
                      <select class="form-control" v-model="selectedProduct.value.productSubscription.startDate">
                        <option value="firstOfCurrentMonth">{{$t('labels.startAtBeginningOfCurrentMonth')}}</option>
                        <option value="firstOfNextMonth">{{$t('labels.beginningOfNextMonth')}}</option>
                        <option value="now">{{$t('labels.atThisMoment')}}</option>
                        <option value="paymentDone">{{$t('labels.startAfterPaymentIsDone')}}</option>
                      </select>
                      <input type="number" class="form-control" v-model="selectedProduct.value.productSubscription.maxTimes"/>
                    </div>
                  </form>
                </div>
                <div class="form-group text-right" v-if="addProduct">
                  <span class="small text-danger m-4">{{deliveryMethodError}}</span><br/>
                  <button class="btn btn-outline-danger mt-4" @click.prevent.stop="closeEditMode">{{$t('buttons.cancel')}}</button>
                  <button class="btn btn-primary ml-2 mt-4" @click.prevent.stop="addOrderLine()">{{!isEditingOrderLine ? $t('buttons.add') : $t('buttons.save')}}</button>
                </div>
              </form>
            </div>
            <div v-else-if="addNewPromotion && !addProduct" id="add-promo-form">
                <div class="form-group">
                    <label class="form-control-label">{{$t('labels.selectPromotion')}}</label>
                  <searchable-select-component :config="singleSelectConfig"
                                               :options="availablePrmotions"
                                               :value="selectedPromotion"
                                               @onChange="addSelectedPromotion"
                                               @onDelete="removeSelectedPromotion"/>
                </div>
                <div class="form-group text-right">
                    <button class="btn btn-outline-danger" @click="closeAddPromotion">{{$t('buttons.cancel')}}</button>
                    <button class="btn btn-primary ml-2" @click.prevent.stop="addNewOrderPromotion">{{$t('buttons.add')}}</button>
                </div>
            </div>
            <div v-else>

              <div class="pipeline-item" v-for="(item, index) in orderLines" :key="index">
                <div class="pi-controls">
                  <i class="fa fa-edit text-success" @click="editOrderLine(item, index)"></i>
                  <i class="fa fa-trash-alt ml-2 text-danger" data-toggle="modal"
                     data-target="#removeOrderLine" @click="removeOrderLine(index)"></i>
                </div>
                <div class="pi-body">
                  <div class="avatar"><i style="font-size: 2.5rem;" class="fas fa-cash-register"></i></div>
                  <div class="ml-3 pi-info">
                    <div class="h5 pi-name">{{`${item.orderProduct.productId} `}} {{item.orderProduct.productName}}</div>
                    <div class="pi-sub">{{getProductAttributes(item)}}</div>
                    <div class="pi-sub">{{item.orderProduct.productPrice | formatAmount}}</div>
                    <div class="pi-sub" v-if="item && item.orderLineBeneficiary && item.orderLineBeneficiary.length > 1">
                      {{$t('labels.totalBeneficiaries')}}: <span class="value">{{item.orderLineBeneficiary.length}}</span>
                    </div>
                  </div>
                </div>
                <div class="pi-foot">
                  <div class="extra-info">{{$t('labels.id')}}: ?</div>
                  <div class="extra-info" v-if="item.quantity > 1">{{$t('labels.quantity')}}: {{item.quantity}}x</div>
                </div>
              </div>

<!--
              <div class="row" v-for="(item, index) in orderLines" :key="index">
                  <div class="col-md-12">
                      <div class="support-index show-ticket-content">
                          <div class="support-tickets m-0 pl-2 pt-2">
                              <div class="support-ticket">
                                  <div class="st-body">
                                      <div class="avatar"><i style="font-size: 2.5rem;" class="fas fa-cash-register"></i></div>
                                      <div class="st-meta">
                                          <i class="fas fa-edit text-warning m-2 cursor-pointer" @click="editOrderLine(item, index)"></i>
                                          <div class="fas fa-trash-alt text-danger  cursor-pointer m-2"  data-target="#removeOrderLine" data-toggle="modal" @click="removeOrderLine(item, index)"></div>
                                      </div>
                                      <div class="ticket-content">
                                          <h6 class="ticket-title">
                                              <span class="label">{{`${item.orderProduct.productId} `}}</span>
                                              <span class="label">{{item.orderProduct.productName}}</span>
                                              <br/>
                                              <span class="small">{{item.orderProduct.productDescription}}</span>
                                              <br/>
                                              <span class="small">{{item.orderProduct.productPrice}} {{$store.state.currency}}</span>
                                              <br/>
                                              <span class="small">{{getProductAttributes(item)}}</span>
                                              <br/>
                                              <span class="small"></span>
                                              <br/>
                                              <span class="small"> {{item.orderLineDeliveryMethod ? item.orderLineDeliveryMethod.name : ''}}<i class="ml-3 fas fa-truck-loading"></i></span>
                                          </h6>
                                      </div>
                                  </div>
                                  <div class="st-foot">
                                      <div class="row">
                                          <div class="col-md-6">
                                              <span class="label">{{$t('labels.quantity')}}: <span class="value">{{item.quantity}}</span></span>
                                          </div>
                                          <div class="col-md-6 text-right"  v-if="item && item.orderLineBeneficiary && item.orderLineBeneficiary.length > 1">
                                              <span class="label">{{$t('labels.totalBeneficiaries')}}: <span class="value">{{item.orderLineBeneficiary.length}}</span></span>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
-->

              <div class="row" v-for="(item, index) in orderCopy.orderDiscountLines" :key="'promo_'+index">
                    <div class="col-md-12">
                        <div class="support-index show-ticket-content">
                            <div class="support-tickets m-0 pl-2 pt-2">
                                <div class="support-ticket">
                                    <div class="st-body">
                                        <div class="avatar"><i style="font-size: 2.5rem;" class="fa fa-tag"></i></div>
                                        <div class="st-meta">
                                            <div class="fas fa-trash-alt text-danger cursor-pointer m-2" data-target="#removePromotion" data-toggle="modal" @click="deletePromotion(item, index)"></div>
                                        </div>
                                        <div class="ticket-content">
                                            <h6 class="ticket-title">
                                                <span class="label">{{`${item.id} `}}</span>
                                                <span class="label">{{getPromoName(item).name}}</span>
                                                <br/>
                                                <span class="small">{{getPromoName(item).description}}</span>
                                                <br/>
                                                <span class="small">{{getDiscountName(item)}}</span>
                                            </h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
          <div class="modal" data-backdrop="static" data-keyboard="false" id="removeOrderLine" tabindex="-1" role="dialog" ref="removeOrderLine">
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
                  <button type="button" class="btn btn-primary" @click="removeOrderLineConfirmed" data-dismiss="modal">
                    {{$t('buttons.confirm')}}
                  </button>
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">{{$t('buttons.cancel')}}</button>
                </div>
              </div>
            </div>
          </div>
          <div class="modal" data-backdrop="static" data-keyboard="false" id="removePromotion" tabindex="-1" role="dialog" ref="removePromotion">
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
                  <button type="button" class="btn btn-primary" @click="removePromotionConfirmed" data-dismiss="modal">
                    {{$t('buttons.confirm')}}
                  </button>
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">{{$t('buttons.cancel')}}</button>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>
<script lang="ts" src="./order.component.ts">
</script>
<style sacoped>
  #add-prod-form, #add-promo-form {
    border: solid 1px #d0d0d0;
    border-radius: 8px;
    padding: 1em;
    -webkit-box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.4);
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.4);
  }
  .pipeline-item {
    cursor: default!important;
    margin: 20px;
    margin-left: 10px;
    border-radius: 4px;
    position: relative;
    -webkit-box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.4);
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.4);
  }
  .pi-controls i{
    cursor: pointer!important;
  }
  .pi-sub {
    font-size:1.2em;
    line-height:2em;
    overflow: hidden;
  }
</style>
