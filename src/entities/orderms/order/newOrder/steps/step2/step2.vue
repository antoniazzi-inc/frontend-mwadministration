<template>
  <div class="row">
    <div class="col-md-6">
      <h3 class="form-control-label">{{ $t('labels.orderedItems') }}</h3>
      <div class="form-row p-0 m-0" v-if="!addProduct && !addPromotion">
        <div class="col-auto">
          <button type="button" @click="addNewProduct" class="btn-primary btn">{{$t('labels.addProduct')}}</button>
        </div>
        <div class="col-auto" v-if="allOrderLines && allOrderLines.length && !addPromotion">
          <button type="button" class="btn-primary btn" @click="addNewPromotion">{{$t('labels.addPromotion')}}</button>
        </div>
      </div>

      <div v-if="addProduct && !addPromotion" id="add-prod-form">
        <form>
          <div class="form-group">
            <label>{{$t('labels.selectProduct')}}</label>
            <searchable-select-component :config="singleSelectConfigProduct"
                                         :options="$store.state.lookups.products"
                                         :value="selectedProduct"
                                         @onChange="productChanged"
                                         @onDelete="productRemoved"/>
          </div>
          <div class="form-group" v-if="productAttributes && productAttributes.length">
            <label>{{$t('labels.selectProductAttribute')}}</label>
            <searchable-select-component :config="singleSelectConfigAttribute"
                                         :options="productAttributes"
                                         :value="selectedProductAttributes"
                                         @onChange="productAttributeChanged"
                                         @onDelete="productAttributeRemoved"/>
          </div>
          <div class="form-group" v-if="allEvents.length">
            <label>{{$t('labels.selectEvents')}}</label>
            <searchable-select-component :config="singleSelectConfigEvents"
                                         :options="allEvents"
                                         :value="selectedEvents"
                                         @onChange="eventsChanged"
                                         @onDelete="eventsRemoved"/>
          </div>
          <div class="form-row" v-if="selectedProduct">
            <div class="form-group col-md-6">
              <label class="form-control-label">{{$t('labels.price')}}</label>
              <money v-model="selectedProduct.value.price" style="max-width: 150px" :disabled="selectedProduct ? !selectedProduct.value.userDefinedPrice : true" class="form-control" name="loyaltyAmountEarlier"  v-bind="moneyFixed"></money>
            </div>
            <div class="form-group col-md-6">
              <label class="form-control-label">{{$t('labels.quantity')}}</label>
              <input type="number" v-validate="'required|min_value:1|decimal:0'" style="max-width: 100px" name="quantityProd" min="1" :class="{'form-control': true, invalid: errors.has('quantityProd')}" v-model="newOrderLine.quantity"/>
              <span class="small text-danger">{{errors.first('quantityProd')}}</span>
            </div>
          </div>
          <div class="form-row" v-if="selectedProduct">
            <div class="form-group col-md-6">
              <label class="form-control-label">{{$t('labels.additionalInfo')}}</label>
              <textarea rows="3" class="form-control" maxlength="256" v-model="newOrderLine.additionalInfo"/>
            </div>
            <div class="form-group col-md-6">
              <label class="form-control-label">{{$t('labels.affiliate')}}</label>
              <searchable-select-component :config="singleSelectConfigAffiliate"
                 :options="$store.state.lookups.affiliates"
                 :value="selectedAffiliate"
                 @onSelected="changeAffiliate"
                 @onDelete="removeAffiliate"/>
            </div>
          </div>
          <div class="form-group" v-show="selectedProduct && selectedProduct.value.productType === 'PHYSICAL'">
            <label class="form-control-label">{{$t('labels.shippingTitle')}}</label>
            <searchable-select-component :config="singleSelectConfigDeliveryMethod"
                                         :options="$store.state.lookups.deliveryMethods"
                                         :value="selectedOrderLineDeliveryMethod"
                                         @onChange="orderLineDeliveryMethodChanged"
                                         @onDelete="orderLineDeliveryMethodRemoved"/>
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
          <div class="form-group" v-if="selectedProduct">
            <label class="form-control-label">{{$t('labels.beneficiary')}}</label>
            <searchable-select-component :config="singleSelectConfigBeneficiary"
                                         :options="beneficiaryList"
                                         :value="selectedBeneficiaries"
                                         @onChange="addBeneficiary"
                                         @onDelete="removeBeneficiary"/>
          </div>
          <div class="form-group text-right" v-if="addProduct">
            <span class="small text-danger m-4">{{newOrderLineError}}</span><br/>
            <button class="btn btn-outline-danger mt-4" @click="closeEditMode">{{$t('buttons.cancel')}}</button>
            <button class="btn btn-primary ml-2 mt-4" @click.prevent.stop="addOrderLine()">{{!isEditingOrderLine ? $t('buttons.add') : $t('buttons.save')}}</button>
          </div>
        </form>
      </div>

      <div v-else-if="addPromotion && !addProduct" id="add-promo-form" class="row">
        <div class="form-group col-md-12 mt-4">
          <label class="form-control-label">{{$t('labels.selectPromotion')}}</label>
          <searchable-select-component :config="singleSelectConfigPromotion"
             :options="availablePromotions"
             :value="selectedPromotion"
             @onChange="addSelectedPromotion"
             @onDelete="removeSelectedPromotion"/>
        </div>
        <div class="form-group text-right col-md-12">
          <button class="btn btn-outline-danger" @click="closeAddPromotion">{{$t('buttons.cancel')}}</button>
          <button class="btn btn-primary ml-2" @click.stop.prevent="addNewOrderPromotion">{{$t('buttons.add')}}</button>
        </div>
      </div>

      <div v-else-if="allOrderLines && allOrderLines.length" class="scrollable">

        <div class="pipeline-item" v-for="(item, index) in allOrderLines" :key="index">
          <div class="pi-controls">
            <i class="fa fa-edit text-success" @click="editOrderLine(item, index)"></i>
            <i class="fa fa-trash-alt ml-2 text-danger" data-toggle="modal"
               data-target="#removeLine" @click="removeOrderLine(index)"></i>
          </div>
          <div class="pi-body">
            <div class="avatar"><i style="font-size: 2.5rem;" class="fas fa-cash-register"></i></div>
            <div class="ml-3 pi-info">
              <div class="h5 pi-name">{{getProductName(item)}}</div>
              <div class="pi-sub">{{getProductAttributes(item)}}</div>
              <div class="pi-sub">{{item.orderProduct.price | formatAmount}}</div>
              <div class="pi-sub" v-if="item && item.beneficiaryList && item.beneficiaryList.length > 1">
                {{$t('labels.totalBeneficiaries')}}: <span class="value">{{item.beneficiaryList ? item.beneficiaryList.length : 0}}</span>
              </div>
            </div>
          </div>
          <div class="pi-foot">
            <div class="extra-info">{{$t('labels.id')}}: {{item.orderProduct.productId}}</div>
            <div class="extra-info" v-if="item.quantity > 1">{{$t('labels.quantity')}}: {{item.quantity}}x</div>
          </div>
        </div>

        <div class="pipeline-item" v-for="(item, index) in allPromotions" :key="'promo_'+index">
          <div class="pi-controls">
            <i class="fa fa-trash-alt ml-2 text-danger" data-toggle="modal"
               data-target="#removeLine" @click="deletePromotion(index)"></i>
          </div>
          <div class="pi-body">
            <div class="avatar"><i style="font-size: 2.5rem;" class="fa fa-tag"></i></div>
            <div class="ml-3 pi-info">
              <div class="h5 pi-name">{{item.label}}</div>
              <div class="pi-sub">{{getMultiLangName(item.value.promotionLanguages).description}}</div>
              <div class="pi-sub">{{getDiscount(item.value)}}</div>
            </div>
          </div>
          <div class="pi-foot">
            <div class="extra-info">{{$t('labels.id')}}: {{item.value.id}}</div>
          </div>
        </div>

      </div>
    </div>

    <div class="col-md-6">
      <h3 class="form-control-label">{{ $t('labels.invoiceOverview') }}</h3>
      <invoice-preview-component :cart-order="cartOrderCopy" :active="$props.active"/>
    </div>

    <div class="modal" data-backdrop="static" data-keyboard="false" id="removeLine" tabindex="-1" role="dialog" ref="removeLine">
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
            <button type="button" class="btn btn-primary" @click="removeOrderLineConfirmed()" v-if="orderLineToDelete !== null">
              {{$t('buttons.confirm')}}
            </button>
            <button type="button" class="btn btn-primary" @click="deletePromotionConfirmed()" v-if="promotionToDelete !== null">
              {{$t('buttons.confirm')}}
            </button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">{{$t('buttons.cancel')}}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script src="./step2.component.ts" lang="ts"></script>

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
