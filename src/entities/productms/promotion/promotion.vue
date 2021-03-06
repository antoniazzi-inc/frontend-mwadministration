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
      <span id="tag-heading">{{$t('labels.promotions')}}</span>
      <router-link to="/promotions/new" class="text-decoration-none text-white">
        <button tag="button" class="btn btn-primary float-right create-tag">
          <i class="fas fa-plus"/>  <span>{{$t('labels.newPromotion')}}</span>
        </button>
      </router-link>
    </h2>
    <div class="row">
      <div class="col-md-3" id="promo-search">
        <form name="searchForm" class="form text-left" @submit.prevent.stop="simpleSearch">
          <div class="form-group mt-3">
            <label class="form-control-label">{{$t('labels.searchByNameDescriptionOrCouponCode')}}</label>
            <input type="text" class="form-control" name="currentSearch" id="currentSearch" v-model="currentSearchName" />
          </div>
          <div class="form-group mt-3">
            <label class="form-control-label">{{$t('labels.macroCode')}}</label>
            <input type="text" class="form-control" name="currentSearch" v-model="currentSearchMacro" />
          </div>
          <div class="form-group mt-3">
            <label>{{$t('labels.validFrom')}}</label>
            <div class="dateHolder date-input">
              <flat-pickr :config="validFromConfig" class="single-daterange form-control" id="validFromDate" v-model="availableFrom"/>
              <i class="fa fa-times clearDate cursor-pointer" @click="availableFrom=null">
                <span aria-hidden="true" class="sr-only">X</span>
              </i>
            </div>
          </div>
          <div class="form-group mt-3">
            <label>{{$t('labels.validTo')}}</label>
            <div class="dateHolder date-input">
              <flat-pickr :config="validToConfig" v-model="availableTo" id="validToDate" class="single-daterange form-control"/>
              <i class="fa fa-times clearDate cursor-pointer" @click="availableTo=null">
                <span aria-hidden="true" class="sr-only">X</span>
              </i>
            </div>
          </div>
          <div class="form-group mt-3">
            <label class="form-control-label">{{$t('labels.searchByPromotionType')}}</label>
            <searchable-select-component :config="promotionTypeConfig"
                                         :options="allPromoTypes"
                                         :value="selectedPromoType"
                                         @onSelected="addPromoType"
                                         @onDelete="removePromoType"/>
          </div>
          <div class="form-group mt-3" v-show="selectedPromoType">
            <label class="form-control-label">{{$t('labels.searchByDiscountType')}}</label>
            <searchable-select-component :config="discountTypeConfig"
                                         :options="allDiscountTypes"
                                         :value="selectedDiscount"
                                         @onSelected="addDiscountType"
                                         @onDelete="removeDiscountType"/>
          </div>
          <div class="form-group mt-3" v-show="selectedDiscount && selectedDiscount.id === 1">
            <label class="form-control-label">{{$t('labels.amountOfPercentage')}}</label>
            <money class="form-control" v-model="percentageAmount" name="amount" v-bind="money"></money>
          </div>
          <div class="text-right">
            <button type="button" class="btn btn-outline-primary" @click="clear()">{{$t('buttons.clear')}}</button>
            <button type="submit" class="btn btn-primary ml-2">{{$t('buttons.search')}}</button>
          </div>
        </form>
      </div>
      <div class="col-md-9">
        <PaginationTableComponent
          :ref="'paginationTable'"
          :active="active"
          :table="'promotion'"
          :noDataLabel="'labels.noPromotions'"
          @onEdit="editPromotion"
          @onDelete="deletePromotion"
          :service="promotionService"/>
      </div>
    </div>
  </div>
</template>
<script src="./promotion.component.ts" lang="ts"></script>
<style scoped>
  #promo-search {
    border: 1px solid #e0e0e8;
    padding: 1em;
    background-color: #FFF;
    margin:0em;
    margin-top:2em;
  }
</style>
