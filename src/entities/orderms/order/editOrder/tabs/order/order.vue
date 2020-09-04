<template>
    <div class="row p-3 text-left">
        <div class="col-md-12">
            <div class="row p-0 mt-3" v-if="!addProduct">
                <div class="col-md-6 text-left">
                    <button type="button" @click="selectProduct" class="btn-primary btn">{{$t('labels.selectProduct')}}</button>
                </div>
                <div class="col-md-6 text-right" v-if="orderLines && orderLines.length">
                    <button type="button" class="btn-outline-primary btn" @click="addPromotion">{{$t('labels.selectPromotion')}}</button>
                </div>
            </div>
            <div v-if="addProduct && !addNewPromotion">
                <div class="form-group" v-if="addProduct">
                    <label class="form-control-label">{{$t('labels.selectProduct')}}</label>
                  <searchable-select-component :config="singSelectConfigProduct"
                                               :options="allProducts"
                                               :value="selectedProduct"
                                               @onChange="addProductSelect"
                                               @onDelete="removeProduct"
                                               @onSearch="searchProductInit"/>
                </div>
                <div class="form-group" v-if="addProduct">
                    <label class="form-control-label">{{$t('labels.selectProductFeature')}}</label>
                  <searchable-select-component :config="singSelectConfigProduct"
                                               :options="allProductFeatures"
                                               :value="selectedProductFeature"
                                               @onChange="addProductFeatureSelect"
                                               @onDelete="removeProductFeature"/>
                </div>
                <div class="form-group" v-if="addProduct">
                    <label class="form-control-label">{{$t('labels.price')}}</label>
                    <money v-model="selectedProduct.value.price" :disabled="selectedProduct ? !selectedProduct.value.userDefinedPrice : true" class="form-control" name="loyaltyAmountEarlier"  v-bind="moneyFixed"></money>
                </div>
                <div class="form-group" v-if="addProduct">
                    <label class="form-control-label">{{$t('labels.quantity')}}</label>
                    <input type="number" min="1" class="form-control" v-model="productQuantity"/>
                </div>
                <div class="form-group" v-if="addProduct">
                    <label class="form-control-label">{{$t('labels.additionalInfo')}}</label>
                    <textarea cols="3" class="form-control" maxlength="256" v-model="productAdditionalInfo"/>
                </div>
                <div class="form-group" v-show="selectedProduct.value.productType === 'PHYSICAL'">
                    <label class="form-control-label">{{$t('labels.shippingMethod')}}</label>
                  <searchable-select-component :config="singleSelectConfig"
                                               :options="allShippingMethods"
                                               :value="selectedShippingMethods"
                                               @onChange="addNewShippingMethod"
                                               @onDelete="removeShippingMethod"/>
                    <small class="text-danger">{{deliveryMethodError}}</small>
                </div>
                <div class="form-group" v-if="addProduct && selectedProduct.value.paymentSchedules && selectedProduct.value.paymentSchedules.length">
                    <label class="form-control-label">{{$t('labels.paymentSchedules')}}</label>
                    <toggle-switch id="repeatSubscription"
                                   :on-text="$t('labels.yes')"
                                   :off-text="$t('labels.no')"
                                   :value.sync="usePaymentSchedule"></toggle-switch>
                </div>
                <div class="form-group" v-if="addProduct && selectedProduct.value.paymentSchedules && selectedProduct.value.paymentSchedules.length && usePaymentSchedule">
                    <label class="form-control-label">{{$t('labels.paymentSchedules')}}</label>
                    <select class="form-control" v-model="selectedPaymentSchedule" @change="paymentScheduleChanged">
                        <option v-for="(item, index) in selectedProduct.value.paymentSchedules" :value="index" :key="index">{{item.name}}</option>
                    </select>
                </div>
                <div class="form-group" v-if="addProduct && selectedProduct.value.productSubscription">
                    <label class="form-control-label">{{$t('labels.orderSubscription')}}</label>
                    <toggle-switch
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
                <div class="form-group" v-if="addProduct && !isEditingOrderLine">
                    <label class="form-control-label">{{$t('labels.beneficiary')}}</label>
                  <searchable-select-component :config="multiSelectConfig"
                                               :options="beneficiaryList"
                                               :value="selectedBeneficiary"
                                               @onChange="addBeneficiary"
                                               @onSearch="searchBeneficiary"
                                               @onDelete="removeBeneficiary"/>
                </div>
                <div class="form-group text-right" v-if="addProduct">
                    <button class="btn btn-outline-danger" @click="closeEditMode">{{$t('buttons.cancel')}}</button>
                    <button class="btn btn-primary ml-2" @click.prevent.stop="addOrderLine">{{!isEditingOrderLine ? $t('buttons.add') : $t('buttons.save')}}</button>
                </div>
            </div>
            <div v-else-if="addNewPromotion && !addProduct">
                <div class="form-group">
                    <label class="form-control-label">{{$t('labels.selectPromotion')}}</label>
                  <searchable-select-component :config="singSelectConfigProduct"
                                               :options="allPromotions"
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
                                                <span class="label">{{item.orderProduct.id}}</span>
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
                                                <span class="small"> {{getDeliveryMethodName(item)}}<i class="ml-3 fas fa-truck-loading"></i></span>
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
                                                <span class="label">{{item.id}}</span>
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
</template>
<script lang="ts" src="./order.component.ts">
</script>
<style scoped>

</style>
