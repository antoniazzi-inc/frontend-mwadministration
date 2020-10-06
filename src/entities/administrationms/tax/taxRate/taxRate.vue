<template>
  <div class="container-fluid">
    <h2 id="page-heading" class="text-left mt-3">
      <span id="tag-heading">{{$t('labels.taxRates')}}</span>
      <router-link to="/maintenance/tax-rate/new" class="text-white text-decoration-none">
      <button tag="button" data-toggle="modal" data-target="#helpCategoryModal" class="btn btn-primary float-right">
        <i class="fas fa-plus"/> {{$t('labels.newTaxRate')}}
      </button>
      </router-link>
    </h2>
    <simple-search @onSearch="searchTaxRate"></simple-search>
    <PaginationTableComponent
      :ref="'paginationTable'"
      :active="active"
      :noDataLabel="'labels.noData'"
      :table="'taxRate'"
      @onEdit="editTaxRate"
      @onDelete="removeTaxRate"
      :service="taxRateService"/>
  </div>
</template>
<script type="ts" src="./taxRate.component.ts"></script>
