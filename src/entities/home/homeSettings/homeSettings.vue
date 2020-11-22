<template>
  <div class="container-fluid">
    <h2 id="page-heading" class="text-left mt-3">
      <span>{{$t('labels.settings')}}</span>
    </h2>
    <ul class="nav nav-tabs mt-3" id="myTab" role="tablist">
      <li class="nav-item" @click="currentTab = 'cat'">
        <a :class="{'tab-nav': true, 'nav-link': true, 'active': currentTab === 'cat'}" id="category-tab" data-toggle="tab"
           href="#categories" role="tab" aria-controls="categories" aria-selected="true">{{$t('labels.categories')}}</a>
      </li>
      <li class="nav-item" @click="currentTab = 'tag'">
        <a :class="{'tab-nav': true, 'nav-link': true, 'active': currentTab === 'tag'}" id="tag-tab" data-toggle="tab"
           href="#tags" role="tab" aria-controls="tags" aria-selected="false">{{$t('labels.tags')}}</a>
      </li>
      <li class="nav-item" @click="currentTab = 'default'">
        <a :class="{'tab-nav': true, 'nav-link': true, 'active': currentTab === 'default'}" id="default-tab" data-toggle="tab"
           href="#defaultTexts" role="tab" aria-controls="defaultTexts" aria-selected="false">{{$t('labels.defaultTexts')}}</a>
      </li>
      <li class="nav-item" @click="currentTab = 'integrations'">
        <a :class="{'tab-nav': true, 'nav-link': true, 'active': currentTab === 'integrations'}" id="integrations-tab" data-toggle="tab"
           href="#integrations" role="tab" aria-controls="integrations" aria-selected="true">{{$t('labels.integrations')}}</a>
      </li>
      <li class="nav-item" @click="currentTab = 'deliveryMethods'">
        <a :class="{'tab-nav': true, 'nav-link': true, 'active': currentTab === 'deliveryMethods'}" id="delivery-tab"
           data-toggle="tab" href="#deliveryMethods" role="tab" aria-controls="deliveryMethods" aria-selected="false">
          {{$t('labels.deliveryMethods')}}</a>
      </li>
      <li class="nav-item" @click="currentTab = 'paymentMethods'">
        <a :class="{'tab-nav': true, 'nav-link': true, 'active': currentTab === 'paymentMethods'}" id="payment-tab" data-toggle="tab"
           href="#paymentMethods" role="tab" aria-controls="paymentMethods" aria-selected="false">{{$t('labels.paymentMethods')}}</a>
      </li>
      <li class="nav-item" @click="currentTab = 'invoiceTemplates'">
        <a :class="{'tab-nav': true, 'nav-link': true, 'active': currentTab === 'invoiceTemplates'}" id="invoiceTemplates-tab" data-toggle="tab"
           href="#invoiceTemplates" role="tab" aria-controls="invoiceTemplates" aria-selected="false">{{$t('labels.invoiceTemplates')}}</a>
      </li>
      <li class="nav-item" @click="currentTab = 'invoicing'">
        <a :class="{'tab-nav': true, 'nav-link': true, 'active': currentTab === 'invoicing'}" id="invoicing-tab" data-toggle="tab"
           href="#invoicing" role="tab" aria-controls="invoicing" aria-selected="false">{{$t('labels.invoicing')}}</a>
      </li>
      <li class="nav-item" @click="currentTab = 'taxRulings'">
        <a :class="{'tab-nav': true, 'nav-link': true, 'active': currentTab === 'taxRulings'}" id="taxRulings-tab" data-toggle="tab"
           href="#taxRulings" role="tab" aria-controls="taxRulings" aria-selected="false">{{$t('labels.taxRulings')}}</a>
      </li>

    </ul>
    <div class="tab-content" id="myTabContent">
      <div :class="{'tab-pane not-for-print': true, active: currentTab === 'cat'}" id="categories" role="tabpanel" aria-labelledby="category-tab">
        <CategoriesComponent :active="currentTab==='cat'"/>
      </div>
      <div  :class="{'tab-pane not-for-print': true, active: currentTab === 'tag'}" id="tags" role="tabpanel" aria-labelledby="tag-tab">
        <TagsComponent :active="currentTab==='tag'"/>
      </div>
      <div  :class="{'tab-pane not-for-print': true, active: currentTab === 'default'}" id="defaultTexts" role="tabpanel" aria-labelledby="default-tab">
        <DefaultTextsComponent :active="currentTab==='default'"/>
      </div>
      <div :class="{'tab-pane not-for-print': true, active: currentTab === 'integrations'}" id="integrations" role="tabpanel" aria-labelledby="integrations-tab">
        <integrations-component :active="currentTab === 'integrations'"></integrations-component>
      </div>
      <div  :class="{'tab-pane not-for-print': true, active: currentTab === 'deliveryMethods'}" id="deliveryMethods" role="tabpanel" aria-labelledby="delivery-tab">
        <DeliveryMethodsComponent :active="currentTab==='deliveryMethods'"/>
      </div>
      <div  :class="{'tab-pane not-for-print': true, active: currentTab === 'paymentMethods'}" id="paymentMethods" role="tabpanel" aria-labelledby="payment-tab">
        <PaymentMethodsComponent :active="currentTab==='paymentMethods'"/>
      </div>
      <div  :class="{'tab-pane': true, active: currentTab === 'invoiceTemplates'}" id="invoiceTemplates" role="tabpanel" aria-labelledby="invoiceTemplates-tab">
        <invoice-template :active="currentTab==='invoiceTemplates'"/>
      </div>
      <div  :class="{'tab-pane': true, active: currentTab === 'invoicing'}" id="invoicing" role="tabpanel" aria-labelledby="invoicing-tab">
        <invoicing-component :active="currentTab==='invoicing'"/>
      </div>
      <div  :class="{'tab-pane': true, active: currentTab === 'taxRulings'}" id="taxRulings" role="tabpanel" aria-labelledby="taxRulings-tab">
        <tax-rulings-component :active="currentTab==='taxRulings'"/>
      </div>
    </div>
  </div>
</template>

<script src="./homeSettings.component.ts" lang="ts"></script>

<style scoped>

</style>
