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
  <div class="row text-left">

    <div class="col-md-3 mt-3" v-if="$props.order && $props.order.id">
      <h4>{{$t('labels.orderCustomer')}}</h4>
      <hr/>
      <label>{{order.orderCustomer.fullName}}</label><br/>
      <label>{{order.orderCustomer.email}}</label><br/>
      <p style="margin-top:1em;" v-html="$options.filters.formatAddress($props.order.customerBillingAddress)"></p>
      <template v-if="$props.order.customerBillingAddress.id !== $props.order.customerDeliveryAddress.id">
        <p v-html="$options.filters.formatAddress($props.order.customerDeliveryAddress)"></p>
      </template>
      <template>
        <label v-if="haveBeneficiaries" class="underlineLabel">{{$t('labels.orderBeneficiaries')}}</label><br/>
        <template v-for="(item, ind) in $props.order.orderLines">
          <div v-if="item.orderLineBeneficiary && item.orderLineBeneficiary.fullName" :key="ind">
            {{haveBeneficiaries = true}}
            <label >{{item.fullName}}</label><br/>
            <label >{{item.email}}</label><br/>
          </div>
        </template>
      </template>
    </div>

    <div class="col-md-5 mt-3" v-if="$props.order && $props.order.orderLines">
      <h4>{{$t('labels.order')}}</h4>
      <hr/>
      <div class="ordersummary">
        <div class="row" v-for="(item, index) in $props.order.orderLines" >
          <div class="col-md-8">
            {{item.orderProduct.productName}} Met meer data Met meer data
            <div v-for="(attr, ind) in item.orderProduct.orderProductAttributeValues" :key="ind">
              <label :key="ind" class="ml-3">{{attr.attributeName}} {{attr.attributeValueName}}</label><br/>
            </div>
          </div>
          <div class="col-md-1 text-center">{{item.quantity}}x</div>
          <div class="col-md-3 text-right">{{item.orderProduct.productPrice | formatAmount}}</div>
        </div>
      </div>

      <label v-if="$props.order && $props.order.orderDiscountLines.length" class="underlineLabel">{{$t('labels.discounts')}}</label><br/>
      <template v-for="(item, index) in $props.order.orderDiscountLines">
        <label :key="index">{{item.orderPromotion.name}}</label>
      </template><br/>

      <div class="ordersummarytotals">
        <div class="row">
          <div class="col-md-8 text-right">{{$t('labels.netto')}}</div>
          <div class="col-md-4 text-right">{{$props.order.nettoAmount | formatAmount}}</div>
        </div>
        <div class="row">
          <div class="col-md-8 text-right">{{$t('labels.tax')}}</div>
          <div class="col-md-4 text-right">{{$props.order.taxAmount | formatAmount}}</div>
        </div>
        <div class="row">
          <div class="col-md-8 text-right">{{$t('labels.total')}}</div>
          <div class="col-md-4 text-right">{{$props.order.totalAmount | formatAmount}}</div>
        </div>
      </div>
    </div>

    <div class="col-md-4 mt-3">
      <h4>{{$t('labels.invoices')}}</h4>
      <hr/>
    </div>

  </div>
</template>
<script lang="ts" src="./orderInfo.component.ts">
</script>
<style scoped>
  .underlineLabel {
    text-decoration: underline;
  }
  .ordersummary .row {
    padding-bottom: 10px;
    border-bottom: dashed 1px #d0d0d0;
  }
  .ordersummarytotals .row {
    font-weight: 600;
  }
</style>
