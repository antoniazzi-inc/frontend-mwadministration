<template>
  <div class="row">
    <div class="col-md-12">
      <div>
        <ul class="nav nav-tabs" id="myTab" role="tablist">
          <li class="nav-item tab-nav" @click="currentTab = 'general'">
            <a :class="{'nav-link': true, 'active': currentTab === 'general'}" id="general-tab" data-toggle="tab"
               href="#general" role="tab" aria-controls="general" aria-selected="true">{{$t('labels.general')}}</a>
          </li>
          <li class="nav-item tab-nav" @click="currentTab = 'digital'" v-if="product.productType === 'DIGITAL'">
            <a :class="{'nav-link': true, 'active': currentTab === 'digital'}" id="digital-tab" data-toggle="tab"
               href="#digital" role="tab" aria-controls="digital" aria-selected="false">{{$t('labels.digital')}}</a>
          </li>
          <li class="nav-item tab-nav" @click="currentTab = 'physical'" v-if="product.productType === 'PHYSICAL'">
            <a :class="{'nav-link': true, 'active': currentTab === 'physical'}" id="physical-tab" data-toggle="tab"
               href="#physical" role="tab" aria-controls="physical" aria-selected="false">{{$t('labels.physical')}}</a>
          </li>
          <li class="nav-item tab-nav" @click="currentTab = 'course'" v-if="product.productType === 'COURSE'">
            <a :class="{'nav-link': true, 'active': currentTab === 'course'}" id="course-tab" data-toggle="tab"
               href="#course" role="tab" aria-controls="course" aria-selected="false">{{$t('labels.course')}}</a>
          </li>
          <li class="nav-item tab-nav" @click="currentTab = 'features'">
            <a :class="{'nav-link': true, 'active': currentTab === 'features'}" id="features-tab" data-toggle="tab"
               href="#features" role="tab" aria-controls="features" aria-selected="false">{{$t('labels.features')}}</a>
          </li>
          <li class="nav-item tab-nav" @click="currentTab = 'promotions'">
            <a :class="{'nav-link': true, 'active': currentTab === 'promotions'}" id="promotions-tab"
               data-toggle="tab" href="#promotions" role="tab" aria-controls="promotions" aria-selected="false">
              {{$t('labels.promotions')}}</a>
          </li>
          <li class="nav-item tab-nav" @click="currentTab = 'payBtn'">
            <a :class="{'nav-link': true, 'active': currentTab === 'payBtn'}" id="payBtn-tab" data-toggle="tab"
               href="#payBtn" role="tab" aria-controls="payBtn" aria-selected="false">{{$t('labels.payBtn')}}</a>
          </li>
          <li class="nav-item tab-nav" @click="currentTab = 'followUp'">
            <a :class="{'nav-link': true, 'active': currentTab === 'followUp'}" id="followUp-tab" data-toggle="tab"
               href="#followUp" role="tab" aria-controls="followUp" aria-selected="false">{{$t('labels.followUp')}}</a>
          </li>
          <li class="nav-item tab-nav" @click="currentTab = 'affiliates'">
            <a :class="{'nav-link': true, 'active': currentTab === 'affiliates'}" id="affiliates-tab" data-toggle="tab"
               href="#affiliates" role="tab" aria-controls="affiliates" aria-selected="false">{{$t('labels.affiliates')}}</a>
          </li>
          <li class="nav-item tab-nav" @click="currentTab = 'payments'">
            <a :class="{'nav-link': true, 'active': currentTab === 'payments'}" id="payments-tab" data-toggle="tab"
               href="#payments" role="tab" aria-controls="payments" aria-selected="false">{{$t('labels.payments')}}</a>
          </li>
          <li class="nav-item tab-nav" @click="currentTab = 'checkout'">
            <a :class="{'nav-link': true, 'active': currentTab === 'checkout'}" id="checkout-tab" data-toggle="tab"
               href="#checkout" role="tab" aria-controls="checkout" aria-selected="false">{{$t('labels.checkout')}}</a>
          </li>
          <li class="nav-item tab-nav" @click="currentTab = 'branding'">
            <a :class="{'nav-link': true, 'active': currentTab === 'branding'}" id="branding-tab" data-toggle="tab"
               href="#branding" role="tab" aria-controls="branding" aria-selected="false">{{$t('labels.branding')}}</a>
          </li>
        </ul>
      </div>
      <div class="tab-content mt-3">
        <div :class="{'tab-pane': true, 'active': currentTab === 'general'}" id="general" role="tabpanel"
             aria-labelledby="general-tab">
          <general-tab-component :product="product" @update="updateProduct"/>
        </div>
        <div :class="{'tab-pane': true, 'active': currentTab === 'digital'}" id="digital" role="tabpanel"
             aria-labelledby="digital-tab">
          <digital-tab-component :clicked="currentTab === 'digital'" :product="product" @update="updateProduct"/>
        </div>
        <div :class="{'tab-pane': true, 'active': currentTab === 'physical'}" id="physical" role="tabpanel"
             aria-labelledby="physical-tab">
          <physical-tab-component :clicked="currentTab === 'physical'" :product="product" @update="updateProduct"/>
        </div>
        <div :class="{'tab-pane': true, 'active': currentTab === 'course'}" id="course"
             role="course" aria-labelledby="course-tab">
          <course-tab-component :clicked="currentTab === 'course'"  :product="product" @update="updateProduct"/>
        </div>
        <div :class="{'tab-pane': true, 'active': currentTab === 'features'}" id="features" role="tabpanel"
             aria-labelledby="features-tab">
          <features-tab-component :clicked="currentTab === 'features'" :product="product" @update="updateProduct"/>
        </div>
        <div :class="{'tab-pane': true, 'active': currentTab === 'promotions'}" id="promotions" role="tabpanel"
             aria-labelledby="promotions-tab">
          <discounts-tab-component :newPromotion="preselectPromo" :clicked="currentTab === 'promotions'" :product="product" @update="updateProduct"/>
        </div>
        <div :class="{'tab-pane': true, 'active': currentTab === 'payBtn'}" id="payBtn" role="tabpanel"
             aria-labelledby="payBtn-tab">
          <pay-btn-tab-component :product="product"  @update="updateProduct"/>
        </div>
        <div :class="{'tab-pane': true, 'active': currentTab === 'followUp'}" id="followUp" role="tabpanel"
             aria-labelledby="followUp-tab">
          <follow-up-tab-component :product="product" @update="updateProduct" :clicked="currentTab === 'followUp'"/>
        </div>
        <div :class="{'tab-pane': true, 'active': currentTab === 'affiliates'}" id="affiliates" role="tabpanel"
             aria-labelledby="affiliates-tab">
          <affiliate-tab-component :product="product" @update="updateProduct"/>
        </div>
        <div :class="{'tab-pane': true, 'active': currentTab === 'payments'}" id="payments" role="tabpanel"
             aria-labelledby="payments-tab">
          <keep-alive>
          <payment-tab-component :clicked="currentTab === 'payments'" :product="product" @update="updateProduct"/>
          </keep-alive>
        </div>
        <div :class="{'tab-pane': true, 'active': currentTab === 'checkout'}" id="checkout" role="tabpanel"
             aria-labelledby="checkout-tab">
          <checkout-tab-component :product="product" @update="updateProduct"/>
        </div>
        <div :class="{'tab-pane': true, 'active': currentTab === 'branding'}" id="branding" role="tabpanel"
             aria-labelledby="branding-tab">
          <branding-tab-component :clicked="currentTab === 'branding'" :product="product"  @update="updateProduct"/>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="ts" src="./productEditTabs.component.ts"></script>
<style scoped>
  .nav-item{
    display: table-cell;
    list-style-type: none;
    vertical-align: middle;
    /*margin left & right here fixed the issue! */
    margin-right: 16px;
    margin-left: 16px;
  }
  .backToListBtn{
    position: absolute;
    right: 0;
    top: 0;
  }
</style>
