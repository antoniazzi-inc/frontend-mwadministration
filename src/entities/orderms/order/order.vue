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
      <span id="tag-heading">{{$t('labels.orders')}}</span>
      <router-link to="/orders/new" class="text-decoration-none text-white">
        <button tag="button" class="btn btn-primary float-right create-tag">
          <i class="fas fa-plus"/>  <span>{{$t('labels.newOrder')}}</span>
        </button>
      </router-link>
    </h2>

    <div class="row">

      <div class="col-md-3" id="rdr-search">
        <form name="searchForm" class="form text-left" @submit.prevent.stop="simpleSearch">
          <div class="form-group mt-3">
            <label class="form-control-label">{{$t('labels.customerNameOrEmail')}}</label>
            <input type="text" class="form-control" name="currentSearchName" id="currentSearchName" v-model="currentSearchName" />
          </div>
          <div class="row mt-3">
            <div class="form-group col-6">
              <label class="form-control-label">{{$t('labels.orderId')}}</label>
              <input type="number" class="form-control" name="currentSearchOrderId" id="currentSearchOrderId" v-model="currentSearchOrderId" />
            </div>
            <div class="form-group col-6">
              <label class="form-control-label">{{$t('labels.invoiceNumberSearch')}}</label>
              <input type="text" class="form-control" name="invoiceNumberSearch" id="invoiceNumberSearch" v-model="invoiceNumberSearch" />
            </div>
          </div>
          <div class="row mt-3">
            <div class="form-group col-6">
              <label class="form-control-label">{{$t('labels.recentlyAdded')}}</label>
              <select v-model="RecentlyAddedSearch" class="form-control">
                <option value="today">{{$t('labels.today')}}</option>
                <option value="yesterday">{{$t('labels.yesterday')}}</option>
                <option value="last7days">{{$t('labels.last7days')}}</option>
                <option value="thisMonth">{{$t('labels.thisMonth')}}</option>
                <option value="lastMonth">{{$t('labels.lastMonth')}}</option>
                <option value="all">{{$t('labels.all')}}</option>
              </select>
            </div>
            <div class="form-group col-6">
              <label class="form-control-label">{{$t('labels.paymentStatus')}}</label>
              <select v-model="paymentStatusSearch" class="form-control">
                <option value="true">{{$t('labels.paid')}}</option>
                <option value="false">{{$t('labels.notPaid')}}</option>
                <option value="all">{{$t('labels.all')}}</option>
              </select>
            </div>
          </div>
          <div class="form-group mt-3">
            <label class="form-control-label">{{$t('labels.products')}}</label>
            <searchable-select-component :config="searchableProductsConfig"
             :options="$store.state.lookups.products"
             :value="selectedProducts"
             @onChange="productSearchChanged"
             @onDelete="productSearchRemoved"/>
          </div>
          <div class="form-group mt-3">
            <label class="form-control-label">{{$t('labels.productCategories')}}</label>
            <searchable-select-component :config="searchableCatsConfig"
             :options="$store.state.lookups.categories"
             :value="selectedCategories"
             @onSelected="categorySearchChanged"
             @onDelete="categorySearchRemoved"/>
          </div>
          <div class="form-group mt-3">
            <label class="form-control-label">{{$t('labels.affiliates')}}</label>
            <searchable-select-component :config="searchableAffiliatesConfig"
             :options="$store.state.lookups.affiliates"
             :value="selectedAffiliates"
             @onSelected="affiliateSearchChanged"
             @onDelete="affiliateSearchRemoved"/>
          </div>
          <div class="form-group mt-3">
            <label class="form-control-label">{{$t('labels.searchByPromotion')}}</label>
            <searchable-select-component :config="searchablePromotionsConfig"
             :options="$store.state.lookups.promotions"
             :value="selectedPromotion"
             @onChange="promotionSearchChanged"
             @onDelete="promotionSearchRemoved"/>
          </div>
          <div class="text-right">
            <button type="button" class="btn btn-outline-primary" @click="clear()">{{$t('buttons.clear')}}</button>
            <button type="submit" class="btn btn-primary ml-2" @click="simpleSearch">{{$t('buttons.search')}}</button>
          </div>
        </form>
      </div>

      <div class="col-md-9">
        <PaginationTableComponent
          :ref="'paginationTable'"
          :active="active"
          :table="'order'"
          :noDataLabel="'labels.noOrders'"
          @onEdit="editOrder"
          @onDelete="deleteOrder"
          @onInfo="orderInfo"
          :service="orderService"/>
      </div>

      <div class="modal" data-backdrop="static" data-keyboard="false" id="orderInfoModal" tabindex="-1" role="dialog" ref="orderInfoModal">
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5>{{ $t('labels.orderInfo') }}</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <order-info-component :order="selectedOrder"/>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary" data-dismiss="modal" @click="editOrder(selectedOrder)">{{ $t('buttons.edit') }}</button>
              <button type="button" class="btn btn-secondary" data-dismiss="modal">{{ $t('buttons.close') }}</button>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>
<script src="./order.component.ts" lang="ts"></script>

<style scoped>
  #rdr-search {
    border: 1px solid #e0e0e8;
    padding: 1em;
    background-color: #fff;
    margin:0em;
    margin-top:2em;
  }
</style>
