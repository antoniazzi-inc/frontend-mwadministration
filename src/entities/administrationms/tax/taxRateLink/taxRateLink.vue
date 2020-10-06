<template>
  <div class="container-fluid">
    <h2 id="page-heading" class="text-left mt-3">
      <span id="tag-heading">{{$t('labels.taxRateLinks')}}</span>
      <router-link to="/maintenance/tax-rate-link/new" class="text-white text-decoration-none">
        <button tag="button" data-toggle="modal" data-target="#helpCategoryModal" class="btn btn-primary float-right">
          <i class="fas fa-plus"/>{{$t('labels.newTaxRateLink')}}
        </button>
      </router-link>
    </h2>
    <simple-search @onSearch="searchTaxRateLink"></simple-search>
    <PaginationTableComponent
      :ref="'paginationTable'"
      :active="active"
      :noDataLabel="'labels.noData'"
      :table="'taxRateLink'"
      @onEdit="editTaxRateLink"
      @onDelete="removeTaxRateLink"
      :service="taxRateLinkService"/>
  </div>
</template>
<script type="ts" src="./taxRateLink.component.ts"></script>
