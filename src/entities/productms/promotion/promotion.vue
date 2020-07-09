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
      <div class="col-md-3"></div>
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
