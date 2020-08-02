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
      <div class="col-md-3">
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
            <div class="date-input">
              <flat-pickr :config="validFromConfig" class="single-daterange form-control"
                          id="validFromDate" v-model="availableFrom"/>
            </div>
          </div>
          <div class="form-group mt-3">
            <label>{{$t('labels.validTo')}}</label>
            <div class="dateHolder date-input">
              <flat-pickr :config="validToConfig" v-model="availableTo" class="single-daterange form-control"/>
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
