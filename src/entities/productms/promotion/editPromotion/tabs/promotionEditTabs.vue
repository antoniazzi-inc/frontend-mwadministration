<template>
  <div class="row">
    <div class="col-md-12">
      <div>
        <ul class="nav nav-tabs" id="myTab" role="tablist">
          <li class="nav-item tab-nav" @click="currentTab = 'general'">
            <a :class="{'nav-link': true, 'active': currentTab === 'general'}" id="general-tab" data-toggle="tab"
               href="#general" role="tab" aria-controls="general" aria-selected="true">{{$t('labels.general')}}</a>
          </li>
          <li class="nav-item tab-nav" @click="currentTab = 'products'" v-if="promotion.promotionType !== 'BUNDLE'">
            <a :class="{'nav-link': true, 'active': currentTab === 'products'}" id="products-tab" data-toggle="tab"
               href="#products" role="tab" aria-controls="products" aria-selected="false">{{$t('labels.products')}}</a>
          </li>
          <li class="nav-item tab-nav" @click="currentTab = 'priceBased'" v-if="promotion.promotionType === 'PRICE'">
            <a :class="{'nav-link': true, 'active': currentTab === 'priceBased'}" id="priceBased-tab" data-toggle="tab"
               href="#priceBased" role="tab" aria-controls="priceBased" aria-selected="false">{{$t('labels.priceBased')}}</a>
          </li>
          <li class="nav-item tab-nav" @click="currentTab = 'quantityBased'" v-if="promotion.promotionType === 'QUANTITY'">
            <a :class="{'nav-link': true, 'active': currentTab === 'quantityBased'}" id="quantityBased-tab"
               data-toggle="tab"
               href="#quantityBased" role="tab" aria-controls="quantityBased" aria-selected="false">{{$t('labels.quantityBased')}}</a>
          </li>
          <li class="nav-item tab-nav" @click="currentTab = 'affiliateBased'" v-if="promotion.promotionType === 'AFFILIATE'">
            <a :class="{'nav-link': true, 'active': currentTab === 'affiliateBased'}" id="affiliateBased-tab"
               data-toggle="tab"
               href="#affiliateBased" role="tab" aria-controls="affiliateBased" aria-selected="false">{{$t('labels.affiliateBased')}}</a>
          </li>
          <li class="nav-item tab-nav" @click="currentTab = 'bundle'" v-if="promotion.promotionType === 'BUNDLE'">
            <a :class="{'nav-link': true, 'active': currentTab === 'bundle'}" id="bundle-tab"
               data-toggle="tab" href="#bundle" role="tab" aria-controls="bundle" aria-selected="false">
              {{$t('labels.bundle')}}</a>
          </li>
          <li class="nav-item tab-nav" @click="currentTab = 'coupons'" v-if="promotion.promotionType === 'COUPON'">
            <a :class="{'nav-link': true, 'active': currentTab === 'coupons'}" id="coupons-tab" data-toggle="tab"
               href="#coupons" role="tab" aria-controls="coupons" aria-selected="false">{{$t('labels.coupons')}}</a>
          </li>
          <li class="nav-item tab-nav" @click="currentTab = 'personalCoupon'"
              v-if="promotion.promotionType === 'PERSONAL_COUPON' || promotion.promotionType === 'TEMPORARY_COUPON'">
            <a :class="{'nav-link': true, 'active': currentTab === 'personalCoupon'}" id="personalCoupon-tab"
               data-toggle="tab"
               href="#personalCoupon" role="tab" aria-controls="personalCoupon" aria-selected="false">{{promotion.promotionType
              === 'PERSONAL_COUPON' ? $t('labels.personalCoupon') : $t('labels.temporaryCoupon')}}</a>
          </li>
          <li class="nav-item tab-nav" @click="currentTab = 'usage'">
            <a :class="{'nav-link': true, 'active': currentTab === 'usage'}" id="usage-tab" data-toggle="tab"
               href="#usage" role="tab" aria-controls="usage"
               aria-selected="false">{{$t('labels.usage')}}</a>
          </li>
          <li class="nav-item tab-nav" @click="currentTab = 'loyalty'" v-if="promotion.promotionType === 'LOYALTY'">
            <a :class="{'nav-link': true, 'active': currentTab === 'loyalty'}" id="loyalty-tab" data-toggle="tab"
               href="#loyalty" role="tab" aria-controls="loyalty" aria-selected="false">{{$t('labels.loyalty')}}</a>
          </li>
        </ul>
      </div>
      <div class="tab-content mt-3">
        <div :class="{'tab-pane': true, 'active': currentTab === 'general'}" id="general" role="tabpanel"
             aria-labelledby="general-tab">
          <general-tab-component :promotion="promotion" @updatePromo="updatePromotion"/>
        </div>
        <div :class="{'tab-pane': true, 'active': currentTab === 'products'}" id="products" role="tabpanel"
             aria-labelledby="products-tab">
          <products-tab-component :promotion="promotion" @updatePromo="updatePromotion"/>
        </div>
        <div :class="{'tab-pane': true, 'active': currentTab === 'priceBased'}" id="priceBased" role="tabpanel"
             aria-labelledby="priceBased-tab">
          <price-based-tab-component :promotion="promotion" @updatePromo="updatePromotion"/>
        </div>
        <div :class="{'tab-pane': true, 'active': currentTab === 'quantityBased'}" id="quantityBased"
             role="quantityBased" aria-labelledby="quantityBased-tab">
          <quantity-based-tab-component :promotion="promotion" @updatePromo="updatePromotion"/>
        </div>
        <div :class="{'tab-pane': true, 'active': currentTab === 'affiliateBased'}" id="affiliateBased" role="tabpanel"
             aria-labelledby="affiliateBased-tab">
          <affiliate-based-tab-component :promotion="promotion" @updatePromo="updatePromotion"/>
        </div>
        <div :class="{'tab-pane': true, 'active': currentTab === 'bundle'}" id="bundle" role="tabpanel"
             aria-labelledby="bundle-tab">
          <bundle-based-tab-component :promotion="promotion" @updatePromo="updatePromotion"/>
        </div>
        <div :class="{'tab-pane': true, 'active': currentTab === 'coupons'}" id="coupons" role="tabpanel"
             aria-labelledby="coupons-tab">
          <coupon-based-tab-component :promotion="promotion" @updatePromo="updatePromotion"/>
        </div>
        <div :class="{'tab-pane': true, 'active': currentTab === 'personalCoupon'}" id="personalCoupon" role="tabpanel"
             aria-labelledby="personalCoupon-tab">
          <personal-coupon-based-tab-component :promotion="promotion" @updatePromo="updatePromotion"/>
        </div>
        <div :class="{'tab-pane': true, 'active': currentTab === 'loyalty'}" id="loyalty" role="tabpanel"
             aria-labelledby="loyalty-tab">
          <loyalty-tab-component :promotion="promotion" @updatePromo="updatePromotion"/>
        </div>
        <div :class="{'tab-pane': true, 'active': currentTab === 'usage'}" id="usage" role="tabpanel"
             aria-labelledby="usage-tab">
          <usage-tab-component :promotion="promotion" @updatePromo="updatePromotion"/>
        </div>
      </div>
    </div>
    <!--
    <div class="col-md-3">
      <h4>{{$t('labels.historyPanel')}}</h4>
    </div>
    -->
  </div>
</template>
<script type="ts" src="./promotionEditTabs.component.ts"></script>
<style scoped>
  .nav-item {
    display: table-cell;
    list-style-type: none;
    vertical-align: middle;
    margin-right: 16px;
    margin-left: 16px;
  }
</style>
