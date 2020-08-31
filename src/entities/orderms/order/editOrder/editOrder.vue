<template>
  <div>
    <form>
    <h5 class="form-header text-left pl-3">
      <strong class="pull-left">#{{ cartOrder.id }}</strong>
      <span class="pull-right">
        <div class="text-right">
          <router-link to="/orders" class="text-primary bold-label back pr-4">{{ $t('labels.backToOrders') }}</router-link>
        </div>
      </span>
    </h5>
    <div class="form-desc text-left pl-3">
      {{ $t('labels.created') }} {{ cartOrder.createdOn | formatDate }}
      {{ $t('labels.and') }}
      {{ $t('labels.updated') }} {{ cartOrder.updatedOn | formatDate }}
    </div>
    <ul class="nav nav-tabs mt-5" id="myTab" role="tablist">
      <li class="nav-item" @click="currentTab = 'customers'">
        <a :class="{'nav-link': true, 'active': currentTab === 'customers'}" id="customers-tab" data-toggle="tab"
           href="#customers" role="tab" aria-controls="customers" aria-selected="true">{{ $t('labels.customers') }}</a>
      </li>
      <li class="nav-item" @click="currentTab = 'beneficiaries'">
        <a :class="{'nav-link': true, 'active': currentTab === 'beneficiaries'}" id="beneficiaries-tab"
           data-toggle="tab"
           href="#beneficiaries" role="tab" aria-controls="beneficiaries"
           aria-selected="true">{{ $t('labels.beneficiaries') }}</a>
      </li>
      <li class="nav-item" @click="currentTab = 'order'">
        <a :class="{'nav-link': true, 'active': currentTab === 'order'}" id="order-tab" data-toggle="tab"
           href="#order" role="tab" aria-controls="order" aria-selected="true">{{ $t('labels.order') }}</a>
      </li>
      <li class="nav-item" @click="currentTab = 'invoices'">
        <a :class="{'nav-link': true, 'active': currentTab === 'invoices'}" id="invoices-tab" data-toggle="tab"
           href="#invoices" role="tab" aria-controls="invoices" aria-selected="true">{{ $t('labels.invoices') }}</a>
      </li>
      <li class="nav-item" @click="currentTab = 'payment'">
        <a :class="{'nav-link': true, 'active': currentTab === 'payment'}" id="payment-tab" data-toggle="tab"
           href="#payment" role="tab" aria-controls="payment" aria-selected="true">{{ $t('labels.payment') }}</a>
      </li>
      <li class="nav-item" @click="currentTab = 'affiliate'">
        <a :class="{'nav-link': true, 'active': currentTab === 'affiliate'}" id="affiliate-tab" data-toggle="tab"
           href="#affiliate" role="tab" aria-controls="affiliate" aria-selected="true">{{ $t('labels.affiliate') }}</a>
      </li>
      <li class="nav-item" @click="currentTab = 'delivery'">
        <a :class="{'nav-link': true, 'active': currentTab === 'delivery'}" id="delivery-tab" data-toggle="tab"
           href="#delivery" role="tab" aria-controls="delivery" aria-selected="true">{{ $t('labels.delivery') }}</a>
      </li>
      <li class="nav-item" @click="currentTab = 'summary'">
        <a :class="{'nav-link': true, 'active': currentTab === 'summary'}" id="summary-tab" data-toggle="tab"
           href="#summary" role="tab" aria-controls="summary" aria-selected="true">{{ $t('labels.summary') }}</a>
      </li>
      <li class="nav-item" @click="currentTab = 'history'">
        <a :class="{'nav-link': true, 'active': currentTab === 'history'}" id="history-tab" data-toggle="tab"
           href="#history" role="tab" aria-controls="history" aria-selected="true">{{ $t('labels.history') }}</a>
      </li>
    </ul>
    <div class="tab-content" id="myTabContent">
      <div :class="{'tab-pane': true, active: currentTab === 'customers'}" id="customers" role="tabpanel"
           aria-labelledby="customers-tab">
        <customer-component :order="cartOrder"/>
      </div>
      <div :class="{'tab-pane': true, active: currentTab === 'beneficiaries'}" id="beneficiaries" role="tabpanel"
           aria-labelledby="beneficiaries-tab">
        <beneficiaries-component :order="cartOrder" @updateCart="updateCart"/>
      </div>
      <div :class="{'tab-pane': true, active: currentTab === 'order'}" id="order" role="tabpanel"
           aria-labelledby="order-tab">
        <order-component :order="cartOrder"/>
      </div>
      <div :class="{'tab-pane': true, active: currentTab === 'invoices'}" id="invoices" role="tabpanel"
           aria-labelledby="invoices-tab">
        <invoice-component :order="cartOrder"/>
      </div>
      <div :class="{'tab-pane': true, active: currentTab === 'payment'}" id="payment" role="tabpanel"
           aria-labelledby="payment-tab">
        <payment-component :order="cartOrder"/>
      </div>
      <div :class="{'tab-pane': true, active: currentTab === 'affiliate'}" id="affiliate" role="tabpanel"
           aria-labelledby="affiliate-tab">
        <affiliate-component :order="cartOrder"/>
      </div>
      <div :class="{'tab-pane': true, active: currentTab === 'delivery'}" id="delivery" role="tabpanel"
           aria-labelledby="delivery-tab">
        <delivery-component :order="cartOrder"/>
      </div>
      <div :class="{'tab-pane': true, active: currentTab === 'summary'}" id="summary" role="tabpanel"
           aria-labelledby="summary-tab">
        <order-preview-component :order="cartOrder"/>
      </div>
      <div :class="{'tab-pane': true, active: currentTab === 'history'}" id="history" role="tabpanel"
           aria-labelledby="history-tab">
        <history-component :order="cartOrder"/>
      </div>
    </div>
    </form>
  </div>
</template>
<script src="./editOrder.component.ts" lang="ts"></script>
