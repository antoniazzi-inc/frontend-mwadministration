<template>
    <div class="tab-form-panel row">
        <div class="col-md-12" v-if="invoicePreview.cartOrder">
            <div class="row p-0 m-0" v-if="invoicePreview.cartOrder.orderCustomer">
                <div class="col-md-6 text-left form-group">
                    <span>{{invoicePreview.cartOrder.orderCustomer.fullName}}</span>
                    <br/>
                    <!--<span v-if="$parent.$parent.$refs.customerPanel.isCompany">{{$parent.$parent.$refs.customerPanel.selectedCompany ? $parent.$parent.$refs.customerPanel.selectedCompany.name : '' }}</span>
                    <br v-if="$parent.$parent.$refs.customerPanel.isCompany"/>-->
                    <span>{{getCustomerRelationAddress()}}</span>
                    <br/>
                    <!--<br v-if="$parent.$parent.$refs.customerPanel.isCompany"/>
                    <span v-if="$parent.$parent.$refs.customerPanel.isCompany">{{$parent.$parent.$refs.customerPanel.companyVat}}</span>-->
                </div>
                <div class="col-md-6 text-right form-group">
                    <label class="form-control-label text-center">{{$t('labels.sendInvoiceTo')}}:</label>
                    <br/>
                    <span>{{invoicePreview.cartOrder.orderCustomer ? invoicePreview.cartOrder.orderCustomer.email : '' }}</span>
                </div>
            </div>
            <div class="row p-0 m-0">
                <!--<div class="col-md-8">
                    <p v-if="invoicePreview.invoiceSendDate">
                        <label>{{$t('labels.sendDate')}}</label>
                        <span>{{invoicePreview.invoiceSendDate | formatOnlyDate}}</span>
                    </p>
                </div>
                <div class="col-md-4 text-right">
                    <span v-if="invoicePreview.invoiceDate !== ''">
                        <label>{{$t('labels.invoiceDate')}}</label>
                        <span class="small">{{invoicePreview.invoiceDate | formatOnlyDate}}</span>
                        <br/>
                    </span>
                    <span v-if="invoicePreview.invoiceDeliveryDate !== ''">
                        <label>{{$t('labels.deliveryDate')}}</label>
                        <span class="small">{{invoicePreview.invoiceDeliveryDate | formatOnlyDate}}</span>
                    </span>
                </div>-->
            </div>
            <div class="row p-0 m-0">
                <div class="col-md-6"></div>
                <div class="col-md-6 text-right form-group">
                    <div v-for="(item, index) in invoicePreview.cartOrder.orderLines" :key="index">
                        <span v-if="item.orderLineBeneficiary">{{item.orderLineBeneficiary.email}}</span><br/>
                    </div>
                </div>
            </div>
            <hr/>
            <div v-if="invoicePreview.cartOrder && invoicePreview.cartOrder.orderLines">
              <div class="row p-0 m-0">
                <div class="col-md-7">{{ $t('labels.item') }}</div>
                <div class="col-md-2 text-center">{{ $t('labels.orderQuantityShort') }}</div>
                <div class="col-md-3 text-right">{{ $t('labels.price') }}</div>
              </div>
                <div class="row p-0 m-0" v-for="(item, index) in invoicePreview.cartOrder.orderLines" :key="index">
                  <div class="col-md-7">
                    [{{item.orderProduct.productId}}] {{item.orderProduct.productName}}<br/>
                    <span v-if="item.orderProduct.productDescription">{{item.orderProduct.productDescription}}</span>
                            <br/>
                            <span v-for="(attre, ind) in item.orderProduct.orderProductAttributeValues" :key="ind">{{attre.attributeName}} {{attre.attributeValueName}} {{attre.attributeValuePrice}}{{$props.order.currency}}</span>
                            <span v-if="item.orderLineDeliveryMethod">{{$t('labels.shippingMethod')}}: {{getDeliveryMethodName(item)}}</span>
                            <span v-if="item.orderLineBeneficiary && item.orderLineBeneficiary.email">
                            <span class="font-weight-bold">{{$t('labels.beneficiary')}}:</span><br/>
                              <!-- only show beneficiary info if num beneficiaries > 1 or benefic != customer -->
                            {{getBeneficiaries(item)}}
                        </span>

                    </div>
                  <div class="col-md-2 text-center">
                    {{item.quantity}}
                  </div>
                  <div class="col-md-3 text-right">
                    {{item.orderProduct.productPrice | formatAmount}}
                    <!-- {{item.totalAmount | formatAmount}} -->
                  </div>
              </div>
            </div>
            <div v-if="invoicePreview.cartOrder && invoicePreview.cartOrder.orderDiscountLines">
                <div class="row p-0 m-0" v-for="(item, index) in $props.order.orderDiscountLines" :key="index+'promo'">
                    <div class="col-md-9 small">
                        <p v-if="item.orderPromotion && item.orderPromotion.promotion && item.orderPromotion.promotion.id">
                            <span>[{{item.orderPromotion.promotion.id}}] {{getMultiLangName(item.orderPromotion.promotion.promotionLanguages).name}}</span><br/>
                            <span>{{getMultiLangName(item.orderPromotion.promotion.promotionLanguages).description}}</span><br/>
                        </p>
                    </div>
                    <div class="col-md-3 text-right small">
                        <p v-if="item.orderPromotion && item.orderPromotion.promotion">
                            <span>{{getDiscount(item.orderPromotion.promotion)}}</span>
                        </p>
                    </div>
                </div>
            </div>
            <hr/>
          <!--
          <div class="row p-0 m-0">
            <div class="col-md-6 text-left font-weight-bold">
              {{ $t('labels.totalProducts') }}
            </div>
            <div class="col-md-6 text-right">
              {{ invoicePreview.totalProducts ? invoicePreview.totalProducts : 0 }}
            </div>
          </div>
          -->
          <div class="row p-0 m-0">
            <div class="col-md-6 text-left font-weight-bold">
              {{ $t('labels.totalDiscount') }}
            </div>
            <div class="col-md-6 text-right">
              {{ invoicePreview.totalDiscounts | formatAmount}}
            </div>
          </div>
          <div class="row p-0 m-0">
            <div class="col-md-6 text-left font-weight-bold">
              {{ $t('labels.totalMoneyVoucher') }}
            </div>
            <div class="col-md-6 text-right">
              {{ invoicePreview.totalMoneyVoucher ? invoicePreview.totalMoneyVoucher + ' ' + invoicePreview.currency : 0 }}
            </div>
          </div>
          <div class="row p-0 m-0">
            <div class="col-md-6 text-left font-weight-bold">
              {{ $t('labels.totalPointsVoucher') }}
            </div>
            <div class="col-md-6 text-right">
              {{ invoicePreview.totalPointsVoucher ? invoicePreview.totalPointsVoucher : 0 }}
            </div>
          </div>
          <div class="row p-0 m-0">
            <div class="col-md-6 text-left font-weight-bold">
              {{ $t('labels.totalMinutesVoucher') }}
            </div>
            <div class="col-md-6 text-right">
              {{ invoicePreview.totalMinutesVoucher ? invoicePreview.totalMinutesVoucher : 0 }}
            </div>
          </div>
          <div class="row p-0 m-0">
            <div class="col-md-6 text-left font-weight-bold">
              {{ $t('labels.totalNetto') }}
            </div>
            <div class="col-md-6 text-right">
              {{ invoicePreview.totalProductsNetto | formatAmount }}
            </div>
          </div>
          <div class="row p-0 m-0">
            <div class="col-md-6 mt-2 text-left">
              {{ $t('labels.paymentMethod') }}:
              <span v-if="$props.order.orderPaymentMethod">{{$props.order.orderPaymentMethod.name }}</span>
            </div>
            <div class="col-md-6 mt-2 text-right" v-if="$props.order.orderPaymentMethod">
              <span v-if="$props.order.orderPaymentMethod.administrativeCostsFixed">{{$props.order.orderPaymentMethod.administrativeCostsFixed | formatAmount}}</span>
              <span v-else-if="$props.order.orderPaymentMethod.administrativeCostsFixed">{{$props.order.orderPaymentMethod.administrativeCostsPercentage}} %</span>
              <span v-else>{{0 | formatAmount}}</span>
            </div>
          </div>
          <div class="row p-0 m-0 mb-3">
            <div class="col-md-6 text-left font-weight-bold">
              {{ $t('labels.shippingMethodTotalCost') }}
            </div>
            <div class="col-md-6 text-right">
              {{invoicePreview.shippingCostAmount | formatAmount}}
            </div>
          </div>

          <div class="row p-0 m-0" v-for="(item, index) in invoicePreview.totalTaxesMap" :key="index + '_tax'">
            <div class="col-md-6 text-left font-weight-bold">
              {{ $t('labels.productTax') }} {{ index }} %
            </div>
            <div class="col-md-6 text-right">
              {{ item | formatAmount}}
            </div>
          </div>
          <div class="row p-0 m-0 mb-3 mt-3">
            <div class="col-md-6 text-left font-weight-bold">
              {{ $t('labels.productTaxTotal') }}
            </div>
            <div class="col-md-6 text-right">
              {{ invoicePreview.taxAmount | formatAmount}}
            </div>
          </div>
          <div class="row p-0 m-0">
            <div class="col-md-6 text-left font-weight-bold">
              {{ $t('labels.grandTotal') }}
            </div>
            <div class="col-md-6 text-right">
              {{ invoicePreview.grandTotal | formatAmount}}
            </div>
          </div>
        </div>
    </div>
</template>
<script lang="ts" src="./orderPreview.component.ts">

</script>
<style scoped>
</style>
