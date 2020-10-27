<template>
  <div class="row">
    <div class="col-md-12">
      <hr>
      <div class="row p-0 m-0">
        <!--<div class="col-md-6 text-left form-group">
          <span>{{ cartOrderCopy.orderCustomer && cartOrderCopy.orderCustomer.fullName ? cartOrderCopy.orderCustomer.fullName : '' }}</span>

          <br v-if="$parent.$parent.$refs.customerPanel.isCompany"/>
          <span v-if="$parent.$parent.$refs.customerPanel.isCompany">
            {{$parent.$parent.$refs.customerPanel.selectedCompany ? $parent.$parent.$refs.customerPanel.selectedCompany.name : '' }}
          </span>

          <br/>
          <span>{{ getCustomerRelationAddressPart1() }}</span>
          <br/>
          <span>{{ getCustomerRelationAddressPart2() }}</span>
          <br/>
          <span>{{ customerCountry }}</span>
          <br v-if="$parent.$parent.$refs.customerPanel.isCompany"/>
          <span v-if="$parent.$parent.$refs.customerPanel.isCompany">{{$parent.$parent.$refs.customerPanel.companyVat}}</span>
        </div>-->
        <div class="col-md-6 text-right form-group">
          <label class="form-control-label text-center">{{ $t('labels.sendInvoiceTo') }}:</label>
          <br/>
          <span>{{ cartOrderCopy.orderCustomer && cartOrderCopy.orderCustomer.email ? cartOrderCopy.orderCustomer.email : '' }}</span>
        </div>
      </div>
      <div class="row p-0 m-0">
        <div class="col-md-8">
          <p v-if="cartOrderCopy.invoice">
            <label>{{ $t('labels.sendDate') }}</label>
            <span>{{ cartOrderCopy.invoice.sentOn | formatOnlyDate }}</span>
          </p>
        </div>
        <div class="col-md-4 text-right">
                    <span v-if="cartOrderCopy.invoice">
                        <label>{{ $t('labels.invoiceDate') }}</label>
                        <span class="small">{{ cartOrderCopy.invoice.createdOn | formatOnlyDate }}</span>
                        <br/>
                    </span>
          <span v-if="cartOrderCopy.invoice">
                        <label>{{ $t('labels.deliveryDate') }}</label>
                        <span class="small">{{ cartOrderCopy.invoice.scheduledOn | formatOnlyDate }}</span>
                    </span>
        </div>
      </div>
      <div class="row p-0 m-0">
        <div class="col-md-6"></div>
        <div class="col-md-6 text-right form-group">
          <template v-for="(item, index) in cartOrderCopy.orderLines">
            <div :key="index" v-if="item.orderLineBeneficiary && item.orderLineBeneficiary.email">
              <span>{{ item.orderLineBeneficiary.email }}</span><br/>
            </div>
          </template>
        </div>
      </div>
      <hr/>
      <div v-if="cartOrderCopy && cartOrderCopy.orderLines">
        <div class="row p-0 m-0">
          <div class="col-md-7">{{ $t('labels.item') }}</div>
          <div class="col-md-2">{{ $t('labels.orderQuantityShort') }}</div>
          <div class="col-md-3">{{ $t('labels.price') }}</div>
        </div>
        <div class="row p-0 m-0" v-for="(item, index) in cartOrderCopy.orderLines" :key="index">
          <div class="col-md-7">
            <p>
              <span>[{{ item.orderProduct.productId }}] {{ item.orderProduct.productName }} (x{{item.quantity}})</span><br/>
              <span v-if="item.orderProduct.productDescription">{{ item.orderProduct.productDescription }}</span>
              <span>
                <br/>
                <span class="font-weight-bold">{{ $t('labels.basePrice') }}:</span>
                <span class="text-right">{{ item.orderProduct.productPrice }} {{cartOrderCopy.currency }}</span>
              </span>
              <br/>
              <span>{{ getAttributesNames(item) }}</span>
              <span
                v-if="item.orderLineDeliveryMethod">{{ $t('labels.shippingMethod') }}: {{
                  getDeliveryMethodName(item)
                }}</span>
              <span v-if="item.orderLineBeneficiary && item.orderLineBeneficiary.email">
                            <span class="font-weight-bold">{{ $t('labels.beneficiary') }}:</span><br/>
                            {{ item.orderLineBeneficiary.email }}
                        </span>
            </p>

          </div>
          <div class="col-md-2 text-center">
            {{item.quantity}}
          </div>
          <div class="col-md-3 text-right">
            <p>
              <span>{{ item.totalAmount }} {{ cartOrderCopy.currency }}</span>
            </p>
          </div>
        </div>
      </div>
      <div v-if="cartOrderCopy && cartOrderCopy.orderDiscountLines">
        <div class="row p-0 m-0" v-for="(item, index) in cartOrderCopy.orderDiscountLines" :key="index+'promo'">
          <div class="col-md-9 small">
            <p v-if="item.orderPromotion && item.orderPromotion.promotionId">
              <span>[{{
                  item.orderPromotion.promotionId
                }}] {{item.orderPromotion.name }}</span><br/>
              <span>{{item.orderPromotion.description }}</span><br/>
            </p>
          </div>
          <div class="col-md-3 text-right small">
            <p v-if="item.orderPromotion && item.orderPromotion.promotionId">
              <span>{{ getPromotionDiscount(item) }}</span>
            </p>
          </div>
        </div>
      </div>
      <hr/>
      <div class="row p-0 m-0">
        <div class="col-md-6 text-left font-weight-bold">
          {{ $t('labels.totalProducts') }}
        </div>
        <div class="col-md-6 text-right">
          {{ invoicePreview.totalProducts ? invoicePreview.totalProducts : 0 }}
        </div>
      </div>
      <div class="row p-0 m-0">
        <div class="col-md-6 text-left font-weight-bold">
          {{ $t('labels.totalDiscount') }}
        </div>
        <div class="col-md-6 text-right">
          {{ invoicePreview.totalDiscounts ? invoicePreview.totalDiscounts + ' ' + cartOrderCopy.currency : 0 }}
        </div>
      </div>
      <div class="row p-0 m-0">
        <div class="col-md-6 text-left font-weight-bold">
          {{ $t('labels.totalNetto') }}
        </div>
        <div class="col-md-6 text-right">
          {{
            invoicePreview.totalProductsNetto ? invoicePreview.totalProductsNetto + ' ' + cartOrderCopy.currency : 0
          }}
        </div>
      </div>
      <div class="row p-0 m-0">
        <div class="col-md-6 mt-2 text-left font-weight-bold">
          {{ $t('labels.paymentMethod') }}:
          <span v-if="cartOrderCopy.orderPaymentMethod">{{cartOrderCopy.orderPaymentMethod.name }}</span>
        </div>
        <div class="col-md-6 text-right"
             v-if="cartOrderCopy.orderPaymentMethod">
          {{
            cartOrderCopy.orderPaymentMethod ? cartOrderCopy.orderPaymentMethod.administrativeCostsFixed ? cartOrderCopy.orderPaymentMethod.administrativeCostsFixed + ' ' + cartOrderCopy.currency : cartOrderCopy.orderPaymentMethod.administrativeCostsPercentage + '%' : ''
          }}
        </div>
      </div>
      <div class="row p-0 m-0 mb-3">
        <div class="col-md-6 text-left font-weight-bold">
          {{ $t('labels.shippingMethodTotalCost') }}
        </div>
        <div class="col-md-6 text-right">
        {{invoicePreview.shippingCostAmount ? invoicePreview.shippingCostAmount : 0}} {{cartOrderCopy.currency}}
        </div>
      </div>
      <div class="row p-0 m-0" v-for="(item, index) in allTaxes" :key="index + '_tax'">
        <div class="col-md-6 text-left font-weight-bold">
          {{ $t('labels.productTax') }} {{ item.taxName }} %
        </div>
        <div class="col-md-6 text-right">
          {{ item.value }} {{ item.currency }}
        </div>
      </div>
      <div class="row p-0 m-0">
        <div class="col-md-6 text-left font-weight-bold">
          {{ $t('labels.grandTotal') }}
        </div>
        <div class="col-md-6 text-right">
          {{ invoicePreview.grandTotal ? invoicePreview.grandTotal + ' ' + cartOrderCopy.currency : 0 }}
        </div>
      </div>
    </div>
  </div>
</template>
<script src="./invoicePreview.component.ts" lang="ts"></script>
