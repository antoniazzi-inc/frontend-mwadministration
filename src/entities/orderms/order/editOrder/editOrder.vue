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
  <div class="container-fluid">
    <h2 id="page-heading" class="text-left mt-3">
      {{$t('labels.order')}} {{ cartOrder.id }}
      <router-link to="/orders" class="text-decoration-none text-white">
        <button tag="button" class="btn btn-primary float-right create-tag">
          <span>{{$t('buttons.backToList')}}</span>
        </button>
      </router-link>
    </h2>
    <p style="">
      {{$t('labels.created') | lower}} {{ cartOrder.createdOn | formatDate}}
      {{$t('labels.and') | lower}} {{$t('labels.updated') | lower}} {{ cartOrder.updatedOn | formatDate}}
    </p>
    <form>
      <div class="row">
        <div class="col-md-4">
          <ul class="nav nav-tabs" id="myTab1" role="tablist">
            <li class="nav-item tab-nav" @click="currentTabLeft = 'summary'">
              <a :class="{'nav-link': true, 'active': currentTabLeft === 'summary'}" id="summary-tab" data-toggle="tab"
                 href="#summary" role="tab" aria-controls="summary" aria-selected="true">{{ $t('labels.summary') }}</a>
            </li>
            <li class="nav-item tab-nav" @click="currentTabLeft = 'history'">
              <a :class="{'nav-link': true, 'active': currentTabLeft === 'history'}" id="history-tab" data-toggle="tab"
                 href="#history" role="tab" aria-controls="history" aria-selected="true">{{ $t('labels.history') }}</a>
            </li>
          </ul>
          <div class="tab-content mt-3" id="myTabContent1">
            <div :class="{'tab-pane': true, active: currentTabLeft === 'summary'}" id="summary" role="tabpanel"
                 aria-labelledby="summary-tab">
              <order-preview-component :order="cartOrder" @update="updateCart"/>
            </div>
            <div :class="{'tab-pane': true, active: currentTabLeft === 'history'}" id="history" role="tabpanel"
                 aria-labelledby="history-tab">
              <history-component :order="cartOrder" @update="updateCart"/>
            </div>
          </div>
        </div>
        <div class="col-md-8">
          <ul class="nav nav-tabs" id="myTab" role="tablist">
            <li class="nav-item tab-nav" @click="currentTab = 'customers'">
              <a :class="{'nav-link': true, 'active': currentTab === 'customers'}" id="customers-tab" data-toggle="tab"
                 href="#customers" role="tab" aria-controls="customers" aria-selected="true">{{ $t('labels.customer') }}</a>
            </li>
            <li class="nav-item tab-nav" @click="currentTab = 'beneficiaries'">
              <a :class="{'nav-link': true, 'active': currentTab === 'beneficiaries'}" id="beneficiaries-tab"
                 data-toggle="tab"
                 href="#beneficiaries" role="tab" aria-controls="beneficiaries"
                 aria-selected="true">{{ $t('labels.beneficiaries') }}</a>
            </li>
            <li class="nav-item tab-nav" @click="currentTab = 'order'">
              <a :class="{'nav-link': true, 'active': currentTab === 'order'}" id="order-tab" data-toggle="tab"
                 href="#order" role="tab" aria-controls="order" aria-selected="true">{{ $t('labels.order') }}</a>
            </li>
            <li class="nav-item tab-nav" @click="currentTab = 'invoices'">
              <a :class="{'nav-link': true, 'active': currentTab === 'invoices'}" id="invoices-tab" data-toggle="tab"
                 href="#invoices" role="tab" aria-controls="invoices" aria-selected="true">{{ $t('labels.invoiceSettings') }}</a>
            </li>
            <li class="nav-item tab-nav" @click="currentTab = 'payment'">
              <a :class="{'nav-link': true, 'active': currentTab === 'payment'}" id="payment-tab" data-toggle="tab"
                 href="#payment" role="tab" aria-controls="payment" aria-selected="true">{{ $t('labels.invoiceList') }}</a>
            </li>
            <!--
            <li class="nav-item tab-nav" @click="currentTab = 'affiliate'">
              <a :class="{'nav-link': true, 'active': currentTab === 'affiliate'}" id="affiliate-tab" data-toggle="tab"
                 href="#affiliate" role="tab" aria-controls="affiliate" aria-selected="true">{{ $t('labels.affiliate') }}</a>
            </li>
            -->
            <li class="nav-item tab-nav" @click="currentTab = 'delivery'">
              <a :class="{'nav-link': true, 'active': currentTab === 'delivery'}" id="delivery-tab" data-toggle="tab"
                 href="#delivery" role="tab" aria-controls="delivery" aria-selected="true">{{ $t('labels.delivery') }}</a>
            </li>
          </ul>
          <div class="tab-content mt-3" id="myTabContent">
            <div :class="{'tab-pane': true, active: currentTab === 'customers'}" id="customers" role="tabpanel"
                 aria-labelledby="customers-tab">
              <customer-component :order="cartOrder" @update="updateCart"/>
            </div>
            <div :class="{'tab-pane': true, active: currentTab === 'beneficiaries'}" id="beneficiaries" role="tabpanel"
                 aria-labelledby="beneficiaries-tab">
              <beneficiaries-component :order="cartOrder" @updateCart="updateCart"/>
            </div>
            <div :class="{'tab-pane': true, active: currentTab === 'order'}" id="order" role="tabpanel"
                 aria-labelledby="order-tab">
              <order-component :order="cartOrder" @update="updateCart"/>
            </div>
            <div :class="{'tab-pane': true, active: currentTab === 'invoices'}" id="invoices" role="tabpanel"
                 aria-labelledby="invoices-tab">
              <invoice-component :order="cartOrder" @update="updateCart"/>
            </div>
            <div :class="{'tab-pane': true, active: currentTab === 'payment'}" id="payment" role="tabpanel"
                 aria-labelledby="payment-tab">
              <payment-component :order="cartOrder" @update="updateCart"/>
            </div>
            <!--
            <div :class="{'tab-pane': true, active: currentTab === 'affiliate'}" id="affiliate" role="tabpanel"
                 aria-labelledby="affiliate-tab">
              <affiliate-component :order="cartOrder" @update="updateCart"/>
            </div>
            -->
            <div :class="{'tab-pane': true, active: currentTab === 'delivery'}" id="delivery" role="tabpanel"
                 aria-labelledby="delivery-tab">
              <delivery-component :order="cartOrder" @update="updateCart"/>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>
<script src="./editOrder.component.ts" lang="ts"></script>
<style scoped>

</style>
