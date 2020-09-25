<template>
  <div class="container-fluid">
    <h2 id="page-heading" class="text-left mt-3">
      <span id="tag-heading">{{$t('labels.products')}}</span>
      <router-link to="/products/new" class="text-decoration-none text-white">
        <button tag="button" class="btn btn-primary float-right create-tag">
          <i class="fas fa-plus"/>  <span>{{$t('labels.newProduct')}}</span>
        </button>
      </router-link>
    </h2>
    <div class="row">
      <div class="col-md-3" id="prd-search">
        <form name="searchForm" class="form text-left" @submit.prevent.stop="simpleSearch">
          <div class="form-group mt-3">
            <label class="form-control-label">{{$t('labels.searchByNameDescriptionOrCouponCode')}}</label>
            <input type="text" class="form-control" name="currentSearch" id="currentSearch" v-model="currentSearchName" />
          </div>
          <div class="form-group mt-3">
            <label class="form-control-label">{{$t('labels.searchByCategory')}}</label>
            <searchable-select-component :config="searchableGroupsConfig"
                                         :options="$store.state.lookups.categories"
                                         :value="selectedCategories"
                                         @onSelected="categorySearchChanged"
                                         @onDelete="categorySearchRemoved"/>
          </div>
          <div class="form-group mt-3">
            <label class="form-control-label">{{$t('labels.searchByProductType')}}</label>
            <searchable-select-component :config="searchableProductTypeConfig"
                                         :options="allProductTypes"
                                         :value="selectedProductTypes"
                                         @onSelected="productTypeSearchChanged"
                                         @onDelete="productTypeSearchRemoved"/>
          </div>
          <div class="form-group mt-3">
            <label class="form-control-label">{{$t('labels.searchByPromotion')}}</label>
            <searchable-select-component :config="searchableCatsConfig"
                                         :options="$store.state.lookups.promotions"
                                         :value="selectedPromotion"
                                         @onSelected="promotionSearchChanged"
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
          :table="'product'"
          :noDataLabel="'labels.noProducts'"
          @onEdit="editProduct"
          @onDelete="deleteProduct"
          :service="productService"/>
      </div>
    </div>
  </div>
</template>
<script src="./product.component.ts" lang="ts"></script>
<style scoped>
  #prd-search {
    border: 1px solid #e0e0e8;
    padding: 1em;
    background-color: #FFF;
    margin:0em;
    margin-top:2em;
  }
</style>
