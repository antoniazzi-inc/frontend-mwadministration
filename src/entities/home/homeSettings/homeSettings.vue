<template>
  <div class="container-fluid">
    <ul class="nav nav-tabs mt-5" id="myTab" role="tablist">
      <li :class="{'nav-item': true, active: currentTab === 'cat'}" @click="currentTab='cat'">
        <a :class="{'nav-link': true, active: currentTab === 'cat'}" :aria-selected="currentTab === 'cat'"
           id="home-tab" data-toggle="tab" href="#categories" role="tab" aria-controls="home">
          {{$t('labels.categories')}}
        </a>
      </li>
      <li :class="{'nav-item': true, active: currentTab === 'tag'}" @click="currentTab='tag'">
        <a class="nav-link" id="profile-tab" data-toggle="tab" href="#tags"
           role="tab" aria-controls="profile" :aria-selected="currentTab === 'tag'">{{$t('labels.tags')}}</a>
      </li>
      <li :class="{'nav-item': true, active: currentTab === 'default'}" @click="currentTab='default'">
        <a class="nav-link" id="contact-tab" data-toggle="tab" href="#defaultTexts"
           role="tab" aria-controls="contact" :aria-selected="currentTab === 'default'">{{$t('labels.defaultTexts')}}</a>
      </li>
      <li :class="{'nav-item': true, active: currentTab === 'deliveryMethods'}" @click="currentTab='deliveryMethods'">
        <a class="nav-link" id="delivery-methods-tab" data-toggle="tab" href="#deliveryMethods"
           role="tab" aria-controls="contact" :aria-selected="currentTab === 'deliveryMethods'">{{$t('labels.deliveryMethods')}}</a>
      </li>
      <li :class="{'nav-item': true, active: currentTab === 'paymentMethods'}" @click="currentTab='paymentMethods'">
        <a class="nav-link" id="payment-methods-tab" data-toggle="tab" href="#paymentMethods"
           role="tab" aria-controls="contact" :aria-selected="currentTab === 'paymentMethods'">{{$t('labels.paymentMethods')}}</a>
      </li>
    </ul>
    <div class="tab-content" id="myTabContent">
      <div class="tab-pane fade show active" id="categories" role="tabpanel" aria-labelledby="categories-tab">
        <CategoriesComponent :active="currentTab==='cat'"/>
      </div>
      <div class="tab-pane fade" id="tags" role="tabpanel" aria-labelledby="tags-tab">
        <TagsComponent :active="currentTab==='tag'"/>
      </div>
      <div class="tab-pane fade" id="defaultTexts" role="tabpanel" aria-labelledby="defaultTexts-tab">
        <DefaultTextsComponent :active="currentTab==='default'"/>
      </div>
      <div class="tab-pane fade" id="deliveryMethods" role="tabpanel" aria-labelledby="defaultTexts-tab">
        <DeliveryMethodsComponent :active="currentTab==='deliveryMethods'"/>
      </div>
      <div class="tab-pane fade" id="paymentMethods" role="tabpanel" aria-labelledby="defaultTexts-tab">
        <PaymentMethodsComponent :active="currentTab==='paymentMethods'"/>
      </div>
    </div>
  </div>
</template>
<script src="./homeSettings.component.ts" lang="ts"></script>
