<template>
    <div class="row text-left">
        <div class="col-md-4" v-if="$props.order && $props.order.id">
            {{$t('labels.orderCustomer')}}
            <hr/>
            <label class="underlineLabel">{{$t('labels.fullName')}}</label><br/>
            <label>{{order.orderCustomer.fullName}}</label><br/>
            <label class="underlineLabel">{{$t('labels.email')}}</label><br/>
            <label>{{order.orderCustomer.email}}</label><br/>
            <label class="underlineLabel">{{$t('labels.customerBillingAddress')}}</label><br/>
            <label>{{getBillingAddresses()}}</label><br/>
            <template v-if="$props.order.customerBillingAddress.id !== $props.order.customerDeliveryAddress.id">
                <label class="underlineLabel">{{$t('labels.customerDeliveryAddress')}}</label><br/>
                <label>{{getDeliveryAddresses()}}</label><br/>
            </template>
            <template>
                <label v-if="haveBeneficiaries" class="underlineLabel">{{$t('labels.orderBeneficiaries')}}</label><br/>
                <template v-for="(item, ind) in $props.order.orderLines">
                    <div v-if="item.orderLineBeneficiary && item.orderLineBeneficiary.fullName" :key="ind">
                        {{haveBeneficiaries = true}}
                        <label class="underlineLabel">{{$t('labels.fullName')}}</label><br/>
                        <label >{{item.fullName}}</label><br/>
                        <label class="underlineLabel">{{$t('labels.email')}}</label><br/>
                        <label >{{item.email}}</label><br/>
                    </div>
                </template>
            </template>
        </div>
        <div class="col-md-4" v-if="$props.order && $props.order.orderLines">
            {{$t('labels.order')}}
            <hr/>
            <label class="underlineLabel">{{$t('labels.products')}}</label><br/>
            <template v-for="(item, index) in $props.order.orderLines">
                <label :key="index">{{item.orderProduct.productName}}</label>
                <div v-for="(attr, ind) in item.orderProduct.orderProductAttributeValues" :key="ind">
                    <label :key="ind" class="ml-3">{{attr.attributeName}} {{attr.attributeValueName}}</label><br/>
                </div>
            </template><br/>
            <label  v-if="$props.order && $props.order.orderDiscountLines.length" class="underlineLabel">{{$t('labels.discounts')}}</label><br/>
            <template v-for="(item, index) in $props.order.orderDiscountLines">
                <label :key="index">{{item.orderPromotion.name}}</label>
            </template><br/>
            <label class="underlineLabel">{{$t('labels.netto')}}</label>
            <label>{{$props.order.nettoAmount}}{{$props.order.currency ? $props.order.currency : null}}</label><br/>
            <label class="underlineLabel">{{$t('labels.tax')}}</label>
            <label>{{$props.order.taxAmount}}{{$props.order.currency ? $props.order.currency : null}}</label><br/>
            <label class="underlineLabel">{{$t('labels.total')}}</label>
            <label>{{$props.order.totalAmount}}{{$props.order.currency ? $props.order.currency : null}}</label><br/>
        </div>
        <div class="col-md-4">
            {{$t('labels.invoices')}}
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
</style>
